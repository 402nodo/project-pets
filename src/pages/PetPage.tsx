import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePets } from '../context/PetsContext';
import PetChat from '../components/PetChat';
import PumpFunLogo from '../components/PumpFunLogo';
import { getStatusText, getActivityText, PetStats } from '../types/pet';
import './PetPage.css';

type PetMood = 'idle' | 'talking' | 'happy' | 'thinking' | 'sleepy';

export default function PetPage() {
  const { id } = useParams<{ id: string }>();
  const { pets, getPet, updatePet } = usePets();
  const [pet, setPet] = useState(id ? getPet(id) : undefined);
  const [petMood, setPetMood] = useState<PetMood>('idle');
  const [showEmote, setShowEmote] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setPet(getPet(id));
    }
  }, [id, getPet]);

  // Update last interaction
  useEffect(() => {
    if (pet && id) {
      updatePet(id, { lastInteraction: Date.now() });
    }
  }, []);

  // Trigger emote
  const triggerEmote = useCallback((emote: string) => {
    setShowEmote(emote);
    setTimeout(() => setShowEmote(null), 1500);
  }, []);

  // Random idle behaviors
  useEffect(() => {
    const idleBehaviors = () => {
      const rand = Math.random();
      if (rand < 0.25) {
        setPetMood('sleepy');
        triggerEmote('💤');
        setTimeout(() => setPetMood('idle'), 2500);
      } else if (rand < 0.4) {
        setPetMood('happy');
        triggerEmote('✨');
        setTimeout(() => setPetMood('idle'), 2000);
      } else if (rand < 0.6) {
        const emotes = ['💭', '🎵', '❓', '💖', '🍖'];
        triggerEmote(emotes[Math.floor(Math.random() * emotes.length)]);
      }
    };

    const interval = setInterval(idleBehaviors, 6000);
    // Initial happy emote
    setTimeout(() => triggerEmote('👋'), 500);
    
    return () => clearInterval(interval);
  }, [triggerEmote]);

  // Click on pet to make it happy
  const handlePetClick = () => {
    setPetMood('happy');
    const happyEmotes = ['💖', '✨', '🎉', '😊', '💕'];
    triggerEmote(happyEmotes[Math.floor(Math.random() * happyEmotes.length)]);
    setTimeout(() => setPetMood('idle'), 2000);
  };

  if (!pet) {
    return (
      <div className="page pet-page">
        <div className="container">
          <div className="not-found browser-window">
            <div className="browser-header">
              <div className="browser-dots">
                <span className="browser-dot red"></span>
                <span className="browser-dot yellow"></span>
                <span className="browser-dot green"></span>
              </div>
              <div className="browser-url">https://project-pets.app/pet/not-found</div>
            </div>
            <div className="browser-content not-found-content">
              <h2>Pet not found</h2>
              <p>This pet doesn't exist or has been removed.</p>
              <Link to="/" className="btn btn-secondary">
                Back to Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const [stats, setStats] = useState<PetStats>(pet.stats || { hunger: 80, happiness: 90, energy: 70, bond: 50 });
  const status = pet.status || 'online';
  const location = pet.location || 'Living Room';

  const otherPets = pets.filter(p => p.id !== pet.id).slice(0, 5);

  // Update stats when pet changes
  useEffect(() => {
    if (pet && pet.stats) {
      setStats(pet.stats);
    }
  }, [pet]);

  // Randomly change stats over time (every 10-30 seconds)
  useEffect(() => {
    if (!pet || !id) return;

    const changeStats = () => {
      setStats(prevStats => {
        const newStats = {
          hunger: Math.max(0, Math.min(100, prevStats.hunger + Math.floor(Math.random() * 9) - 3)),
          happiness: Math.max(0, Math.min(100, prevStats.happiness + Math.floor(Math.random() * 9) - 3)),
          energy: Math.max(0, Math.min(100, prevStats.energy + Math.floor(Math.random() * 9) - 3)),
          bond: Math.max(0, Math.min(100, prevStats.bond + Math.floor(Math.random() * 9) - 2)), // Bond changes slower
        };
        
        // Save to context/Supabase
        updatePet(id, { stats: newStats });
        
        return newStats;
      });
    };

    // Change stats every 10-30 seconds randomly
    const interval = setInterval(() => {
      const delay = Math.floor(Math.random() * 20000) + 10000; // 10-30 seconds
      setTimeout(changeStats, delay);
    }, 15000); // Check every 15 seconds

    // Also update immediately on mount
    const initialTimeout = setTimeout(changeStats, Math.floor(Math.random() * 10000) + 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [pet, id, updatePet]);

  return (
    <div className="page pet-page">
      <div className="pet-page-layout">
        {/* Left Sidebar - Conversations */}
        <aside className="conversations-sidebar">
          <div className="panel">
            <div className="panel-header">
              <span>💬 CONVERSATIONS</span>
            </div>
            <div className="panel-content">
              {/* Current pet - active */}
              <Link to={`/pet/${pet.id}`} className="conversation-item active">
                <div className="conversation-avatar">
                  <img src={pet.imageData} alt={pet.personality.name} />
                </div>
                <div className="conversation-info">
                  <span className="conversation-name">{pet.personality.name}</span>
                  <span className="conversation-preview">Active chat</span>
                </div>
                <span className={`status-dot ${status}`}></span>
              </Link>

              {/* Other pets */}
              {otherPets.map(otherPet => (
                <Link 
                  key={otherPet.id} 
                  to={`/pet/${otherPet.id}`} 
                  className="conversation-item"
                >
                  <div className="conversation-avatar">
                    <img src={otherPet.imageData} alt={otherPet.personality.name} />
                  </div>
                  <div className="conversation-info">
                    <span className="conversation-name">{otherPet.personality.name}</span>
                    <span className="conversation-preview">
                      {otherPet.personality.temperament} {otherPet.appearance.type}
                    </span>
                  </div>
                  <span className={`status-dot ${otherPet.status || 'online'}`}></span>
                </Link>
              ))}

              {otherPets.length === 0 && (
                <div className="no-conversations">
                  <p>No other pets yet</p>
                  <Link to="/create" className="btn btn-small btn-rose">
                    Create Pet
                  </Link>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="chat-main">
          <div className="chat-browser browser-window">
            <div className="browser-header">
              <div className="browser-dots">
                <span className="browser-dot red"></span>
                <span className="browser-dot yellow"></span>
                <span className="browser-dot green"></span>
              </div>
              <div className="browser-url">
                https://project-pets.app/chat/{pet.personality.name.toLowerCase().replace(/\s/g, '-')}
              </div>
              <div className="browser-actions">
                <button className="icon-btn" title="Call">📞</button>
                <button className="icon-btn" title="Video">📹</button>
              </div>
            </div>
            <div className="chat-area">
              <div className="chat-info-bar">
                <div className="chat-pet-info">
                  <div className="chat-pet-avatar">
                    <img src={pet.imageData} alt={pet.personality.name} />
                  </div>
                  <div className="chat-pet-details">
                    <span className="chat-pet-name">{pet.personality.name}</span>
                    <span className="chat-pet-status">
                      <span className={`status-dot ${status}`}></span>
                      {getStatusText(status)} • {location}
                    </span>
                  </div>
                </div>
              </div>
              <PetChat pet={pet} />
            </div>
          </div>
        </main>

        {/* Right Sidebar - Pet Info */}
        <aside className="pet-info-sidebar">
          <div className="panel pet-profile-panel">
            <div className="panel-header">
              <span>🐾 {pet.personality.name.toUpperCase()}</span>
              <span className={`status-badge ${status}`}>
                {getStatusText(status)}
              </span>
            </div>
            <div className="panel-content">
              {/* Animated Avatar */}
              <div 
                className={`profile-avatar pet-mood-${petMood}`}
                onClick={handlePetClick}
              >
                <img src={pet.imageData} alt={pet.personality.name} />
                <div className="pet-shadow"></div>
                {showEmote && (
                  <div className="pet-emote">{showEmote}</div>
                )}
              </div>

              {/* Stats */}
              <div className="profile-stats">
                <div className="stat-row">
                  <span className="stat-icon">🍖</span>
                  <span className="stat-label">Hunger</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill hunger" 
                      style={{ width: `${stats.hunger}%` }}
                    ></div>
                  </div>
                  <span className="stat-value">{stats.hunger}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-icon">💖</span>
                  <span className="stat-label">Happiness</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill happiness" 
                      style={{ width: `${stats.happiness}%` }}
                    ></div>
                  </div>
                  <span className="stat-value">{stats.happiness}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-icon">⚡</span>
                  <span className="stat-label">Energy</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill energy" 
                      style={{ width: `${stats.energy}%` }}
                    ></div>
                  </div>
                  <span className="stat-value">{stats.energy}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-icon">💜</span>
                  <span className="stat-label">Bond</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill bond" 
                      style={{ width: `${stats.bond}%` }}
                    ></div>
                  </div>
                  <span className="stat-value">{stats.bond}</span>
                </div>
              </div>

              {/* Location */}
              <div className="profile-location">
                <span className="location-icon">📍</span>
                <span className="location-text">{location}</span>
              </div>

              {/* Traits */}
              <div className="profile-traits">
                <span className="trait-tag">{pet.personality.temperament}</span>
                <span className="trait-tag">{getActivityText(pet.personality.activityLevel)}</span>
                {pet.personality.lovesHumans && <span className="trait-tag">loves humans</span>}
                {pet.personality.playful && <span className="trait-tag">playful</span>}
              </div>

              {/* Quirks */}
              {pet.personality.quirks.length > 0 && (
                <div className="profile-quirks">
                  <h4>Quirks</h4>
                  <ul>
                    {pet.personality.quirks.map((quirk, i) => (
                      <li key={i}>{quirk}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Token Info */}
              {pet.tokenAddress && (
                <div className="profile-token">
                  <a 
                    href={`https://pump.fun/${pet.tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-mint btn-small"
                  >
                    <PumpFunLogo size={18} /> View on Pump.fun
                  </a>
                  <div className="token-address">
                    {pet.tokenAddress.slice(0, 8)}...{pet.tokenAddress.slice(-8)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { usePets } from '../context/PetsContext';
import PetCard from '../components/PetCard';
import { getStatusText } from '../types/pet';
import './Home.css';

export default function Home() {
  const { pets, isLoading } = usePets();

  return (
    <div className="page home-page">
      <div className="home-layout">
        {/* Main Content */}
        <main className="home-main">
          {/* Hero Section */}
          <section className="hero">
            <div className="hero-browser browser-window">
              <div className="browser-header">
                <div className="browser-dots">
                  <span className="browser-dot red"></span>
                  <span className="browser-dot yellow"></span>
                  <span className="browser-dot green"></span>
                </div>
                <div className="browser-url">https://project-pets.app/create</div>
              </div>
              <div className="browser-content hero-content">
                <h1 className="hero-title">
                  TOKENIZE YOUR
                  <br />
                  <span className="hero-highlight">BELOVED PET</span>
                </h1>
                <p className="hero-subtitle">
                  Create a unique pixel art avatar for your pet, give it an AI personality, 
                  and launch it as a token on Solana
                </p>
                <div className="hero-actions">
                  <Link to="/create" className="btn btn-accent">
                    Create Your Pet
                  </Link>
                  <a href="#gallery" className="btn btn-secondary">
                    View Gallery
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="features">
            <div className="feature">
              <div className="feature-number">01</div>
              <h3>Design</h3>
              <p>Create unique pixel art avatar with customizable colors and accessories</p>
            </div>
            <div className="feature">
              <div className="feature-number">02</div>
              <h3>Personalize</h3>
              <p>Give your pet an AI personality with traits, quirks, and characteristics</p>
            </div>
            <div className="feature">
              <div className="feature-number">03</div>
              <h3>Tokenize</h3>
              <p>Launch your pet as a token on Pump.fun and share it with the world</p>
            </div>
          </section>

          {/* Gallery */}
          <section id="gallery" className="gallery-section">
            <div className="section-header">
              <h2>PET GALLERY</h2>
              <span className="pets-count">{pets.length} pets</span>
            </div>
            
            {isLoading ? (
              <div className="empty-gallery">
                <div className="empty-content">
                  <div className="empty-icon">⏳</div>
                  <h3>Loading gallery...</h3>
                </div>
              </div>
            ) : pets.length > 0 ? (
              <div className="pets-grid grid grid-3">
                {pets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            ) : (
              <div className="empty-gallery">
                <div className="empty-browser browser-window">
                  <div className="browser-header">
                    <div className="browser-dots">
                      <span className="browser-dot red"></span>
                      <span className="browser-dot yellow"></span>
                      <span className="browser-dot green"></span>
                    </div>
                    <div className="browser-url">https://project-pets.app/gallery</div>
                  </div>
                  <div className="browser-content empty-content">
                    <div className="empty-icon">🐾</div>
                    <h3>No pets yet</h3>
                    <p>Be the first to create a pet and start the gallery!</p>
                    <Link to="/create" className="btn btn-rose">
                      Create First Pet
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>

        {/* Right Sidebar - Pet Subjects */}
        <aside className="home-sidebar">
          <div className="panel pets-panel">
            <div className="panel-header">
              <span>🐾 PET SUBJECTS</span>
              <span className="panel-count">{pets.length}</span>
            </div>
            <div className="panel-content">
              {pets.length > 0 ? (
                <div className="pets-list">
                  {pets.slice(0, 6).map((pet) => (
                    <Link 
                      key={pet.id} 
                      to={`/pet/${pet.id}`}
                      className="pet-list-item"
                    >
                      <div className="pet-list-avatar">
                        <img src={pet.imageData} alt={pet.personality.name} />
                      </div>
                      <div className="pet-list-info">
                        <div className="pet-list-header">
                          <span className="pet-list-name">{pet.personality.name}</span>
                          <span className={`status-dot ${pet.status || 'online'}`}></span>
                        </div>
                        <span className="pet-list-status">
                          {getStatusText(pet.status || 'online')}
                        </span>
                      </div>
                      <div className="pet-list-stats">
                        <div className="mini-stat">
                          <span className="mini-stat-icon">🍖</span>
                          <span className="mini-stat-value">{pet.stats?.hunger || 80}</span>
                        </div>
                        <div className="mini-stat">
                          <span className="mini-stat-icon">💖</span>
                          <span className="mini-stat-value">{pet.stats?.happiness || 90}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="pets-empty">
                  <p>No pets created yet</p>
                  <Link to="/create" className="btn btn-small btn-rose">
                    Create Pet
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="panel stats-panel">
            <div className="panel-header">
              <span>📊 STATS</span>
            </div>
            <div className="panel-content">
              <div className="quick-stat">
                <span className="quick-stat-label">Total Pets</span>
                <span className="quick-stat-value">{pets.length}</span>
              </div>
              <div className="quick-stat">
                <span className="quick-stat-label">Tokenized</span>
                <span className="quick-stat-value">
                  {pets.filter(p => p.tokenAddress).length}
                </span>
              </div>
              <div className="quick-stat">
                <span className="quick-stat-label">Online Now</span>
                <span className="quick-stat-value">
                  {pets.filter(p => p.status === 'online' || !p.status).length}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

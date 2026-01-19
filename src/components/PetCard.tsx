import { Link } from 'react-router-dom';
import { Pet } from '../types/pet';
import PumpFunLogo from './PumpFunLogo';
import './PetCard.css';

interface PetCardProps {
  pet: Pet;
}

export default function PetCard({ pet }: PetCardProps) {
  const status = pet.status || 'online';
  const stats = pet.stats || { hunger: 80, happiness: 90, energy: 70, bond: 50 };

  return (
    <Link to={`/pet/${pet.id}`} className="pet-card">
      <div className="pet-card-image">
        {pet.imageData ? (
          <img 
            src={pet.imageData} 
            alt={pet.personality.name}
            className="pet-avatar"
            onError={(e) => {
              console.error('Failed to load pet image:', pet.id);
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="pet-avatar-placeholder">
            <span>🐾</span>
          </div>
        )}
        <div className={`pet-card-status status-dot ${status}`}></div>
      </div>
      
      <div className="pet-card-content">
        <div className="pet-card-header">
          <h3 className="pet-card-name">{pet.personality.name}</h3>
          <span className="pet-card-type">{pet.appearance.type}</span>
        </div>

        <div className="pet-card-stats">
          <div className="pet-card-stat">
            <span className="stat-emoji">🍖</span>
            <div className="progress-bar">
              <div 
                className="progress-fill hunger" 
                style={{ width: `${stats.hunger}%` }}
              ></div>
            </div>
            <span className="stat-num">{stats.hunger}</span>
          </div>
          <div className="pet-card-stat">
            <span className="stat-emoji">💖</span>
            <div className="progress-bar">
              <div 
                className="progress-fill happiness" 
                style={{ width: `${stats.happiness}%` }}
              ></div>
            </div>
            <span className="stat-num">{stats.happiness}</span>
          </div>
        </div>

        <div className="pet-card-footer">
          <div className="pet-card-traits">
            <span className="trait-tag">{pet.personality.temperament}</span>
            {pet.personality.playful && <span className="trait-tag">playful</span>}
          </div>
          {pet.tokenAddress && (
            <span className="token-badge">
              <PumpFunLogo size={14} /> TOKEN
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

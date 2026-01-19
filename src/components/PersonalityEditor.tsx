import { useRef, useEffect } from 'react';
import { PetPersonality, PetType, FAVORITE_FOODS, QUIRKS } from '../types/pet';
import { drawTemperamentIcon, ICON_SIZE } from '../utils/pixelArt';
import './PersonalityEditor.css';

interface PersonalityEditorProps {
  personality: PetPersonality;
  onChange: (personality: PetPersonality) => void;
  petType?: PetType;
}

// Pixel art emoji icon
function TemperamentIcon({ temperament }: { temperament: 'friendly' | 'shy' | 'aggressive' | 'calm' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    drawTemperamentIcon(ctx, temperament);
  }, [temperament]);

  return (
    <canvas 
      ref={canvasRef}
      width={ICON_SIZE}
      height={ICON_SIZE}
      className="temperament-icon-canvas"
    />
  );
}

const TEMPERAMENT_LABELS = {
  friendly: 'Friendly',
  shy: 'Shy',
  aggressive: 'Aggressive',
  calm: 'Calm',
} as const;

export default function PersonalityEditor({ personality, onChange }: PersonalityEditorProps) {
  const updatePersonality = (updates: Partial<PetPersonality>) => {
    onChange({ ...personality, ...updates });
  };

  const toggleQuirk = (quirk: string) => {
    const quirks = personality.quirks.includes(quirk)
      ? personality.quirks.filter(q => q !== quirk)
      : [...personality.quirks, quirk];
    updatePersonality({ quirks });
  };

  return (
    <div className="personality-editor">
      <div className="personality-section">
        <h3>Basic Information</h3>
        
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-input"
            value={personality.name}
            onChange={(e) => updatePersonality({ name: e.target.value })}
            placeholder="Give your pet a name..."
            maxLength={20}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Bio</label>
          <textarea
            className="form-input form-textarea"
            value={personality.bio}
            onChange={(e) => updatePersonality({ bio: e.target.value })}
            placeholder="Tell us about your pet's story..."
            maxLength={200}
            rows={3}
          />
          <span className="char-count">{personality.bio.length}/200</span>
        </div>
      </div>

      <div className="personality-section">
        <h3>Temperament</h3>
        <div className="temperament-options">
          {(['friendly', 'shy', 'aggressive', 'calm'] as const).map((temp) => (
            <button
              key={temp}
              className={`temperament-btn ${personality.temperament === temp ? 'active' : ''}`}
              onClick={() => updatePersonality({ temperament: temp })}
            >
              <TemperamentIcon temperament={temp} />
              <span className="temperament-label">{TEMPERAMENT_LABELS[temp]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="personality-section">
        <h3>Traits</h3>
        
        <div className="trait-row">
          <span className="trait-label">Loves Humans</span>
          <div className="toggle-group">
            <button
              className={`toggle-btn ${personality.lovesHumans ? 'active' : ''}`}
              onClick={() => updatePersonality({ lovesHumans: true })}
            >
              Yes
            </button>
            <button
              className={`toggle-btn ${!personality.lovesHumans ? 'active' : ''}`}
              onClick={() => updatePersonality({ lovesHumans: false })}
            >
              No
            </button>
          </div>
        </div>

        <div className="trait-row">
          <span className="trait-label">Playful</span>
          <div className="toggle-group">
            <button
              className={`toggle-btn ${personality.playful ? 'active' : ''}`}
              onClick={() => updatePersonality({ playful: true })}
            >
              Yes
            </button>
            <button
              className={`toggle-btn ${!personality.playful ? 'active' : ''}`}
              onClick={() => updatePersonality({ playful: false })}
            >
              No
            </button>
          </div>
        </div>

        <div className="trait-row slider-row">
          <span className="trait-label">Activity Level</span>
          <div className="slider-container">
            <span className="slider-emoji">😴</span>
            <input
              type="range"
              min="0"
              max="100"
              value={personality.activityLevel}
              onChange={(e) => updatePersonality({ activityLevel: parseInt(e.target.value) })}
              className="trait-slider activity-slider"
            />
            <span className="slider-emoji">⚡</span>
          </div>
          <span className="slider-value">{personality.activityLevel}%</span>
        </div>

        <div className="trait-row slider-row">
          <span className="trait-label">Noise Level</span>
          <div className="slider-container">
            <span className="slider-emoji">🤫</span>
            <input
              type="range"
              min="0"
              max="100"
              value={personality.noiseLevel}
              onChange={(e) => updatePersonality({ noiseLevel: parseInt(e.target.value) })}
              className="trait-slider noise-slider"
            />
            <span className="slider-emoji">📢</span>
          </div>
          <span className="slider-value">{personality.noiseLevel}%</span>
        </div>
      </div>

      <div className="personality-section">
        <h3>Favorite Food</h3>
        <div className="food-options">
          {FAVORITE_FOODS.map((food) => (
            <button
              key={food}
              className={`food-btn ${personality.favoriteFood === food ? 'active' : ''}`}
              onClick={() => updatePersonality({ favoriteFood: food })}
            >
              {food}
            </button>
          ))}
        </div>
      </div>

      <div className="personality-section">
        <h3>Quirks (select up to 3)</h3>
        <div className="quirks-grid">
          {QUIRKS.map((quirk) => (
            <button
              key={quirk}
              className={`quirk-btn ${personality.quirks.includes(quirk) ? 'active' : ''}`}
              onClick={() => toggleQuirk(quirk)}
              disabled={!personality.quirks.includes(quirk) && personality.quirks.length >= 3}
            >
              {quirk}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

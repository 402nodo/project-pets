import { useRef, useEffect, useState } from 'react';
import { 
  PetType, 
  PetAppearance, 
  BODY_COLORS, 
  EYE_COLORS, 
  ACCESSORIES, 
  GLASSES, 
  HATS,
  BACKGROUNDS 
} from '../types/pet';
import { drawPet, CANVAS_SIZE } from '../utils/pixelArt';
import './PetEditor.css';

const PET_TYPES: { type: PetType; name: string }[] = [
  { type: 'dog', name: 'Dog' },
  { type: 'cat', name: 'Cat' },
  { type: 'hamster', name: 'Hamster' },
  { type: 'parrot', name: 'Parrot' },
  { type: 'fish', name: 'Fish' },
  { type: 'rabbit', name: 'Rabbit' },
  { type: 'turtle', name: 'Turtle' },
  { type: 'rat', name: 'Rat' },
];

interface PetEditorProps {
  appearance: PetAppearance;
  onChange: (appearance: PetAppearance) => void;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

// Mini preview component for pet type selection
function PetTypePreview({ type }: { type: PetType; isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Draw a default pet of this type
    drawPet(ctx, {
      type,
      bodyColor: '#ffb347',
      eyeColor: '#5d4037',
      accessory: null,
      glasses: null,
      hat: null,
      background: 'none',
    });
  }, [type]);

  return (
    <canvas 
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      className="pet-type-preview"
    />
  );
}

export default function PetEditor({ appearance, onChange, onCanvasReady }: PetEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [sparkles, setSparkles] = useState<{x: number; y: number; id: number}[]>([]);

  // Draw pet whenever appearance changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    drawPet(ctx, appearance);
    
    // Notify parent
    if (onCanvasReady) {
      onCanvasReady(canvas);
    }
  }, [appearance, onCanvasReady]);

  // Initial draw on mount - use RAF to ensure canvas is ready
  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        requestAnimationFrame(draw);
        return;
      }
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawPet(ctx, appearance);
        if (onCanvasReady) {
          onCanvasReady(canvas);
        }
      }
    };
    
    requestAnimationFrame(draw);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add sparkle effect on changes
  useEffect(() => {
    const newSparkles = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      id: Date.now() + i,
    }));
    setSparkles(newSparkles);
    
    const timer = setTimeout(() => setSparkles([]), 600);
    return () => clearTimeout(timer);
  }, [appearance.type, appearance.bodyColor, appearance.accessory, appearance.glasses, appearance.hat]);

  const updateAppearance = (updates: Partial<PetAppearance>) => {
    onChange({ ...appearance, ...updates });
  };

  return (
    <div className="pet-editor">
      <div className="editor-preview">
        <div className={`canvas-container ${isAnimating ? 'bounce' : ''}`}>
          <canvas 
            ref={canvasRef} 
            width={CANVAS_SIZE} 
            height={CANVAS_SIZE}
            className="pet-canvas"
          />
          {/* Sparkles */}
          {sparkles.map(sparkle => (
            <div 
              key={sparkle.id}
              className="sparkle"
              style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
            />
          ))}
          {/* Floating particles */}
          <div className="particle particle-1" />
          <div className="particle particle-2" />
          <div className="particle particle-3" />
        </div>
      </div>

      <div className="editor-controls">
        {/* Pet Type Selection */}
        <div className="control-section animate-slide-in" style={{ animationDelay: '0ms' }}>
          <h3 className="control-title">Species</h3>
          <div className="pet-types-grid">
            {PET_TYPES.map(({ type, name }, index) => (
              <button
                key={type}
                className={`pet-type-btn ${appearance.type === type ? 'active' : ''}`}
                onClick={() => updateAppearance({ type })}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <PetTypePreview type={type} isActive={appearance.type === type} />
                <span className="pet-name">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Body Color */}
        <div className="control-section animate-slide-in" style={{ animationDelay: '100ms' }}>
          <h3 className="control-title">Body Color</h3>
          <div className="color-picker">
            {BODY_COLORS.map(({ name, value }, index) => (
              <button
                key={value}
                className={`color-btn ${appearance.bodyColor === value ? 'active' : ''}`}
                style={{ 
                  backgroundColor: value,
                  animationDelay: `${index * 30}ms`
                }}
                onClick={() => updateAppearance({ bodyColor: value })}
                title={name}
              >
                {appearance.bodyColor === value && <span className="check-mark">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Background */}
        <div className="control-section animate-slide-in" style={{ animationDelay: '150ms' }}>
          <h3 className="control-title">Background</h3>
          <div className="background-picker">
            {BACKGROUNDS.map(({ name, value, color }, index) => (
              <button
                key={value}
                className={`background-btn ${appearance.background === value ? 'active' : ''}`}
                style={{ 
                  background: value === 'none' 
                    ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
                    : color,
                  backgroundSize: value === 'none' ? '8px 8px' : 'auto',
                  backgroundPosition: value === 'none' ? '0 0, 0 4px, 4px -4px, -4px 0px' : 'auto',
                  animationDelay: `${index * 30}ms`
                }}
                onClick={() => updateAppearance({ background: value })}
                title={name}
              >
                {appearance.background === value && <span className="check-mark">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Eye Color */}
        <div className="control-section animate-slide-in" style={{ animationDelay: '200ms' }}>
          <h3 className="control-title">Eye Color</h3>
          <div className="color-picker">
            {EYE_COLORS.map(({ name, value }, index) => (
              <button
                key={value}
                className={`color-btn ${appearance.eyeColor === value ? 'active' : ''}`}
                style={{ 
                  backgroundColor: value,
                  animationDelay: `${index * 30}ms`
                }}
                onClick={() => updateAppearance({ eyeColor: value })}
                title={name}
              >
                {appearance.eyeColor === value && <span className="check-mark">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Accessory */}
        <div className="control-section animate-slide-in" style={{ animationDelay: '250ms' }}>
          <h3 className="control-title">Accessory</h3>
          <div className="option-buttons">
            {ACCESSORIES.map(({ name, value }) => (
              <button
                key={name}
                className={`option-btn ${appearance.accessory === value ? 'active' : ''}`}
                onClick={() => updateAppearance({ accessory: value })}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Glasses */}
        <div className="control-section animate-slide-in" style={{ animationDelay: '300ms' }}>
          <h3 className="control-title">Glasses</h3>
          <div className="option-buttons">
            {GLASSES.map(({ name, value }) => (
              <button
                key={name}
                className={`option-btn ${appearance.glasses === value ? 'active' : ''}`}
                onClick={() => updateAppearance({ glasses: value })}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Hat */}
        <div className="control-section animate-slide-in" style={{ animationDelay: '350ms' }}>
          <h3 className="control-title">Hat</h3>
          <div className="option-buttons">
            {HATS.map(({ name, value }) => (
              <button
                key={name}
                className={`option-btn ${appearance.hat === value ? 'active' : ''}`}
                onClick={() => updateAppearance({ hat: value })}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

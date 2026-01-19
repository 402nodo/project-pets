import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import PetEditor from '../components/PetEditor';
import PersonalityEditor from '../components/PersonalityEditor';
import { usePets } from '../context/PetsContext';
import { PetAppearance, PetPersonality, Pet, generateRandomStats, getRandomLocation, getActivityText } from '../types/pet';
import { canvasToDataURL, CANVAS_SIZE, drawPet } from '../utils/pixelArt';
import { launchToken } from '../services/pumpfun';
import './Create.css';

type Step = 'appearance' | 'personality' | 'launch';

const DEFAULT_APPEARANCE: PetAppearance = {
  type: 'dog',
  bodyColor: '#ffb347',
  eyeColor: '#5d4037',
  accessory: null,
  glasses: null,
  hat: null,
  background: 'none',
};

const DEFAULT_PERSONALITY: PetPersonality = {
  name: '',
  temperament: 'friendly',
  lovesHumans: true,
  activityLevel: 50,
  favoriteFood: 'Treats',
  playful: true,
  noiseLevel: 50,
  quirks: [],
  bio: '',
};

export default function Create() {
  const navigate = useNavigate();
  const { addPet } = usePets();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const [step, setStep] = useState<Step>('appearance');
  const [appearance, setAppearance] = useState<PetAppearance>(DEFAULT_APPEARANCE);
  const [personality, setPersonality] = useState<PetPersonality>(DEFAULT_PERSONALITY);
  const [isLaunching, setIsLaunching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const canProceedToLaunch = personality.name.trim().length > 0;

  // Callback to get canvas reference from PetEditor
  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
  }, []);

  // Draw on preview canvas when step changes
  const drawPreview = useCallback(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    drawPet(ctx, appearance);
  }, [appearance]);

  // Draw preview when appearance changes (for personality/launch steps)
  useEffect(() => {
    if (step !== 'appearance') {
      drawPreview();
    }
  }, [step, appearance, drawPreview]);

  const handleNext = () => {
    if (step === 'appearance') {
      setStep('personality');
      setTimeout(drawPreview, 100);
    } else if (step === 'personality' && canProceedToLaunch) {
      setStep('launch');
      setTimeout(drawPreview, 100);
    }
  };

  const handleBack = () => {
    if (step === 'personality') {
      setStep('appearance');
    } else if (step === 'launch') {
      setStep('personality');
    }
  };

  const handleLaunch = async () => {
    const canvas = canvasRef.current || previewCanvasRef.current;
    if (!canvas) return;
    
    setIsLaunching(true);
    setError(null);
    
    try {
      // Redraw pet to ensure canvas is updated
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawPet(ctx, appearance);
      }
      
      // Get image data
      const imageData = canvasToDataURL(canvas);
      
      // Create pet object with new fields
      const petId = uuid();
      const pet: Pet = {
        id: petId,
        appearance,
        personality,
        stats: generateRandomStats(),
        status: 'online',
        location: getRandomLocation(),
        imageData,
        createdAt: Date.now(),
        lastInteraction: Date.now(),
      };
      
      // Try to launch token
      try {
        console.log('🚀 Starting token launch...');
        console.log('Pet details:', {
          name: pet.personality.name,
          id: pet.id
        });
        const tokenAddress = await launchToken(pet, canvas);
        pet.tokenAddress = tokenAddress;
        console.log('✅ Token launched successfully:', tokenAddress);
        // Show success message
        setError(null);
      } catch (tokenError: any) {
        console.error('❌ Token launch failed:', tokenError);
        console.error('Error details:', {
          message: tokenError?.message,
          stack: tokenError?.stack,
          name: tokenError?.name,
          cause: tokenError?.cause
        });
        // Show error to user but continue with pet creation
        const errorMsg = tokenError?.message || 'Unknown error';
        setError(`⚠️ Token launch failed: ${errorMsg}. Pet created without token. Check console for details.`);
        // Continue without token - don't block pet creation
      }
      
      // Show confetti!
      setShowConfetti(true);
      
      // Save pet to shared gallery
      await addPet(pet);
      
      // Navigate to pet page after animation
      setTimeout(() => {
        navigate(`/pet/${petId}`);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to create pet');
      setIsLaunching(false);
    }
  };

  return (
    <div className="page create-page">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i} 
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: ['#fce4ec', '#e8f5e9', '#ede7f6', '#fff3e0', '#e3f2fd'][Math.floor(Math.random() * 5)]
              }}
            />
          ))}
        </div>
      )}

      <div className="container">
        <div className="page-header">
          <h1>CREATE YOUR PET</h1>
          <p>Design, personalize, and tokenize your beloved companion</p>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          <div className={`progress-step ${step === 'appearance' ? 'active' : ''} ${step !== 'appearance' ? 'completed' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Appearance</span>
          </div>
          <div className={`progress-line ${step !== 'appearance' ? 'active' : ''}`} />
          <div className={`progress-step ${step === 'personality' ? 'active' : ''} ${step === 'launch' ? 'completed' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Personality</span>
          </div>
          <div className={`progress-line ${step === 'launch' ? 'active' : ''}`} />
          <div className={`progress-step ${step === 'launch' ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Launch</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="step-content" key={step}>
          {step === 'appearance' && (
            <div className="step-animate">
              <PetEditor
                appearance={appearance}
                onChange={setAppearance}
                onCanvasReady={handleCanvasReady}
              />
            </div>
          )}

          {step === 'personality' && (
            <div className="personality-step step-animate">
              <div className="personality-preview">
                <div className="preview-browser browser-window">
                  <div className="browser-header">
                    <div className="browser-dots">
                      <span className="browser-dot red"></span>
                      <span className="browser-dot yellow"></span>
                      <span className="browser-dot green"></span>
                    </div>
                    <div className="browser-url">preview://{personality.name || 'your-pet'}</div>
                  </div>
                  <div className="browser-content preview-content">
                    <canvas 
                      ref={previewCanvasRef}
                      width={CANVAS_SIZE}
                      height={CANVAS_SIZE}
                      className="preview-canvas"
                    />
                  </div>
                </div>
              </div>
              <PersonalityEditor
                personality={personality}
                onChange={setPersonality}
              />
            </div>
          )}

          {step === 'launch' && (
            <div className="launch-step step-animate">
              <div className="launch-browser browser-window">
                <div className="browser-header">
                  <div className="browser-dots">
                    <span className="browser-dot red"></span>
                    <span className="browser-dot yellow"></span>
                    <span className="browser-dot green"></span>
                  </div>
                  <div className="browser-url">pump.fun/launch/{personality.name.toLowerCase().replace(/\s/g, '-')}</div>
                </div>
                <div className="browser-content launch-content">
                  <div className="launch-preview">
                    <div className="launch-image-wrapper">
                      <canvas 
                        ref={previewCanvasRef}
                        width={CANVAS_SIZE}
                        height={CANVAS_SIZE}
                        className="launch-canvas"
                      />
                    </div>
                    <div className="launch-info">
                      <h2 className="launch-name">{personality.name}</h2>
                      <p className="launch-bio">{personality.bio || 'A wonderful pet looking for friends!'}</p>
                      
                      <div className="launch-traits">
                        <span className="tag tag-lavender">{personality.temperament}</span>
                        <span className="tag tag-mint">{getActivityText(personality.activityLevel)}</span>
                        {personality.lovesHumans && <span className="tag tag-rose">loves humans</span>}
                        {personality.playful && <span className="tag tag-peach">playful</span>}
                      </div>

                      <div className="launch-details">
                        <div className="detail-row">
                          <span>Token Name:</span>
                          <strong>{personality.name}</strong>
                        </div>
                        <div className="detail-row">
                          <span>Token Symbol:</span>
                          <strong>${personality.name.toUpperCase().replace(/\s/g, '').slice(0, 6)}</strong>
                        </div>
                        <div className="detail-row">
                          <span>Type:</span>
                          <strong>{appearance.type}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="step-navigation">
          {step !== 'appearance' && (
            <button className="btn btn-secondary" onClick={handleBack} disabled={isLaunching}>
              ← Back
            </button>
          )}
          
          <div className="nav-spacer" />

          {step !== 'launch' ? (
            <button 
              className="btn btn-accent" 
              onClick={handleNext}
              disabled={step === 'personality' && !canProceedToLaunch}
            >
              Next →
            </button>
          ) : (
            <button 
              className={`btn btn-launch ${isLaunching ? 'launching' : ''}`}
              onClick={handleLaunch}
              disabled={isLaunching}
            >
              {isLaunching ? (
                <>
                  <span className="spinner"></span>
                  Creating...
                </>
              ) : (
                <>
                  ✨ Create Pet
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

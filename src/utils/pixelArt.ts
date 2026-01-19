import { PetType, PetAppearance } from '../types/pet';

// Pixel art canvas size
export const CANVAS_SIZE = 128;
export const PIXEL_SIZE = 4; // Each "pixel" is 4x4 actual pixels
const GRID_SIZE = 32; // 32x32 logical pixels

// Color manipulation
export function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export function darken(hex: string): string {
  return adjustColor(hex, -40);
}

export function lighten(hex: string): string {
  return adjustColor(hex, 40);
}

// Draw a pixel (scaled)
function drawPixel(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
}

// Draw filled rectangle of pixels
function fillRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  width: number, height: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, width * PIXEL_SIZE, height * PIXEL_SIZE);
}

// Draw circle of pixels
function fillCircle(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  radius: number,
  color: string
) {
  ctx.fillStyle = color;
  for (let y = -radius; y <= radius; y++) {
    for (let x = -radius; x <= radius; x++) {
      if (x * x + y * y <= radius * radius) {
        ctx.fillRect((cx + x) * PIXEL_SIZE, (cy + y) * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      }
    }
  }
}

// Draw ellipse of pixels
function fillEllipse(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  rx: number, ry: number,
  color: string
) {
  ctx.fillStyle = color;
  for (let y = -ry; y <= ry; y++) {
    for (let x = -rx; x <= rx; x++) {
      if ((x * x) / (rx * rx) + (y * y) / (ry * ry) <= 1) {
        ctx.fillRect((cx + x) * PIXEL_SIZE, (cy + y) * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      }
    }
  }
}

// Pet drawing functions - centered at (16, 16) in a 32x32 grid
function drawDog(ctx: CanvasRenderingContext2D, bodyColor: string, eyeColor: string) {
  const dark = darken(bodyColor);
  const light = lighten(bodyColor);
  
  // Body
  fillEllipse(ctx, 16, 20, 7, 5, bodyColor);
  
  // Head
  fillCircle(ctx, 16, 11, 6, bodyColor);
  
  // Ears (floppy)
  fillEllipse(ctx, 9, 8, 2, 4, dark);
  fillEllipse(ctx, 23, 8, 2, 4, dark);
  
  // Snout
  fillEllipse(ctx, 16, 13, 3, 2, light);
  
  // Nose
  fillRect(ctx, 15, 13, 2, 2, '#333');
  
  // Eyes
  fillCircle(ctx, 13, 9, 2, '#fff');
  fillCircle(ctx, 19, 9, 2, '#fff');
  drawPixel(ctx, 13, 9, eyeColor);
  drawPixel(ctx, 19, 9, eyeColor);
  drawPixel(ctx, 14, 8, '#fff');
  drawPixel(ctx, 20, 8, '#fff');
  
  // Mouth
  drawPixel(ctx, 15, 15, dark);
  drawPixel(ctx, 16, 15, dark);
  drawPixel(ctx, 17, 15, dark);
  
  // Legs
  fillRect(ctx, 10, 24, 3, 4, bodyColor);
  fillRect(ctx, 19, 24, 3, 4, bodyColor);
  
  // Paws
  fillRect(ctx, 10, 27, 3, 1, dark);
  fillRect(ctx, 19, 27, 3, 1, dark);
  
  // Tail
  fillEllipse(ctx, 24, 19, 2, 2, bodyColor);
}

function drawCat(ctx: CanvasRenderingContext2D, bodyColor: string, eyeColor: string) {
  const dark = darken(bodyColor);
  const light = lighten(bodyColor);
  
  // Body
  fillEllipse(ctx, 16, 20, 6, 5, bodyColor);
  
  // Head
  fillCircle(ctx, 16, 11, 6, bodyColor);
  
  // Ears (pointy triangles)
  // Left ear
  fillRect(ctx, 9, 4, 3, 1, bodyColor);
  fillRect(ctx, 10, 5, 2, 1, bodyColor);
  fillRect(ctx, 10, 6, 2, 1, bodyColor);
  fillRect(ctx, 11, 7, 1, 1, bodyColor);
  drawPixel(ctx, 10, 5, '#ffb6c1');
  
  // Right ear
  fillRect(ctx, 20, 4, 3, 1, bodyColor);
  fillRect(ctx, 20, 5, 2, 1, bodyColor);
  fillRect(ctx, 20, 6, 2, 1, bodyColor);
  fillRect(ctx, 20, 7, 1, 1, bodyColor);
  drawPixel(ctx, 21, 5, '#ffb6c1');
  
  // Face markings
  fillEllipse(ctx, 16, 13, 2, 1, light);
  
  // Nose
  drawPixel(ctx, 16, 12, '#ffb6c1');
  
  // Eyes (cat eyes - vertical pupils)
  fillCircle(ctx, 13, 10, 2, eyeColor);
  fillCircle(ctx, 19, 10, 2, eyeColor);
  fillRect(ctx, 13, 9, 1, 3, '#000');
  fillRect(ctx, 19, 9, 1, 3, '#000');
  drawPixel(ctx, 12, 9, '#fff');
  drawPixel(ctx, 18, 9, '#fff');
  
  // Whiskers
  fillRect(ctx, 6, 11, 4, 1, dark);
  fillRect(ctx, 7, 13, 3, 1, dark);
  fillRect(ctx, 22, 11, 4, 1, dark);
  fillRect(ctx, 22, 13, 3, 1, dark);
  
  // Mouth
  drawPixel(ctx, 15, 13, dark);
  drawPixel(ctx, 17, 13, dark);
  
  // Legs
  fillRect(ctx, 11, 24, 2, 4, bodyColor);
  fillRect(ctx, 19, 24, 2, 4, bodyColor);
  
  // Tail (curved up)
  fillRect(ctx, 22, 19, 1, 3, bodyColor);
  fillRect(ctx, 23, 17, 1, 3, bodyColor);
  fillRect(ctx, 24, 15, 1, 3, bodyColor);
  fillRect(ctx, 25, 14, 1, 2, bodyColor);
}

function drawHamster(ctx: CanvasRenderingContext2D, bodyColor: string, _eyeColor: string) {
  const light = lighten(bodyColor);
  
  // Body (round and chubby)
  fillCircle(ctx, 16, 18, 7, bodyColor);
  
  // Head
  fillCircle(ctx, 16, 11, 6, bodyColor);
  
  // Cheeks (puffy!)
  fillCircle(ctx, 10, 13, 4, light);
  fillCircle(ctx, 22, 13, 4, light);
  
  // Ears (small round)
  fillCircle(ctx, 10, 5, 2, bodyColor);
  fillCircle(ctx, 22, 5, 2, bodyColor);
  drawPixel(ctx, 10, 5, '#ffb6c1');
  drawPixel(ctx, 22, 5, '#ffb6c1');
  
  // Nose
  fillRect(ctx, 15, 12, 2, 2, '#ffb6c1');
  
  // Eyes (beady and cute)
  fillCircle(ctx, 13, 9, 2, '#000');
  fillCircle(ctx, 19, 9, 2, '#000');
  drawPixel(ctx, 12, 8, '#fff');
  drawPixel(ctx, 18, 8, '#fff');
  
  // Tiny paws
  fillRect(ctx, 10, 24, 3, 2, light);
  fillRect(ctx, 19, 24, 3, 2, light);
  
  // Belly
  fillEllipse(ctx, 16, 20, 4, 3, light);
}

function drawParrot(ctx: CanvasRenderingContext2D, bodyColor: string, eyeColor: string, hasHat: boolean = false) {
  const dark = darken(bodyColor);
  
  // Body
  fillEllipse(ctx, 16, 18, 5, 7, bodyColor);
  
  // Wing
  fillEllipse(ctx, 19, 18, 4, 6, dark);
  
  // Head
  fillCircle(ctx, 16, 8, 5, bodyColor);
  
  // Beak (curved)
  fillRect(ctx, 20, 7, 4, 2, '#ffa500');
  fillRect(ctx, 21, 9, 3, 1, '#ff8c00');
  fillRect(ctx, 20, 10, 2, 1, '#ff8c00');
  
  // Crest (colorful feathers) - only draw if no hat
  if (!hasHat) {
    fillRect(ctx, 13, 2, 2, 4, '#ff6347');
    fillRect(ctx, 15, 1, 2, 4, '#ffd700');
    fillRect(ctx, 17, 2, 2, 3, '#32cd32');
  }
  
  // Eye
  fillCircle(ctx, 17, 7, 2, '#fff');
  drawPixel(ctx, 17, 7, eyeColor);
  
  // Eye ring
  drawPixel(ctx, 15, 7, '#fff');
  drawPixel(ctx, 19, 7, '#fff');
  
  // Tail feathers
  fillRect(ctx, 13, 24, 2, 5, '#ff6347');
  fillRect(ctx, 15, 25, 2, 5, bodyColor);
  fillRect(ctx, 17, 24, 2, 5, '#4169e1');
  
  // Feet
  fillRect(ctx, 13, 25, 3, 1, '#666');
  fillRect(ctx, 17, 25, 3, 1, '#666');
}

function drawFish(ctx: CanvasRenderingContext2D, bodyColor: string, eyeColor: string) {
  const dark = darken(bodyColor);
  const light = lighten(bodyColor);
  
  // Body
  fillEllipse(ctx, 16, 16, 9, 6, bodyColor);
  
  // Scales effect
  for (let i = 0; i < 4; i++) {
    fillEllipse(ctx, 11 + i * 3, 16, 1, 2, light);
  }
  
  // Tail fin
  for (let i = 0; i < 5; i++) {
    fillRect(ctx, 25 + i, 12 - i, 1, 8 + i * 2, dark);
  }
  
  // Dorsal fin
  fillRect(ctx, 12, 9, 2, 3, dark);
  fillRect(ctx, 14, 8, 2, 4, dark);
  fillRect(ctx, 16, 9, 2, 3, dark);
  
  // Pectoral fin
  fillEllipse(ctx, 13, 19, 3, 2, dark);
  
  // Eye
  fillCircle(ctx, 9, 15, 3, '#fff');
  fillCircle(ctx, 9, 15, 2, eyeColor);
  drawPixel(ctx, 8, 14, '#fff');
  
  // Mouth
  fillRect(ctx, 5, 16, 2, 2, dark);
  
  // Bubbles
  fillCircle(ctx, 4, 11, 1, '#87ceeb');
  fillCircle(ctx, 3, 8, 1, '#87ceeb');
  fillCircle(ctx, 6, 6, 1, '#87ceeb');
}

function drawRabbit(ctx: CanvasRenderingContext2D, bodyColor: string, eyeColor: string, hasHat: boolean = false) {
  const dark = darken(bodyColor);
  const light = lighten(bodyColor);
  
  // Body
  fillEllipse(ctx, 16, 20, 6, 5, bodyColor);
  
  // Head
  fillCircle(ctx, 16, 13, 6, bodyColor);
  
  // Long ears - only draw if no hat
  if (!hasHat) {
    fillEllipse(ctx, 11, 3, 2, 7, bodyColor);
    fillEllipse(ctx, 21, 3, 2, 7, bodyColor);
    fillEllipse(ctx, 11, 3, 1, 6, '#ffb6c1');
    fillEllipse(ctx, 21, 3, 1, 6, '#ffb6c1');
  }
  
  // Cheeks
  fillCircle(ctx, 11, 15, 3, light);
  fillCircle(ctx, 21, 15, 3, light);
  
  // Nose
  fillEllipse(ctx, 16, 14, 2, 1, '#ffb6c1');
  
  // Eyes
  fillCircle(ctx, 13, 11, 2, eyeColor);
  fillCircle(ctx, 19, 11, 2, eyeColor);
  drawPixel(ctx, 12, 10, '#fff');
  drawPixel(ctx, 18, 10, '#fff');
  
  // Whiskers
  fillRect(ctx, 6, 14, 4, 1, dark);
  fillRect(ctx, 22, 14, 4, 1, dark);
  
  // Buck teeth
  fillRect(ctx, 15, 16, 1, 2, '#fff');
  fillRect(ctx, 16, 16, 1, 2, '#fff');
  
  // Feet (big back feet)
  fillEllipse(ctx, 10, 26, 4, 2, bodyColor);
  fillEllipse(ctx, 22, 26, 4, 2, bodyColor);
  
  // Tail (fluffy cotton ball)
  fillCircle(ctx, 23, 21, 3, '#fff');
}

function drawTurtle(ctx: CanvasRenderingContext2D, bodyColor: string, eyeColor: string) {
  const dark = darken(bodyColor);
  const shellColor = '#228b22';
  const shellDark = darken(shellColor);
  
  // Shell
  fillEllipse(ctx, 16, 16, 9, 7, shellColor);
  
  // Shell pattern
  fillCircle(ctx, 16, 15, 4, shellDark);
  fillCircle(ctx, 11, 17, 2, shellDark);
  fillCircle(ctx, 21, 17, 2, shellDark);
  fillCircle(ctx, 13, 12, 2, shellDark);
  fillCircle(ctx, 19, 12, 2, shellDark);
  
  // Shell highlights
  drawPixel(ctx, 14, 13, lighten(shellColor));
  drawPixel(ctx, 18, 13, lighten(shellColor));
  
  // Head
  fillCircle(ctx, 6, 14, 4, bodyColor);
  
  // Eyes
  fillCircle(ctx, 4, 13, 1, '#fff');
  drawPixel(ctx, 4, 13, eyeColor);
  
  // Mouth
  drawPixel(ctx, 3, 15, dark);
  
  // Legs
  fillEllipse(ctx, 9, 21, 3, 2, bodyColor);
  fillEllipse(ctx, 23, 21, 3, 2, bodyColor);
  fillEllipse(ctx, 9, 11, 3, 2, bodyColor);
  fillEllipse(ctx, 23, 11, 3, 2, bodyColor);
  
  // Tail
  fillRect(ctx, 25, 16, 3, 2, bodyColor);
}

function drawRat(ctx: CanvasRenderingContext2D, bodyColor: string, _eyeColor: string, hasHat: boolean = false) {
  const dark = darken(bodyColor);
  const light = lighten(bodyColor);
  
  // Body (elongated)
  fillEllipse(ctx, 17, 18, 7, 5, bodyColor);
  
  // Head (pointed)
  fillEllipse(ctx, 9, 14, 5, 4, bodyColor);
  
  // Snout
  fillEllipse(ctx, 4, 14, 3, 2, light);
  
  // Nose
  fillRect(ctx, 2, 14, 2, 2, '#ffb6c1');
  
  // Ears (round) - only draw if no hat
  if (!hasHat) {
    fillCircle(ctx, 10, 9, 3, bodyColor);
    fillCircle(ctx, 16, 9, 3, bodyColor);
    fillCircle(ctx, 10, 9, 2, '#ffb6c1');
    fillCircle(ctx, 16, 9, 2, '#ffb6c1');
  }
  
  // Eyes
  fillCircle(ctx, 7, 13, 2, '#000');
  drawPixel(ctx, 6, 12, '#fff');
  
  // Whiskers
  fillRect(ctx, 0, 12, 3, 1, dark);
  fillRect(ctx, 0, 14, 2, 1, dark);
  fillRect(ctx, 0, 16, 3, 1, dark);
  
  // Legs
  fillRect(ctx, 12, 22, 3, 3, bodyColor);
  fillRect(ctx, 19, 22, 3, 3, bodyColor);
  
  // Tail (long and curved)
  fillRect(ctx, 24, 18, 4, 1, '#ffb6c1');
  fillRect(ctx, 27, 17, 3, 1, '#ffb6c1');
  fillRect(ctx, 29, 15, 2, 2, '#ffb6c1');
}

// Pet-specific accessory drawing functions
function drawAccessoryForFish(ctx: CanvasRenderingContext2D, accessory: string) {
  // Fish body is horizontal, accessory goes around the body near the head
  // Body center is around x=16, y=16, head is at x=9, y=15
  // Place accessory on the body near where neck would be (around x=12-14, y=16)
  const neckX = 12;
  const neckY = 16;
  
  if (accessory === 'collar-red' || accessory === 'collar-blue') {
    const color = accessory === 'collar-red' ? '#d32f2f' : '#1976d2';
    // Horizontal collar around body
    fillRect(ctx, neckX - 2, neckY - 1, 6, 2, color);
    fillCircle(ctx, neckX + 1, neckY, 1, '#ffd700'); // Bell/tag
  } else if (accessory === 'bow-pink') {
    const color = '#ff69b4';
    fillRect(ctx, neckX, neckY - 1, 3, 2, color);
    fillCircle(ctx, neckX - 1, neckY, 1, color);
    fillCircle(ctx, neckX + 3, neckY, 1, color);
  } else if (accessory === 'chain-gold') {
    for (let i = 0; i < 6; i++) {
      drawPixel(ctx, neckX - 2 + i, neckY, i % 2 === 0 ? '#ffd700' : '#daa520');
    }
  } else if (accessory === 'bell') {
    fillRect(ctx, neckX - 2, neckY - 1, 6, 2, '#d32f2f');
    fillCircle(ctx, neckX + 1, neckY + 1, 1, '#ffd700');
  }
}

function drawAccessoryForTurtle(ctx: CanvasRenderingContext2D, accessory: string) {
  // Turtle: head at x=6, y=14, shell at x=16, y=16
  // Neck is between head and shell, around x=10-12, y=15
  const neckX = 10;
  const neckY = 15;
  
  if (accessory === 'collar-red' || accessory === 'collar-blue') {
    const color = accessory === 'collar-red' ? '#d32f2f' : '#1976d2';
    fillRect(ctx, neckX - 1, neckY - 1, 4, 2, color);
    fillCircle(ctx, neckX + 1, neckY, 1, '#ffd700');
  } else if (accessory === 'bow-pink') {
    const color = '#ff69b4';
    fillRect(ctx, neckX, neckY - 1, 2, 2, color);
    fillCircle(ctx, neckX - 1, neckY, 1, color);
    fillCircle(ctx, neckX + 2, neckY, 1, color);
  } else if (accessory === 'chain-gold') {
    for (let i = 0; i < 4; i++) {
      drawPixel(ctx, neckX - 1 + i, neckY, i % 2 === 0 ? '#ffd700' : '#daa520');
    }
  } else if (accessory === 'bell') {
    fillRect(ctx, neckX - 1, neckY - 1, 4, 2, '#d32f2f');
    fillCircle(ctx, neckX + 1, neckY + 1, 1, '#ffd700');
  }
}

function drawAccessoryForRat(ctx: CanvasRenderingContext2D, accessory: string) {
  // Rat: head at x=9, y=14, body at x=17, y=18
  // Neck is between head and body, around x=12-14, y=16
  const neckX = 13;
  const neckY = 16;
  
  if (accessory === 'collar-red' || accessory === 'collar-blue') {
    const color = accessory === 'collar-red' ? '#d32f2f' : '#1976d2';
    fillRect(ctx, neckX - 2, neckY - 1, 5, 2, color);
    fillCircle(ctx, neckX, neckY, 1, '#ffd700');
  } else if (accessory === 'bow-pink') {
    const color = '#ff69b4';
    fillRect(ctx, neckX - 1, neckY - 1, 3, 2, color);
    fillCircle(ctx, neckX - 2, neckY, 1, color);
    fillCircle(ctx, neckX + 2, neckY, 1, color);
  } else if (accessory === 'chain-gold') {
    for (let i = 0; i < 5; i++) {
      drawPixel(ctx, neckX - 2 + i, neckY, i % 2 === 0 ? '#ffd700' : '#daa520');
    }
  } else if (accessory === 'bell') {
    fillRect(ctx, neckX - 2, neckY - 1, 5, 2, '#d32f2f');
    fillCircle(ctx, neckX, neckY + 1, 1, '#ffd700');
  }
}

function drawAccessoryForParrot(ctx: CanvasRenderingContext2D, accessory: string) {
  // Parrot: head at x=16, y=8, body at x=16, y=18
  // Neck is between head and body, around x=16, y=12-13
  const neckX = 16;
  const neckY = 13;
  
  if (accessory === 'collar-red' || accessory === 'collar-blue') {
    const color = accessory === 'collar-red' ? '#d32f2f' : '#1976d2';
    fillRect(ctx, neckX - 3, neckY - 1, 6, 2, color);
    fillCircle(ctx, neckX, neckY, 1, '#ffd700');
  } else if (accessory === 'bow-pink') {
    const color = '#ff69b4';
    fillRect(ctx, neckX - 1, neckY - 1, 3, 2, color);
    fillCircle(ctx, neckX - 2, neckY, 1, color);
    fillCircle(ctx, neckX + 2, neckY, 1, color);
  } else if (accessory === 'chain-gold') {
    for (let i = 0; i < 6; i++) {
      drawPixel(ctx, neckX - 3 + i, neckY, i % 2 === 0 ? '#ffd700' : '#daa520');
    }
  } else if (accessory === 'bell') {
    fillRect(ctx, neckX - 3, neckY - 1, 6, 2, '#d32f2f');
    fillCircle(ctx, neckX, neckY + 1, 1, '#ffd700');
  }
}

function drawAccessoryForRabbit(ctx: CanvasRenderingContext2D, accessory: string) {
  // Rabbit: head at x=16, y=13, body at x=16, y=20
  // Neck is between head and body, around x=16, y=16-17
  const neckX = 16;
  const neckY = 17;
  
  if (accessory === 'collar-red' || accessory === 'collar-blue') {
    const color = accessory === 'collar-red' ? '#d32f2f' : '#1976d2';
    fillRect(ctx, neckX - 3, neckY - 1, 6, 2, color);
    fillCircle(ctx, neckX, neckY, 1, '#ffd700');
  } else if (accessory === 'bow-pink') {
    const color = '#ff69b4';
    fillRect(ctx, neckX - 1, neckY - 1, 3, 2, color);
    fillCircle(ctx, neckX - 2, neckY, 1, color);
    fillCircle(ctx, neckX + 2, neckY, 1, color);
  } else if (accessory === 'chain-gold') {
    for (let i = 0; i < 6; i++) {
      drawPixel(ctx, neckX - 3 + i, neckY, i % 2 === 0 ? '#ffd700' : '#daa520');
    }
  } else if (accessory === 'bell') {
    fillRect(ctx, neckX - 3, neckY - 1, 6, 2, '#d32f2f');
    fillCircle(ctx, neckX, neckY + 1, 1, '#ffd700');
  }
}

// Standard accessory drawing functions (for dog, cat, hamster)
function drawCollar(ctx: CanvasRenderingContext2D, color: string, yOffset: number) {
  fillRect(ctx, 11, 15 + yOffset, 10, 2, color);
  fillCircle(ctx, 16, 17 + yOffset, 1, '#ffd700'); // Bell/tag
}

function drawBow(ctx: CanvasRenderingContext2D, color: string, yOffset: number) {
  fillRect(ctx, 14, 15 + yOffset, 4, 2, color);
  fillCircle(ctx, 12, 16 + yOffset, 2, color);
  fillCircle(ctx, 20, 16 + yOffset, 2, color);
}

function drawChain(ctx: CanvasRenderingContext2D, yOffset: number) {
  for (let i = 0; i < 10; i++) {
    drawPixel(ctx, 11 + i, 15 + yOffset, i % 2 === 0 ? '#ffd700' : '#daa520');
  }
}

function drawBellAccessory(ctx: CanvasRenderingContext2D, yOffset: number) {
  fillRect(ctx, 11, 15 + yOffset, 10, 2, '#d32f2f');
  fillCircle(ctx, 16, 18 + yOffset, 2, '#ffd700');
}

// Pet-specific glasses drawing functions
function drawGlassesForFish(ctx: CanvasRenderingContext2D, type: string) {
  // Fish has one eye at x=9, y=15
  const eyeX = 9;
  const eyeY = 15;
  
  if (type === 'round') {
    fillCircle(ctx, eyeX, eyeY, 3, 'rgba(135, 206, 250, 0.4)');
    drawPixel(ctx, eyeX - 3, eyeY, '#333');
    drawPixel(ctx, eyeX + 3, eyeY, '#333');
    drawPixel(ctx, eyeX, eyeY - 3, '#333');
    drawPixel(ctx, eyeX, eyeY + 3, '#333');
  } else if (type === 'square') {
    fillRect(ctx, eyeX - 3, eyeY - 2, 6, 5, 'rgba(135, 206, 250, 0.4)');
    fillRect(ctx, eyeX - 3, eyeY - 2, 6, 1, '#333');
    fillRect(ctx, eyeX - 3, eyeY + 2, 6, 1, '#333');
    fillRect(ctx, eyeX - 3, eyeY - 2, 1, 5, '#333');
    fillRect(ctx, eyeX + 2, eyeY - 2, 1, 5, '#333');
  } else if (type === 'sunglasses') {
    fillRect(ctx, eyeX - 3, eyeY - 2, 7, 5, '#1a1a1a');
    drawPixel(ctx, eyeX - 2, eyeY - 1, '#444');
  } else if (type === 'heart') {
    const color = '#ff69b4';
    fillCircle(ctx, eyeX - 1, eyeY - 1, 2, color);
    fillCircle(ctx, eyeX + 1, eyeY - 1, 2, color);
    fillRect(ctx, eyeX - 1, eyeY, 3, 3, color);
    drawPixel(ctx, eyeX, eyeY + 3, color);
  }
}

function drawGlassesForTurtle(ctx: CanvasRenderingContext2D, type: string) {
  // Turtle has one eye at x=4, y=13 (head is on the left)
  const eyeX = 4;
  const eyeY = 13;
  
  if (type === 'round') {
    fillCircle(ctx, eyeX, eyeY, 2, 'rgba(135, 206, 250, 0.4)');
    drawPixel(ctx, eyeX - 2, eyeY, '#333');
    drawPixel(ctx, eyeX + 2, eyeY, '#333');
    drawPixel(ctx, eyeX, eyeY - 2, '#333');
    drawPixel(ctx, eyeX, eyeY + 2, '#333');
  } else if (type === 'square') {
    fillRect(ctx, eyeX - 2, eyeY - 2, 5, 4, 'rgba(135, 206, 250, 0.4)');
    fillRect(ctx, eyeX - 2, eyeY - 2, 5, 1, '#333');
    fillRect(ctx, eyeX - 2, eyeY + 1, 5, 1, '#333');
    fillRect(ctx, eyeX - 2, eyeY - 2, 1, 4, '#333');
    fillRect(ctx, eyeX + 2, eyeY - 2, 1, 4, '#333');
  } else if (type === 'sunglasses') {
    fillRect(ctx, eyeX - 2, eyeY - 2, 6, 4, '#1a1a1a');
    drawPixel(ctx, eyeX - 1, eyeY - 1, '#444');
  } else if (type === 'heart') {
    const color = '#ff69b4';
    fillCircle(ctx, eyeX - 1, eyeY - 1, 1, color);
    fillCircle(ctx, eyeX + 1, eyeY - 1, 1, color);
    fillRect(ctx, eyeX - 1, eyeY, 3, 2, color);
  }
}

function drawGlassesForRat(ctx: CanvasRenderingContext2D, type: string) {
  // Rat has one eye at x=7, y=13
  const eyeX = 7;
  const eyeY = 13;
  
  if (type === 'round') {
    fillCircle(ctx, eyeX, eyeY, 2, 'rgba(135, 206, 250, 0.4)');
    drawPixel(ctx, eyeX - 2, eyeY, '#333');
    drawPixel(ctx, eyeX + 2, eyeY, '#333');
    drawPixel(ctx, eyeX, eyeY - 2, '#333');
    drawPixel(ctx, eyeX, eyeY + 2, '#333');
  } else if (type === 'square') {
    fillRect(ctx, eyeX - 2, eyeY - 2, 5, 4, 'rgba(135, 206, 250, 0.4)');
    fillRect(ctx, eyeX - 2, eyeY - 2, 5, 1, '#333');
    fillRect(ctx, eyeX - 2, eyeY + 1, 5, 1, '#333');
    fillRect(ctx, eyeX - 2, eyeY - 2, 1, 4, '#333');
    fillRect(ctx, eyeX + 2, eyeY - 2, 1, 4, '#333');
  } else if (type === 'sunglasses') {
    fillRect(ctx, eyeX - 2, eyeY - 2, 6, 4, '#1a1a1a');
    drawPixel(ctx, eyeX - 1, eyeY - 1, '#444');
  } else if (type === 'heart') {
    const color = '#ff69b4';
    fillCircle(ctx, eyeX - 1, eyeY - 1, 1, color);
    fillCircle(ctx, eyeX + 1, eyeY - 1, 1, color);
    fillRect(ctx, eyeX - 1, eyeY, 3, 2, color);
  }
}

function drawGlassesForParrot(ctx: CanvasRenderingContext2D, type: string) {
  // Parrot has one eye at x=17, y=7 (head is on top, looking forward)
  const eyeX = 17;
  const eyeY = 7;
  
  if (type === 'round') {
    fillCircle(ctx, eyeX, eyeY, 2, 'rgba(135, 206, 250, 0.4)');
    drawPixel(ctx, eyeX - 2, eyeY, '#333');
    drawPixel(ctx, eyeX + 2, eyeY, '#333');
    drawPixel(ctx, eyeX, eyeY - 2, '#333');
    drawPixel(ctx, eyeX, eyeY + 2, '#333');
  } else if (type === 'square') {
    fillRect(ctx, eyeX - 2, eyeY - 2, 5, 4, 'rgba(135, 206, 250, 0.4)');
    fillRect(ctx, eyeX - 2, eyeY - 2, 5, 1, '#333');
    fillRect(ctx, eyeX - 2, eyeY + 1, 5, 1, '#333');
    fillRect(ctx, eyeX - 2, eyeY - 2, 1, 4, '#333');
    fillRect(ctx, eyeX + 2, eyeY - 2, 1, 4, '#333');
  } else if (type === 'sunglasses') {
    fillRect(ctx, eyeX - 2, eyeY - 2, 6, 4, '#1a1a1a');
    drawPixel(ctx, eyeX - 1, eyeY - 1, '#444');
  } else if (type === 'heart') {
    const color = '#ff69b4';
    fillCircle(ctx, eyeX - 1, eyeY - 1, 1, color);
    fillCircle(ctx, eyeX + 1, eyeY - 1, 1, color);
    fillRect(ctx, eyeX - 1, eyeY, 3, 2, color);
  }
}

function drawGlassesForRabbit(ctx: CanvasRenderingContext2D, type: string) {
  // Rabbit has two eyes at x=13,19, y=11 (symmetric)
  const leftEyeX = 13;
  const rightEyeX = 19;
  const eyeY = 11;
  
  if (type === 'round') {
    // Left lens
    fillCircle(ctx, leftEyeX, eyeY, 2, 'rgba(135, 206, 250, 0.4)');
    drawPixel(ctx, leftEyeX - 2, eyeY, '#333');
    drawPixel(ctx, leftEyeX + 2, eyeY, '#333');
    // Right lens
    fillCircle(ctx, rightEyeX, eyeY, 2, 'rgba(135, 206, 250, 0.4)');
    drawPixel(ctx, rightEyeX - 2, eyeY, '#333');
    drawPixel(ctx, rightEyeX + 2, eyeY, '#333');
    // Bridge
    fillRect(ctx, 15, eyeY, 2, 1, '#333');
  } else if (type === 'square') {
    // Left lens
    fillRect(ctx, leftEyeX - 2, eyeY - 2, 5, 4, 'rgba(135, 206, 250, 0.4)');
    fillRect(ctx, leftEyeX - 2, eyeY - 2, 5, 1, '#333');
    fillRect(ctx, leftEyeX - 2, eyeY + 1, 5, 1, '#333');
    fillRect(ctx, leftEyeX - 2, eyeY - 2, 1, 4, '#333');
    fillRect(ctx, leftEyeX + 2, eyeY - 2, 1, 4, '#333');
    // Right lens
    fillRect(ctx, rightEyeX - 2, eyeY - 2, 5, 4, 'rgba(135, 206, 250, 0.4)');
    fillRect(ctx, rightEyeX - 2, eyeY - 2, 5, 1, '#333');
    fillRect(ctx, rightEyeX - 2, eyeY + 1, 5, 1, '#333');
    fillRect(ctx, rightEyeX - 2, eyeY - 2, 1, 4, '#333');
    fillRect(ctx, rightEyeX + 2, eyeY - 2, 1, 4, '#333');
    // Bridge
    fillRect(ctx, 15, eyeY, 2, 1, '#333');
  } else if (type === 'sunglasses') {
    // Left lens
    fillRect(ctx, leftEyeX - 3, eyeY - 2, 6, 4, '#1a1a1a');
    // Right lens
    fillRect(ctx, rightEyeX - 3, eyeY - 2, 6, 4, '#1a1a1a');
    // Bridge
    fillRect(ctx, 15, eyeY, 2, 1, '#333');
    // Shine
    drawPixel(ctx, leftEyeX - 2, eyeY - 1, '#444');
    drawPixel(ctx, rightEyeX - 2, eyeY - 1, '#444');
  } else if (type === 'heart') {
    const color = '#ff69b4';
    // Left heart
    fillCircle(ctx, leftEyeX - 1, eyeY - 1, 1, color);
    fillCircle(ctx, leftEyeX + 1, eyeY - 1, 1, color);
    fillRect(ctx, leftEyeX - 1, eyeY, 3, 2, color);
    // Right heart
    fillCircle(ctx, rightEyeX - 1, eyeY - 1, 1, color);
    fillCircle(ctx, rightEyeX + 1, eyeY - 1, 1, color);
    fillRect(ctx, rightEyeX - 1, eyeY, 3, 2, color);
    // Bridge
    fillRect(ctx, 15, eyeY, 2, 1, color);
  }
}

// Standard glasses drawing (for dog, cat, hamster)
function drawRoundGlasses(ctx: CanvasRenderingContext2D, yOffset: number) {
  // Left lens
  fillCircle(ctx, 12, 9 + yOffset, 3, 'rgba(135, 206, 250, 0.4)');
  drawPixel(ctx, 9, 9 + yOffset, '#333');
  drawPixel(ctx, 15, 9 + yOffset, '#333');
  drawPixel(ctx, 12, 6 + yOffset, '#333');
  drawPixel(ctx, 12, 12 + yOffset, '#333');
  
  // Right lens
  fillCircle(ctx, 20, 9 + yOffset, 3, 'rgba(135, 206, 250, 0.4)');
  drawPixel(ctx, 17, 9 + yOffset, '#333');
  drawPixel(ctx, 23, 9 + yOffset, '#333');
  drawPixel(ctx, 20, 6 + yOffset, '#333');
  drawPixel(ctx, 20, 12 + yOffset, '#333');
  
  // Bridge
  fillRect(ctx, 15, 9 + yOffset, 2, 1, '#333');
}

function drawSquareGlasses(ctx: CanvasRenderingContext2D, yOffset: number) {
  // Left lens
  fillRect(ctx, 9, 7 + yOffset, 6, 5, 'rgba(135, 206, 250, 0.4)');
  fillRect(ctx, 9, 7 + yOffset, 6, 1, '#333');
  fillRect(ctx, 9, 11 + yOffset, 6, 1, '#333');
  fillRect(ctx, 9, 7 + yOffset, 1, 5, '#333');
  fillRect(ctx, 14, 7 + yOffset, 1, 5, '#333');
  
  // Right lens
  fillRect(ctx, 17, 7 + yOffset, 6, 5, 'rgba(135, 206, 250, 0.4)');
  fillRect(ctx, 17, 7 + yOffset, 6, 1, '#333');
  fillRect(ctx, 17, 11 + yOffset, 6, 1, '#333');
  fillRect(ctx, 17, 7 + yOffset, 1, 5, '#333');
  fillRect(ctx, 22, 7 + yOffset, 1, 5, '#333');
  
  // Bridge
  fillRect(ctx, 15, 9 + yOffset, 2, 1, '#333');
}

function drawSunglasses(ctx: CanvasRenderingContext2D, yOffset: number) {
  // Left lens
  fillRect(ctx, 8, 7 + yOffset, 7, 5, '#1a1a1a');
  
  // Right lens  
  fillRect(ctx, 17, 7 + yOffset, 7, 5, '#1a1a1a');
  
  // Bridge
  fillRect(ctx, 15, 9 + yOffset, 2, 1, '#333');
  
  // Shine
  drawPixel(ctx, 9, 8 + yOffset, '#444');
  drawPixel(ctx, 18, 8 + yOffset, '#444');
}

function drawHeartGlasses(ctx: CanvasRenderingContext2D, yOffset: number) {
  const color = '#ff69b4';
  
  // Left heart
  fillCircle(ctx, 10, 8 + yOffset, 2, color);
  fillCircle(ctx, 14, 8 + yOffset, 2, color);
  fillRect(ctx, 10, 9 + yOffset, 5, 3, color);
  drawPixel(ctx, 12, 12 + yOffset, color);
  
  // Right heart
  fillCircle(ctx, 18, 8 + yOffset, 2, color);
  fillCircle(ctx, 22, 8 + yOffset, 2, color);
  fillRect(ctx, 18, 9 + yOffset, 5, 3, color);
  drawPixel(ctx, 20, 12 + yOffset, color);
  
  // Bridge
  fillRect(ctx, 15, 9 + yOffset, 2, 1, color);
}

// Pet-specific hat drawing functions
function drawHatForFish(ctx: CanvasRenderingContext2D, hat: string) {
  // Fish: dorsal fin at y=8-9, hat should cover fin and be on top
  // Hat goes above dorsal fin (y=8) to y=6-7
  const headX = 14; // Center of dorsal fin area
  const hatTopY = 6; // Above dorsal fin
  
  if (hat === 'tophat') {
    fillRect(ctx, headX - 2, hatTopY + 3, 6, 1, '#1a1a1a'); // Brim (on fin level)
    fillRect(ctx, headX - 1, hatTopY, 4, 4, '#1a1a1a'); // Top (covers fin)
    fillRect(ctx, headX - 1, hatTopY + 2, 4, 1, '#8b0000'); // Band
  } else if (hat === 'crown') {
    const gold = '#ffd700';
    fillRect(ctx, headX - 2, hatTopY + 3, 6, 2, gold);
    fillRect(ctx, headX - 2, hatTopY + 1, 2, 2, gold);
    fillRect(ctx, headX + 2, hatTopY + 1, 2, 2, gold);
    fillCircle(ctx, headX - 1, hatTopY + 2, 1, '#ff0000');
    fillCircle(ctx, headX + 3, hatTopY + 2, 1, '#0000ff');
  } else if (hat === 'bow') {
    const color = '#ff69b4';
    fillRect(ctx, headX - 1, hatTopY + 2, 3, 3, color);
    fillCircle(ctx, headX - 2, hatTopY + 3, 1, color);
    fillCircle(ctx, headX + 2, hatTopY + 3, 1, color);
  } else if (hat === 'beret') {
    fillEllipse(ctx, headX, hatTopY + 3, 4, 2, '#2f4f4f');
    fillCircle(ctx, headX, hatTopY + 1, 1, '#2f4f4f');
  } else if (hat === 'wizard') {
    fillRect(ctx, headX - 3, hatTopY + 3, 8, 1, '#4b0082');
    for (let i = 0; i < 5; i++) {
      const width = 7 - i;
      const x = headX - 3 + i;
      fillRect(ctx, x, hatTopY + 3 - i, width, 1, '#4b0082');
    }
    drawPixel(ctx, headX, hatTopY - 1, '#ffd700');
  }
}

function drawHatForTurtle(ctx: CanvasRenderingContext2D, hat: string) {
  // Turtle: eyes at y=13 (glasses at y=13), hat should be ABOVE glasses
  const headX = 6;
  const headTopY = 9; // Above glasses (glasses at y=13)
  
  if (hat === 'tophat') {
    fillRect(ctx, headX - 2, headTopY + 1, 4, 1, '#1a1a1a'); // Brim above glasses
    fillRect(ctx, headX - 1, headTopY - 2, 2, 4, '#1a1a1a'); // Top (taller)
    fillRect(ctx, headX - 1, headTopY, 2, 1, '#8b0000');
  } else if (hat === 'crown') {
    const gold = '#ffd700';
    fillRect(ctx, headX - 2, headTopY + 1, 4, 2, gold);
    fillRect(ctx, headX - 2, headTopY - 1, 1, 2, gold);
    fillRect(ctx, headX + 1, headTopY - 1, 1, 2, gold);
    fillCircle(ctx, headX - 1, headTopY, 1, '#ff0000');
    fillCircle(ctx, headX + 1, headTopY, 1, '#0000ff');
  } else if (hat === 'bow') {
    const color = '#ff69b4';
    fillRect(ctx, headX - 1, headTopY, 2, 2, color);
    fillCircle(ctx, headX - 2, headTopY + 1, 1, color);
    fillCircle(ctx, headX + 1, headTopY + 1, 1, color);
  } else if (hat === 'beret') {
    fillEllipse(ctx, headX, headTopY + 1, 3, 2, '#2f4f4f');
    fillCircle(ctx, headX, headTopY - 1, 1, '#2f4f4f');
  } else if (hat === 'wizard') {
    fillRect(ctx, headX - 2, headTopY + 1, 5, 1, '#4b0082');
    for (let i = 0; i < 4; i++) {
      const width = 4 - i;
      const x = headX - 1 + i;
      fillRect(ctx, x, headTopY + 1 - i, width, 1, '#4b0082');
    }
    drawPixel(ctx, headX, headTopY - 2, '#ffd700');
  }
}

function drawHatForRat(ctx: CanvasRenderingContext2D, hat: string) {
  // Rat: head at x=9 (fillEllipse(ctx, 9, 14, 5, 4, ...)), ears were at x=10,16 y=9
  // Hat should be on head, shifted left to align with head center
  const headX = 10; // Head center is around x=9-11, align with head (shift left from x=11)
  const hatTopY = 6; // Top of hat (ears were at y=9)
  
  if (hat === 'tophat') {
    // Wider brim to fully cover ear area
    fillRect(ctx, headX - 4, hatTopY + 4, 10, 1, '#1a1a1a'); // Brim (covers ear area at y=9-10)
    fillRect(ctx, headX - 3, hatTopY, 8, 5, '#1a1a1a'); // Top (taller, covers ear area)
    fillRect(ctx, headX - 3, hatTopY + 3, 8, 1, '#8b0000'); // Band
  } else if (hat === 'crown') {
    const gold = '#ffd700';
    fillRect(ctx, headX - 4, hatTopY + 4, 10, 2, gold); // Base covering ear area
    fillRect(ctx, headX - 4, hatTopY + 2, 2, 2, gold); // Left point
    fillRect(ctx, headX + 3, hatTopY + 2, 2, 2, gold); // Right point
    fillCircle(ctx, headX - 3, hatTopY + 3, 1, '#ff0000');
    fillCircle(ctx, headX + 4, hatTopY + 3, 1, '#0000ff');
  } else if (hat === 'bow') {
    const color = '#ff69b4';
    fillRect(ctx, headX - 1, hatTopY + 3, 3, 3, color); // Center covering ear area
    fillCircle(ctx, headX - 4, hatTopY + 4, 2, color); // Left loop (covers where ear was)
    fillCircle(ctx, headX + 3, hatTopY + 4, 2, color); // Right loop (covers where ear was)
  } else if (hat === 'beret') {
    fillEllipse(ctx, headX, hatTopY + 4, 6, 3, '#2f4f4f'); // Wider to cover ear area
    fillCircle(ctx, headX, hatTopY + 2, 1, '#2f4f4f');
  } else if (hat === 'wizard') {
    fillRect(ctx, headX - 4, hatTopY + 4, 10, 1, '#4b0082'); // Wide brim covering ear area
    for (let i = 0; i < 5; i++) {
      const width = 9 - i;
      const x = headX - 4 + i;
      fillRect(ctx, x, hatTopY + 4 - i, width, 1, '#4b0082');
    }
    drawPixel(ctx, headX, hatTopY - 1, '#ffd700');
  }
}

function drawHatForRabbit(ctx: CanvasRenderingContext2D, hat: string) {
  // Rabbit: ears go from y=3 to y=10, eyes at y=11 (glasses at y=11)
  // Hat must be ABOVE glasses, so brim should be at y=9 (above glasses at y=11)
  const headX = 16; // Center between ears (left ear x=11, right ear x=21)
  const hatTopY = 0; // Top of hat
  
  if (hat === 'tophat') {
    // Brim above glasses (glasses at y=11, brim at y=9)
    fillRect(ctx, 10, 9, 12, 1, '#1a1a1a'); // Wide brim above glasses
    fillRect(ctx, 12, hatTopY, 8, 10, '#1a1a1a'); // Top (taller to cover ears and be above glasses)
    fillRect(ctx, 12, 7, 8, 1, '#8b0000'); // Band
  } else if (hat === 'crown') {
    const gold = '#ffd700';
    fillRect(ctx, 10, 9, 12, 2, gold); // Base above glasses
    // Points
    fillRect(ctx, 10, 6, 3, 3, gold);
    fillRect(ctx, 14, 5, 4, 4, gold);
    fillRect(ctx, 19, 6, 3, 3, gold);
    // Jewels
    fillCircle(ctx, 11, 8, 1, '#ff0000');
    fillCircle(ctx, 16, 7, 1, '#0000ff');
    fillCircle(ctx, 21, 8, 1, '#00ff00');
  } else if (hat === 'bow') {
    const color = '#ff69b4';
    fillRect(ctx, 13, 8, 6, 3, color); // Center above glasses
    fillCircle(ctx, 10, 9, 2, color); // Left loop
    fillCircle(ctx, 22, 9, 2, color); // Right loop
  } else if (hat === 'beret') {
    fillEllipse(ctx, headX, 9, 9, 3, '#2f4f4f'); // Wide above glasses
    fillCircle(ctx, headX, 7, 1, '#2f4f4f');
  } else if (hat === 'wizard') {
    fillRect(ctx, 8, 9, 16, 1, '#4b0082'); // Wide brim above glasses
    for (let i = 0; i < 10; i++) {
      const width = 16 - i * 2;
      const x = 8 + i;
      fillRect(ctx, x, 9 - i, width, 1, '#4b0082');
    }
    drawPixel(ctx, 15, -1, '#ffd700');
    drawPixel(ctx, 18, 1, '#ffd700');
  }
}

function drawHatForParrot(ctx: CanvasRenderingContext2D, hat: string) {
  // Parrot: crest goes from y=1 to y=5 (fillRect(ctx, 15, 1, 2, 4, '#ffd700'))
  // Hat must cover crest from ABOVE, starting from y=0
  const headX = 16; // Center where crest is
  const hatTopY = 0; // Above crest (crest at y=1)
  
  if (hat === 'tophat') {
    // Brim above glasses (glasses at y=7, brim at y=5-6)
    fillRect(ctx, headX - 4, 5, 8, 1, '#1a1a1a'); // Brim above glasses
    fillRect(ctx, headX - 3, hatTopY, 6, 6, '#1a1a1a'); // Top (covers crest and above glasses)
    fillRect(ctx, headX - 3, 4, 6, 1, '#8b0000'); // Band
  } else if (hat === 'crown') {
    const gold = '#ffd700';
    fillRect(ctx, headX - 4, 5, 8, 2, gold); // Base above glasses
    fillRect(ctx, headX - 4, 3, 2, 2, gold); // Left point
    fillRect(ctx, headX + 2, 3, 2, 2, gold); // Right point
    fillCircle(ctx, headX - 3, 4, 1, '#ff0000');
    fillCircle(ctx, headX + 3, 4, 1, '#0000ff');
  } else if (hat === 'bow') {
    const color = '#ff69b4';
    fillRect(ctx, headX - 1, 4, 3, 3, color); // Center above glasses
    fillCircle(ctx, headX - 3, 5, 2, color); // Left loop
    fillCircle(ctx, headX + 2, 5, 2, color); // Right loop
  } else if (hat === 'beret') {
    fillEllipse(ctx, headX, 5, 6, 3, '#2f4f4f'); // Wide above glasses
    fillCircle(ctx, headX, 3, 1, '#2f4f4f');
  } else if (hat === 'wizard') {
    fillRect(ctx, headX - 5, 5, 10, 1, '#4b0082'); // Wide brim above glasses
    for (let i = 0; i < 6; i++) {
      const width = 9 - i;
      const x = headX - 4 + i;
      fillRect(ctx, x, 5 - i, width, 1, '#4b0082');
    }
    drawPixel(ctx, headX, -1, '#ffd700');
  }
}

// Standard hat drawing (for dog, cat, hamster)
// Hat drawing
function drawTopHat(ctx: CanvasRenderingContext2D, yOffset: number) {
  // Brim
  fillRect(ctx, 8, 5 + yOffset, 16, 2, '#1a1a1a');
  // Top
  fillRect(ctx, 10, 0 + yOffset, 12, 5, '#1a1a1a');
  // Band
  fillRect(ctx, 10, 3 + yOffset, 12, 2, '#8b0000');
}

function drawCrown(ctx: CanvasRenderingContext2D, yOffset: number) {
  const gold = '#ffd700';
  
  // Base
  fillRect(ctx, 9, 4 + yOffset, 14, 3, gold);
  
  // Points
  fillRect(ctx, 9, 1 + yOffset, 3, 3, gold);
  fillRect(ctx, 14, 0 + yOffset, 4, 4, gold);
  fillRect(ctx, 20, 1 + yOffset, 3, 3, gold);
  
  // Jewels
  fillCircle(ctx, 10, 3 + yOffset, 1, '#ff0000');
  fillCircle(ctx, 16, 2 + yOffset, 1, '#0000ff');
  fillCircle(ctx, 22, 3 + yOffset, 1, '#00ff00');
}

function drawBowHat(ctx: CanvasRenderingContext2D, yOffset: number) {
  const color = '#ff69b4';
  
  // Center
  fillRect(ctx, 13, 2 + yOffset, 6, 4, color);
  
  // Left loop
  fillCircle(ctx, 10, 4 + yOffset, 3, color);
  
  // Right loop
  fillCircle(ctx, 22, 4 + yOffset, 3, color);
}

function drawBeret(ctx: CanvasRenderingContext2D, yOffset: number) {
  // Main beret
  fillEllipse(ctx, 16, 4 + yOffset, 8, 4, '#2f4f4f');
  
  // Stem
  fillCircle(ctx, 16, 1 + yOffset, 1, '#2f4f4f');
}

function drawWizardHat(ctx: CanvasRenderingContext2D, yOffset: number) {
  // Brim
  fillRect(ctx, 6, 6 + yOffset, 20, 2, '#4b0082');
  
  // Cone
  for (let i = 0; i < 7; i++) {
    const width = 14 - i * 2;
    const x = 9 + i;
    fillRect(ctx, x, 6 - i + yOffset, width, 1, '#4b0082');
  }
  
  // Stars
  drawPixel(ctx, 12, 2 + yOffset, '#ffd700');
  drawPixel(ctx, 18, 4 + yOffset, '#ffd700');
  drawPixel(ctx, 10, 5 + yOffset, '#c0c0c0');
}

// Main drawing function
// Background colors
const BACKGROUND_COLORS: Record<string, { main: string; secondary: string }> = {
  'none': { main: '#faf9f7', secondary: '#f0efed' },
  'sky': { main: '#87CEEB', secondary: '#B0E0E6' },
  'sunset': { main: '#FFB366', secondary: '#FF8C42' },
  'forest': { main: '#90EE90', secondary: '#98FB98' },
  'ocean': { main: '#4FC3F7', secondary: '#29B6F6' },
  'night': { main: '#2C3E50', secondary: '#1A252F' },
  'pink': { main: '#FFB6C1', secondary: '#FFC0CB' },
  'lavender': { main: '#E6E6FA', secondary: '#D8BFD8' },
  'mint': { main: '#B2F2BB', secondary: '#8CE99A' },
  'peach': { main: '#FFDAB9', secondary: '#FFE4C4' },
};

export function drawPet(
  ctx: CanvasRenderingContext2D,
  appearance: PetAppearance
): void {
  // Clear canvas
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  
  // Get background colors
  const bg = BACKGROUND_COLORS[appearance.background] || BACKGROUND_COLORS['none'];
  
  // Draw gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_SIZE);
  gradient.addColorStop(0, bg.main);
  gradient.addColorStop(1, bg.secondary);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  
  // Draw subtle pattern (lighter for dark backgrounds)
  const isDark = appearance.background === 'night';
  ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)';
  for (let y = 0; y < GRID_SIZE; y += 2) {
    for (let x = 0; x < GRID_SIZE; x += 2) {
      if ((x + y) % 4 === 0) {
        ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      }
    }
  }
  
  // Draw extra background elements based on type
  if (appearance.background === 'sky') {
    // Draw clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    fillRect(ctx, 2, 3, 4, 2, 'rgba(255, 255, 255, 0.6)');
    fillRect(ctx, 3, 2, 2, 1, 'rgba(255, 255, 255, 0.6)');
    fillRect(ctx, 26, 5, 4, 2, 'rgba(255, 255, 255, 0.5)');
    fillRect(ctx, 27, 4, 2, 1, 'rgba(255, 255, 255, 0.5)');
  } else if (appearance.background === 'night') {
    // Draw stars
    ctx.fillStyle = '#FFFFFF';
    drawPixel(ctx, 4, 4, '#FFF');
    drawPixel(ctx, 28, 6, '#FFF');
    drawPixel(ctx, 8, 8, 'rgba(255,255,255,0.7)');
    drawPixel(ctx, 24, 3, 'rgba(255,255,255,0.8)');
    drawPixel(ctx, 6, 2, 'rgba(255,255,255,0.6)');
    drawPixel(ctx, 20, 5, '#FFF');
    // Moon
    fillCircle(ctx, 27, 4, 2, '#FFFACD');
  } else if (appearance.background === 'forest') {
    // Draw grass at bottom
    ctx.fillStyle = '#228B22';
    for (let x = 0; x < GRID_SIZE; x += 3) {
      fillRect(ctx, x, 29, 1, 3, '#228B22');
      fillRect(ctx, x + 1, 30, 1, 2, '#32CD32');
    }
  } else if (appearance.background === 'ocean') {
    // Draw waves at bottom
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let x = 0; x < GRID_SIZE; x += 4) {
      fillRect(ctx, x, 28, 2, 1, 'rgba(255, 255, 255, 0.3)');
      fillRect(ctx, x + 2, 29, 2, 1, 'rgba(255, 255, 255, 0.2)');
    }
  } else if (appearance.background === 'sunset') {
    // Draw sun
    fillCircle(ctx, 26, 6, 3, '#FFD700');
    fillCircle(ctx, 26, 6, 2, '#FFA500');
  }
  
  // Check if hat exists to hide ears/crest
  const hasHat = !!appearance.hat;
  
  // Draw pet based on type
  // Special handling for animals that need hasHat parameter
  if (appearance.type === 'rat') {
    drawRat(ctx, appearance.bodyColor, appearance.eyeColor, hasHat);
  } else if (appearance.type === 'rabbit') {
    drawRabbit(ctx, appearance.bodyColor, appearance.eyeColor, hasHat);
  } else if (appearance.type === 'parrot') {
    drawParrot(ctx, appearance.bodyColor, appearance.eyeColor, hasHat);
  } else if (appearance.type === 'dog') {
    drawDog(ctx, appearance.bodyColor, appearance.eyeColor);
  } else if (appearance.type === 'cat') {
    drawCat(ctx, appearance.bodyColor, appearance.eyeColor);
  } else if (appearance.type === 'hamster') {
    drawHamster(ctx, appearance.bodyColor, appearance.eyeColor);
  } else if (appearance.type === 'fish') {
    drawFish(ctx, appearance.bodyColor, appearance.eyeColor);
  } else if (appearance.type === 'turtle') {
    drawTurtle(ctx, appearance.bodyColor, appearance.eyeColor);
  }
  
  // Separate offsets for accessories, glasses, and hats based on pet type
  // Accessories (collars, bows, chains) go on the neck
  const accessoryOffsets: Record<PetType, number> = {
    dog: 0,      // neck around y=15
    cat: 0,      // neck around y=15
    hamster: 2,  // smaller, neck higher
    parrot: 4,   // neck between head (y=8) and body (y=18) → y≈12-13, offset from 15 → +4
    fish: -99,   // no neck, hide accessories (disabled)
    rabbit: 2,   // neck around y=16-17, offset from 15 → +2
    turtle: 1,   // neck around y=16, offset from 15 → +1
    rat: 2,      // neck around y=16-17, offset from 15 → +2
  };
  
  // Glasses go on the eyes
  const glassesOffsets: Record<PetType, number> = {
    dog: 0,      // eyes around y=9
    cat: 0,      // eyes around y=9
    hamster: 2,  // eyes around y=11, offset from 9 → +2
    parrot: -2,  // eyes around y=7, offset from 9 → -2
    fish: 6,     // eyes around y=15, offset from 9 → +6
    rabbit: 2,   // eyes around y=11, offset from 9 → +2
    turtle: 4,   // eyes around y=13, offset from 9 → +4
    rat: 4,      // eyes around y=13, offset from 9 → +4
  };
  
  // Hats go on the head
  const hatOffsets: Record<PetType, number> = {
    dog: 0,      // head top around y=0-2
    cat: 0,      // head top around y=0-2
    hamster: 3,  // smaller head, top around y=3
    parrot: -2,  // head top around y=0-1, but can't wear hat easily (crest), offset -2
    fish: -99,   // no head in traditional sense, hide hats
    rabbit: -3,  // ears go up to y=3, hat should be above, offset -3
    turtle: -99, // head is sideways, hide hats
    rat: 4,      // head top around y=9-10, offset from 0 → +4
  };
  
  const accessoryYOffset = accessoryOffsets[appearance.type] ?? 0;
  const glassesYOffset = glassesOffsets[appearance.type] ?? 0;
  const hatYOffset = hatOffsets[appearance.type] ?? 0;
  
  // Draw accessory with pet-specific positioning
  if (appearance.accessory) {
    // Use custom positioning for animals with different body shapes
    if (appearance.type === 'fish') {
      drawAccessoryForFish(ctx, appearance.accessory);
    } else if (appearance.type === 'turtle') {
      drawAccessoryForTurtle(ctx, appearance.accessory);
    } else if (appearance.type === 'rat') {
      drawAccessoryForRat(ctx, appearance.accessory);
    } else if (appearance.type === 'parrot') {
      drawAccessoryForParrot(ctx, appearance.accessory);
    } else if (appearance.type === 'rabbit') {
      drawAccessoryForRabbit(ctx, appearance.accessory);
    } else if (accessoryYOffset !== -99) {
      // Use standard positioning for dog, cat, hamster
      switch (appearance.accessory) {
        case 'collar-red':
          drawCollar(ctx, '#d32f2f', accessoryYOffset);
          break;
        case 'collar-blue':
          drawCollar(ctx, '#1976d2', accessoryYOffset);
          break;
        case 'bow-pink':
          drawBow(ctx, '#ff69b4', accessoryYOffset);
          break;
        case 'chain-gold':
          drawChain(ctx, accessoryYOffset);
          break;
        case 'bell':
          drawBellAccessory(ctx, accessoryYOffset);
          break;
      }
    }
  }
  
  // Draw glasses with pet-specific positioning
  if (appearance.glasses) {
    // Use custom positioning for animals with different eye positions
    if (appearance.type === 'fish') {
      drawGlassesForFish(ctx, appearance.glasses);
    } else if (appearance.type === 'turtle') {
      drawGlassesForTurtle(ctx, appearance.glasses);
    } else if (appearance.type === 'rat') {
      drawGlassesForRat(ctx, appearance.glasses);
    } else if (appearance.type === 'parrot') {
      drawGlassesForParrot(ctx, appearance.glasses);
    } else if (appearance.type === 'rabbit') {
      drawGlassesForRabbit(ctx, appearance.glasses);
    } else if (glassesYOffset !== -99) {
      // Use standard positioning for dog, cat, hamster
      switch (appearance.glasses) {
        case 'round':
          drawRoundGlasses(ctx, glassesYOffset);
          break;
        case 'square':
          drawSquareGlasses(ctx, glassesYOffset);
          break;
        case 'sunglasses':
          drawSunglasses(ctx, glassesYOffset);
          break;
        case 'heart':
          drawHeartGlasses(ctx, glassesYOffset);
          break;
      }
    }
  }
  
  // Draw hat with pet-specific positioning
  if (appearance.hat) {
    // Use custom positioning for animals with different head shapes
    if (appearance.type === 'fish') {
      drawHatForFish(ctx, appearance.hat);
    } else if (appearance.type === 'turtle') {
      drawHatForTurtle(ctx, appearance.hat);
    } else if (appearance.type === 'rat') {
      drawHatForRat(ctx, appearance.hat);
    } else if (appearance.type === 'rabbit') {
      drawHatForRabbit(ctx, appearance.hat);
    } else if (appearance.type === 'parrot') {
      drawHatForParrot(ctx, appearance.hat);
    } else if (hatYOffset !== -99) {
      // Use standard positioning for dog, cat, hamster
      switch (appearance.hat) {
        case 'tophat':
          drawTopHat(ctx, hatYOffset);
          break;
        case 'crown':
          drawCrown(ctx, hatYOffset);
          break;
        case 'bow':
          drawBowHat(ctx, hatYOffset);
          break;
        case 'beret':
          drawBeret(ctx, hatYOffset);
          break;
        case 'wizard':
          drawWizardHat(ctx, hatYOffset);
          break;
      }
    }
  }
}

// Icon size for temperament icons
export const ICON_SIZE = 48;

// Draw temperament icons - pixel art emojis
export function drawTemperamentIcon(
  ctx: CanvasRenderingContext2D,
  temperament: 'friendly' | 'shy' | 'aggressive' | 'calm'
): void {
  ctx.clearRect(0, 0, ICON_SIZE, ICON_SIZE);
  
  // Background
  ctx.fillStyle = '#faf9f7';
  ctx.fillRect(0, 0, ICON_SIZE, ICON_SIZE);
  
  const p = 3; // pixel size
  
  const drawPx = (x: number, y: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(x * p, y * p, p, p);
  };
  
  switch (temperament) {
    case 'friendly':
      // Yellow heart 💛
      const heart = '#ffd700';
      // Top bumps
      [3,4,5].forEach(x => drawPx(x, 4, heart));
      [9,10,11].forEach(x => drawPx(x, 4, heart));
      [2,3,4,5,6].forEach(x => drawPx(x, 5, heart));
      [8,9,10,11,12].forEach(x => drawPx(x, 5, heart));
      [2,3,4,5,6,7,8,9,10,11,12].forEach(x => drawPx(x, 6, heart));
      [2,3,4,5,6,7,8,9,10,11,12].forEach(x => drawPx(x, 7, heart));
      [3,4,5,6,7,8,9,10,11].forEach(x => drawPx(x, 8, heart));
      [4,5,6,7,8,9,10].forEach(x => drawPx(x, 9, heart));
      [5,6,7,8,9].forEach(x => drawPx(x, 10, heart));
      [6,7,8].forEach(x => drawPx(x, 11, heart));
      [7].forEach(x => drawPx(x, 12, heart));
      // Highlight
      drawPx(4, 5, '#fff8dc');
      drawPx(4, 6, '#fff8dc');
      break;
      
    case 'shy':
      // Shy face 🥺
      const shyFace = '#ffcc4d';
      const shyDark = '#e8a33c';
      // Face circle
      for (let y = 3; y <= 12; y++) {
        for (let x = 3; x <= 12; x++) {
          const dx = x - 7.5;
          const dy = y - 7.5;
          if (dx*dx + dy*dy <= 25) {
            drawPx(x, y, shyFace);
          }
        }
      }
      // Big sparkly eyes
      drawPx(5, 6, '#fff');
      drawPx(6, 6, '#fff');
      drawPx(5, 7, '#fff');
      drawPx(6, 7, '#664');
      drawPx(10, 6, '#fff');
      drawPx(9, 6, '#fff');
      drawPx(10, 7, '#fff');
      drawPx(9, 7, '#664');
      // Eyebrows (worried)
      drawPx(4, 5, '#664');
      drawPx(5, 4, '#664');
      drawPx(11, 5, '#664');
      drawPx(10, 4, '#664');
      // Small wobbly mouth
      drawPx(6, 10, shyDark);
      drawPx(7, 11, shyDark);
      drawPx(8, 11, shyDark);
      drawPx(9, 10, shyDark);
      // Blush
      drawPx(4, 8, '#ffb6c1');
      drawPx(4, 9, '#ffb6c1');
      drawPx(11, 8, '#ffb6c1');
      drawPx(11, 9, '#ffb6c1');
      break;
      
    case 'aggressive':
      // Angry cat face 😾
      const catFace = '#ffcc4d';
      const catDark = '#c77800';
      // Face circle
      for (let y = 4; y <= 13; y++) {
        for (let x = 3; x <= 12; x++) {
          const dx = x - 7.5;
          const dy = y - 8.5;
          if (dx*dx + dy*dy <= 25) {
            drawPx(x, y, catFace);
          }
        }
      }
      // Cat ears
      drawPx(3, 3, catFace);
      drawPx(4, 2, catFace);
      drawPx(4, 3, catFace);
      drawPx(5, 3, catFace);
      drawPx(12, 3, catFace);
      drawPx(11, 2, catFace);
      drawPx(11, 3, catFace);
      drawPx(10, 3, catFace);
      // Inner ear
      drawPx(4, 3, '#ffb6c1');
      drawPx(11, 3, '#ffb6c1');
      // Angry eyes
      drawPx(5, 7, '#664');
      drawPx(6, 7, '#664');
      drawPx(9, 7, '#664');
      drawPx(10, 7, '#664');
      // Angry eyebrows
      drawPx(4, 5, '#664');
      drawPx(5, 6, '#664');
      drawPx(11, 5, '#664');
      drawPx(10, 6, '#664');
      // Nose
      drawPx(7, 9, '#ff9999');
      drawPx(8, 9, '#ff9999');
      // Angry mouth
      drawPx(5, 11, catDark);
      drawPx(6, 10, catDark);
      drawPx(7, 10, catDark);
      drawPx(8, 10, catDark);
      drawPx(9, 10, catDark);
      drawPx(10, 11, catDark);
      break;
      
    case 'calm':
      // Calm relieved face 😌
      const calmFace = '#ffcc4d';
      const calmDark = '#e8a33c';
      // Face circle
      for (let y = 3; y <= 12; y++) {
        for (let x = 3; x <= 12; x++) {
          const dx = x - 7.5;
          const dy = y - 7.5;
          if (dx*dx + dy*dy <= 25) {
            drawPx(x, y, calmFace);
          }
        }
      }
      // Closed happy eyes (curved down)
      drawPx(4, 6, '#664');
      drawPx(5, 7, '#664');
      drawPx(6, 7, '#664');
      drawPx(7, 6, '#664');
      drawPx(8, 6, '#664');
      drawPx(9, 7, '#664');
      drawPx(10, 7, '#664');
      drawPx(11, 6, '#664');
      // Gentle smile
      drawPx(5, 10, calmDark);
      drawPx(6, 11, calmDark);
      drawPx(7, 11, calmDark);
      drawPx(8, 11, calmDark);
      drawPx(9, 11, calmDark);
      drawPx(10, 10, calmDark);
      // Blush
      drawPx(4, 8, '#ffb6c1');
      drawPx(11, 8, '#ffb6c1');
      break;
  }
}

// Export canvas as data URL
export function canvasToDataURL(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/png');
}

// Export canvas as Blob
export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to create blob'));
      }
    }, 'image/png');
  });
}

import './PumpFunLogo.css';

interface PumpFunLogoProps {
  size?: number;
  className?: string;
}

export default function PumpFunLogo({ size = 20, className = '' }: PumpFunLogoProps) {
  return (
    <img 
      src="https://pump.fun/favicon.ico"
      alt="Pump.fun"
      className={`pumpfun-logo ${className}`}
      style={{ width: size, height: size }}
      onError={(e) => {
        // Fallback to inline SVG if image fails to load
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', size.toString());
        svg.setAttribute('height', size.toString());
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.className.baseVal = `pumpfun-logo ${className}`;
        
        // Create capsule shape (white and green)
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M50,20 C70,20 80,30 80,50 L80,50 C80,70 70,80 50,80 C30,80 20,70 20,50 L20,50 C20,30 30,20 50,20 Z');
        path.setAttribute('fill', '#00ff88');
        svg.appendChild(path);
        
        const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path2.setAttribute('d', 'M50,20 C70,20 80,30 80,50 L80,50 C80,40 75,35 70,32 C65,35 60,40 60,50 L60,50 C60,40 55,35 50,32 C45,35 40,40 40,50 L40,50 C40,30 30,20 50,20 Z');
        path2.setAttribute('fill', '#ffffff');
        svg.appendChild(path2);
        
        target.parentNode?.appendChild(svg);
      }}
    />
  );
}


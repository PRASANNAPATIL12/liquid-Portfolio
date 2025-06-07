
'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Desktop Configuration: Persistent, soft, glowing globules
const desktopConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 512,
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 0.998,    // Very slow dissipation for persistence
  VELOCITY_DISSIPATION: 0.999,  // Very slow dissipation for persistence
  PRESSURE: 0.7,                // Softer pressure
  PRESSURE_ITERATIONS: 20,
  CURL: 30,                     // Increased for more inherent swirls
  SPLAT_RADIUS: 0.5,            // Larger radius for blob-like splats
  SPLAT_FORCE: 4000,            // Moderate force for softer interaction
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BLOOM: true,
  BLOOM_ITERATIONS: 10,          // More iterations for softer bloom
  BLOOM_RESOLUTION: 256,
  BLOOM_INTENSITY: 0.9,         // Increased intensity for glow
  BLOOM_THRESHOLD: 0.5,         // Lower threshold for more bloom
  BLOOM_SOFT_KNEE: 0.7,
  SUNRAYS: true,
  SUNRAYS_RESOLUTION: 196,
  SUNRAYS_WEIGHT: 0.7,          // Slightly reduced sunrays for subtlety with bloom
};

// Mobile will use a simple CSS trail, WebGL is too heavy for continuous globules
// This config is not used if isMobile is true and we render CSS trail

interface FluidCanvasElement extends HTMLCanvasElement {
  pointer?: {
    down: (x: number, y: number) => void;
    move: (x: number, y: number) => void;
    up: (x: number, y: number) => void;
  };
}

const FluidCursor: FC = () => {
  const canvasRef = useRef<FluidCanvasElement>(null);
  const isMobile = useIsMobile();
  const [simulationReady, setSimulationReady] = useState(false);

  // For CSS trail on mobile
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const trailDotsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (isMobile === undefined) return;

    if (isMobile) {
      document.body.style.cursor = 'none';
      const handleMouseMove = (event: MouseEvent) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.body.style.cursor = 'auto';
        trailDotsRef.current.forEach(dot => dot?.remove());
      };
    }

    // Desktop WebGL Fluid Sim
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    document.body.style.cursor = 'none';
    let fluidInstance: any = null;

    import('webgl-fluid')
      .then(module => {
        fluidInstance = module.default;
        if (currentCanvas && fluidInstance) {
          // @ts-ignore webGLFluid expects a config object
          fluidInstance(currentCanvas, desktopConfig);
          setSimulationReady(true);
        }
      })
      .catch(error => {
        console.error("Failed to load webgl-fluid:", error);
        document.body.style.cursor = 'auto';
      });

    return () => {
      document.body.style.cursor = 'auto';
      setSimulationReady(false);
    };
  }, [isMobile]);


  useEffect(() => {
    if (isMobile || !simulationReady || !canvasRef.current || !canvasRef.current.pointer) return;

    const currentCanvas = canvasRef.current;
    const { clientWidth: width, clientHeight: height } = currentCanvas;

    // Initial "Blast"
    const numInitialSplats = 5; // More splats for initial fill
    for (let i = 0; i < numInitialSplats; i++) {
      setTimeout(() => {
        if (currentCanvas.pointer) {
          const randomX = width * (0.3 + Math.random() * 0.4);
          const randomY = height * (0.3 + Math.random() * 0.4);
          currentCanvas.pointer.move(randomX, randomY);
          currentCanvas.pointer.down(randomX, randomY);
          setTimeout(() => currentCanvas.pointer?.up(randomX, randomY), 50 + Math.random() * 50);
        }
      }, i * 80); // Stagger initial splats
    }
    
    const randomBlastInterval = 1200; // More frequent random blasts
    const intervalId = setInterval(() => {
      if (currentCanvas.pointer) {
        const randomX = Math.random() * width;
        const randomY = Math.random() * height;
        
        currentCanvas.pointer.move(randomX, randomY);
        currentCanvas.pointer.down(randomX, randomY);
        
        setTimeout(() => currentCanvas.pointer?.up(randomX, randomY), 50 + Math.random() * 100);
      }
    }, randomBlastInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [simulationReady, isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    const updateTrail = () => {
      trailDotsRef.current.forEach((dot, index, arr) => {
        if (!dot) return;
        const nextDot = arr[index + 1];
        if (nextDot && nextDot.style.left && nextDot.style.top) {
          dot.style.left = nextDot.style.left;
          dot.style.top = nextDot.style.top;
        } else if (index === 0) {
          dot.style.left = `${mousePosition.x}px`;
          dot.style.top = `${mousePosition.y}px`;
        }
        dot.style.transform = `scale(${1 - index / 10})`;
        dot.style.opacity = `${1 - index / 10}`;
      });
      requestAnimationFrame(updateTrail);
    };

    if (isMobile) {
      for (let i = 0; i < 5; i++) { // Number of trail dots
        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        dot.style.width = '15px'; // CSS trail dot size
        dot.style.height = '15px';
        dot.style.backgroundColor = `hsl(${200 + i * 30}, 100%, 70%)`; // Neon-ish colors
        dot.style.borderRadius = '50%';
        dot.style.pointerEvents = 'none';
        dot.style.left = `${mousePosition.x}px`;
        dot.style.top = `${mousePosition.y}px`;
        dot.style.zIndex = '9998'; // Below main cursor if it was visible
        dot.style.transition = 'transform 0.05s linear, opacity 0.05s linear'; // Smooth transition
        document.body.appendChild(dot);
        trailDotsRef.current[i] = dot;
      }
      requestAnimationFrame(updateTrail);
    }
    
    return () => {
      trailDotsRef.current.forEach(dot => dot?.remove());
      trailDotsRef.current = [];
    };
  }, [isMobile, mousePosition.x, mousePosition.y]);


  if (isMobile === undefined) {
    return null;
  }

  if (isMobile) {
    // Render nothing for CSS trail, it's appended to body
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      id="webgl-fluid-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0, // Behind UI components
      }}
    />
  );
};

export default FluidCursor;
    
    
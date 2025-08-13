
'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAnimation } from '@/context/AnimationContext';

// Desktop Configuration: Globule-like, persistent, soft, glowing, drifting
const desktopConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 512,
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 0.995, // Made slightly less extreme for better definition
  VELOCITY_DISSIPATION: 0.998, // High for drifting
  PRESSURE: 0.7, 
  PRESSURE_ITERATIONS: 20,
  CURL: 25, // Slightly reduced for softer curls
  SPLAT_RADIUS: 0.5, // Base radius for mouse interaction
  SPLAT_FORCE: 5000, 
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BLOOM: true,
  BLOOM_ITERATIONS: 8, 
  BLOOM_RESOLUTION: 256,
  BLOOM_INTENSITY: 0.8, 
  BLOOM_THRESHOLD: 0.6, 
  BLOOM_SOFT_KNEE: 0.7,
  SUNRAYS: true, 
  SUNRAYS_RESOLUTION: 196,
  SUNRAYS_WEIGHT: 0.5, 
  RANDOM_BLAST_INTERVAL: 2000, // More frequent random activity
};

// Mobile Configuration: Optimized for touch visibility and performance
const mobileConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 64, // Lowered for performance
  DYE_RESOLUTION: 256, // Balanced for visibility and performance
  CAPTURE_RESOLUTION: 256, 
  DENSITY_DISSIPATION: 0.90, // Lower for longer lasting splats from touch
  VELOCITY_DISSIPATION: 0.92, // Lower for longer lasting movement from touch
  PRESSURE: 0.8,            
  PRESSURE_ITERATIONS: 5, // Reduced
  CURL: 10, // Reduced curl
  SPLAT_RADIUS: 0.8, // Increased for better touch visibility
  SPLAT_FORCE: 7000, // Increased for more impact from touch
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BLOOM: false, // Disabled for performance      
  BLOOM_ITERATIONS: 0,
  BLOOM_RESOLUTION: 0,
  BLOOM_INTENSITY: 0,
  BLOOM_THRESHOLD: 0,
  BLOOM_SOFT_KNEE: 0,
  SUNRAYS: false, // Disabled for performance    
  SUNRAYS_RESOLUTION: 0,
  SUNRAYS_WEIGHT: 0,
  RANDOM_BLAST_INTERVAL: 1500, // More frequent on mobile too
};


interface FluidCanvasElement extends HTMLCanvasElement {
  fluid?: {
    simulationPaused: boolean;
  };
  pointer?: {
    down: (x: number, y: number) => void;
    move: (x: number, y: number) => void;
    up: () => void; 
  };
}

const FluidCursor: FC = () => {
  const canvasRef = useRef<FluidCanvasElement>(null);
  const isMobile = useIsMobile();
  const [simulationReady, setSimulationReady] = useState(false);
  const { setAnimationReady } = useAnimation();

  useEffect(() => {
    if (isMobile === undefined) return;

    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    document.body.style.cursor = isMobile ? 'auto' : 'none';

    let fluidInstanceModule: any = null;
    let animationFrameId: number | null = null;

    const selectedConfig = isMobile ? mobileConfig : desktopConfig;

    import('webgl-fluid')
      .then(module => {
        fluidInstanceModule = module.default;
        if (canvasRef.current === canvasElement && fluidInstanceModule) { 
          fluidInstanceModule(canvasElement, selectedConfig);
          
          animationFrameId = requestAnimationFrame(() => {
            animationFrameId = requestAnimationFrame(() => {
              if (canvasRef.current === canvasElement) {
                setTimeout(() => {
                    if (canvasRef.current === canvasElement) {
                        setSimulationReady(true);
                        setAnimationReady(true); // Signal that animation can start
                    }
                }, 50); 
              }
            });
          });
        }
      })
      .catch(error => {
        console.error("Failed to load webgl-fluid:", error);
        setAnimationReady(true); // Still allow other animations to run on failure
        if (isMobile) document.body.style.cursor = 'auto';
      });

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      document.body.style.cursor = 'auto';
      setSimulationReady(false);
      setAnimationReady(false);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);


  useEffect(() => {
    if (!simulationReady || !canvasRef.current) return;

    const currentCanvas = canvasRef.current;
    
    if (currentCanvas.clientWidth === 0 || currentCanvas.clientHeight === 0) {
        console.warn("FluidCursor: Canvas dimensions are zero, skipping initial/random blasts for now.");
        return;
    }

    const { clientWidth: width, clientHeight: height } = currentCanvas;

    const numInitialSplats = isMobile ? 1 : 2; 
    for (let i = 0; i < numInitialSplats; i++) {
      setTimeout(() => {
        if (currentCanvas.pointer && 
            typeof currentCanvas.pointer.move === 'function' &&
            typeof currentCanvas.pointer.down === 'function' &&
            typeof currentCanvas.pointer.up === 'function') {
          const randomX = width * (0.2 + Math.random() * 0.6);
          const randomY = height * (0.2 + Math.random() * 0.6);
          currentCanvas.pointer.move(randomX, randomY);
          currentCanvas.pointer.down(randomX, randomY);
          setTimeout(() => {
             if (currentCanvas.pointer && typeof currentCanvas.pointer.up === 'function') {
                currentCanvas.pointer.up();
             }
          }, 100 + Math.random() * 150);
        }
      }, i * 150 + (isMobile ? 200 : 100));
    }

    const blastIntervalConfig = isMobile ? mobileConfig.RANDOM_BLAST_INTERVAL : desktopConfig.RANDOM_BLAST_INTERVAL;

    const intervalId = setInterval(() => {
      if (canvasRef.current?.pointer && 
          typeof canvasRef.current.pointer.move === 'function' &&
          typeof canvasRef.current.pointer.down === 'function' &&
          typeof canvasRef.current.pointer.up === 'function' && 
          document.hasFocus()) { 
        const { clientWidth: currentWidth, clientHeight: currentHeight } = canvasRef.current;
        if (currentWidth === 0 || currentHeight === 0) return; 

        const randomX = Math.random() * currentWidth;
        const randomY = Math.random() * currentHeight;

        canvasRef.current.pointer.move(randomX, randomY);
        canvasRef.current.pointer.down(randomX, randomY);

        setTimeout(() => {
          if (canvasRef.current?.pointer && typeof canvasRef.current.pointer.up === 'function') {
            canvasRef.current.pointer.up();
          }
        }, 70 + Math.random() * 80);
      }
    }, blastIntervalConfig);

    return () => {
      clearInterval(intervalId);
    };
  }, [simulationReady, isMobile]); 

  useEffect(() => {
    if (!isMobile || !simulationReady || !canvasRef.current) {
      return;
    }
    
    const currentCanvas = canvasRef.current;

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0 && 
          currentCanvas?.pointer &&
          typeof currentCanvas.pointer.move === 'function' &&
          typeof currentCanvas.pointer.down === 'function') {
        const touch = event.touches[0];
        currentCanvas.pointer.move(touch.clientX, touch.clientY);
        currentCanvas.pointer.down(touch.clientX, touch.clientY);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0 &&
          currentCanvas?.pointer &&
          typeof currentCanvas.pointer.move === 'function') {
        const touch = event.touches[0];
        const touchX = touch.clientX;
        const touchY = touch.clientY;
        currentCanvas.pointer.move(touchX, touchY);
      }
    };

    const handleTouchEnd = () => {
      if (currentCanvas?.pointer &&
          typeof currentCanvas.pointer.up === 'function') {
        currentCanvas.pointer.up();
      }
    };

    document.documentElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.documentElement.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.documentElement.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.documentElement.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      document.documentElement.removeEventListener('touchstart', handleTouchStart);
      document.documentElement.removeEventListener('touchmove', handleTouchMove);
      document.documentElement.removeEventListener('touchend', handleTouchEnd);
      document.documentElement.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isMobile, simulationReady]); 

  if (isMobile === undefined) {
    return null; 
  }

  return (
    <canvas
      key={isMobile ? 'mobile-fluid-canvas' : 'desktop-fluid-canvas'} 
      ref={canvasRef}
      id="webgl-fluid-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0, 
        pointerEvents: isMobile ? 'none' : 'auto',
      }}
    />
  );
};

export default FluidCursor;

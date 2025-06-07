
'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Desktop Configuration: Richer, more persistent, and includes random blasts
const desktopConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 512,
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 0.99,     // Slower dissipation for longer-lasting effect
  VELOCITY_DISSIPATION: 0.995,   // Slower dissipation for longer-lasting motion
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 20,
  CURL: 25,                       // Increased for more inherent swirls and continuous evolution
  SPLAT_RADIUS: 0.35,             // Adjusted for a good "press" feel
  SPLAT_FORCE: 6000,
  COLORFUL: true,                 // Enable dynamic colors
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BLOOM: true,
  BLOOM_ITERATIONS: 8,
  BLOOM_RESOLUTION: 256,
  BLOOM_INTENSITY: 0.7,
  BLOOM_THRESHOLD: 0.5,
  BLOOM_SOFT_KNEE: 0.7,
  SUNRAYS: true,
  SUNRAYS_RESOLUTION: 196,
  SUNRAYS_WEIGHT: 0.8,
};

// Mobile Configuration: Significantly lighter to prioritize performance
const mobileConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 64,           // Lower simulation resolution
  DYE_RESOLUTION: 256,          // Lower dye resolution
  CAPTURE_RESOLUTION: 256,
  DENSITY_DISSIPATION: 0.98,    // Faster dissipation
  VELOCITY_DISSIPATION: 0.985,   // Faster velocity dissipation
  PRESSURE: 0.7,
  PRESSURE_ITERATIONS: 10,      // Fewer pressure iterations
  CURL: 15,
  SPLAT_RADIUS: 0.5,            // Slightly larger splats for touch visibility
  SPLAT_FORCE: 4000,
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 15,
  PAUSED: false,
  BLOOM: false,                  // Bloom disabled for performance
  BLOOM_ITERATIONS: 4,
  BLOOM_RESOLUTION: 128,
  BLOOM_INTENSITY: 0.5,
  BLOOM_THRESHOLD: 0.7,
  BLOOM_SOFT_KNEE: 0.7,
  SUNRAYS: false,                // Sunrays disabled for performance
  SUNRAYS_RESOLUTION: 128,
  SUNRAYS_WEIGHT: 0.5,
};

// Extend canvas type to include the pointer property webgl-fluid adds
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

  useEffect(() => {
    if (isMobile === undefined) return; // Wait for isMobile to be determined

    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    document.body.style.cursor = 'none';
    let fluidInstance: any = null; // To store the module if needed, though not directly used here for splats

    import('webgl-fluid')
      .then(module => {
        fluidInstance = module.default;
        if (currentCanvas && fluidInstance) {
          const config = isMobile ? mobileConfig : desktopConfig;
          // @ts-ignore webGLFluid expects a config object
          fluidInstance(currentCanvas, config);
          setSimulationReady(true);
        }
      })
      .catch(error => {
        console.error("Failed to load webgl-fluid:", error);
        document.body.style.cursor = 'auto'; // Restore cursor if lib fails
      });

    return () => {
      document.body.style.cursor = 'auto';
      setSimulationReady(false);
      // Cleanup: If the library provided a dispose method, it would be called here.
      // Since it doesn't, removing the canvas or navigating away should suffice.
    };
  }, [isMobile]);


  useEffect(() => {
    if (!simulationReady || !canvasRef.current || !canvasRef.current.pointer) return;

    const currentCanvas = canvasRef.current;
    const { clientWidth: width, clientHeight: height } = currentCanvas;

    // Initial "Blast"
    const numInitialSplats = isMobile ? 2 : 4;
    for (let i = 0; i < numInitialSplats; i++) {
      setTimeout(() => {
        if (currentCanvas.pointer) {
          const randomX = width * (0.4 + Math.random() * 0.2);
          const randomY = height * (0.4 + Math.random() * 0.2);
          currentCanvas.pointer.move(randomX, randomY);
          currentCanvas.pointer.down(randomX, randomY);
           // Optionally call up after a short delay if splats are too sticky
          setTimeout(() => currentCanvas.pointer?.up(randomX, randomY), 50);
        }
      }, i * 100); // Stagger initial splats slightly
    }
    
    // Random Blasts Interval
    const randomBlastInterval = isMobile ? 5000 : 3000; // Less frequent on mobile
    const intervalId = setInterval(() => {
      if (currentCanvas.pointer) {
        const randomX = Math.random() * width;
        const randomY = Math.random() * height;
        
        currentCanvas.pointer.move(randomX, randomY);
        currentCanvas.pointer.down(randomX, randomY);
        
        // Optional: call up after a short delay if splats are too sticky
        // or if you want to simulate quick "taps"
        setTimeout(() => currentCanvas.pointer?.up(randomX, randomY), 50 + Math.random() * 50);
      }
    }, randomBlastInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [simulationReady, isMobile]);


  if (isMobile === undefined) {
    return null; // Don't render anything until we know if it's mobile or desktop
  }

  return (
    <canvas
      ref={canvasRef}
      id="webgl-fluid-canvas" // Added ID for potential specific styling/selection
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', // Let clicks pass through to elements behind
        zIndex: 0, // Behind UI elements but visible
      }}
    />
  );
};

export default FluidCursor;

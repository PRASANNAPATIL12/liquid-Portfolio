'use client';

import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';

const CustomCursor: FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hue, setHue] = useState(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const currentCursorRef = cursorRef.current;

    if (currentCursorRef) {
      currentCursorRef.style.position = 'fixed';
      currentCursorRef.style.pointerEvents = 'none';
      currentCursorRef.style.zIndex = '9999';
      currentCursorRef.style.width = '48px'; // Adjusted size
      currentCursorRef.style.height = '48px';
      currentCursorRef.style.borderRadius = '50%';
      currentCursorRef.style.transform = 'translate(-50%, -50%)';
      // Smoother movement transition
      currentCursorRef.style.transition = 'transform 0.075s cubic-bezier(0.25, 1, 0.5, 1)';
    }
    
    const handleMouseMove = (event: MouseEvent) => {
      if (currentCursorRef) {
        currentCursorRef.style.left = `${event.clientX}px`;
        currentCursorRef.style.top = `${event.clientY}px`;
        setHue((prevHue) => (prevHue + 0.2) % 360); // Slower, more gradual hue shift
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(() => handleMouseMove(event));
    };
    
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      // Soft, translucent radial gradient for the "pressing" effect
      // Hue cycles for dynamic color, saturation and lightness kept pleasant, alpha for translucency
      cursorRef.current.style.background = `radial-gradient(circle, hsla(${hue}, 80%, 70%, 0.20) 0%, hsla(${hue}, 80%, 70%, 0) 70%)`;
    }
  }, [hue]);

  return <div ref={cursorRef} />;
};

export default CustomCursor;

'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { cn } from '@/lib/utils';

interface TextAnimationProps {
  text: string;
  className?: string;
}

const TextAnimation: React.FC<TextAnimationProps> = ({ text, className }) => {
  const textWrapperRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const textWrapper = textWrapperRef.current;
    if (textWrapper) {
      // Ensure the element is empty before adding new spans
      textWrapper.innerHTML = '';
      
      // Wrap each letter in a span
      text.split('').forEach(letter => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.className = 'letter';
        if (letter.trim() === '') {
          // Add a non-breaking space for whitespace to maintain layout
          span.innerHTML = '&nbsp;'; 
        }
        span.style.display = 'inline-block';
        span.style.opacity = '0'; // Start with opacity 0
        textWrapper.appendChild(span);
      });

      // Animation timeline
      anime.timeline({ loop: false })
        .add({
          targets: textWrapper.querySelectorAll('.letter'),
          opacity: [0, 1],
          translateY: ['1.1em', 0],
          translateX: ['0.5em', 0],
          scale: [0.2, 1],
          duration: 1500,
          delay: anime.stagger(100),
          easing: 'easeOutExpo',
        });
    }
  }, [text]);

  return (
    <h1 ref={textWrapperRef} className={cn("font-headline text-gradient text-4xl sm:text-5xl md:text-6xl font-bold mb-4", className)}>
      {/* Text is populated by useEffect */}
    </h1>
  );
};

export default TextAnimation;

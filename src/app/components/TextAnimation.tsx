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
      // Wrap each letter in a span
      textWrapper.innerHTML = text.replace(/\S/g, "<span class='letter'>$&</span>");

      // Animation timeline
      anime.timeline({ loop: false }) // Set loop to false for a one-time animation
        .add({
          targets: textWrapper.querySelectorAll('.letter'),
          opacity: [0, 1],
          easing: "easeInOutQuad",
          duration: 2250, // Slower duration for a more premium feel
          delay: anime.stagger(150), // Stagger the delay for each letter
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

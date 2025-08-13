'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { cn } from '@/lib/utils';

interface TextAnimationProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const TextAnimation: React.FC<TextAnimationProps> = ({ text, className, style }) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const textWrapper = textRef.current;
    if (!textWrapper) return;

    textWrapper.innerHTML = text.replace(
      /\S/g,
      "<span class='letter' style='display:inline-block;'>$&</span>"
    );

    const timeline = anime.timeline({
      loop: false,
      autoplay: true,
    });

    timeline.add({
      targets: textWrapper.querySelectorAll('.letter'),
      opacity: [0, 1],
      translateY: [40, 0],
      translateZ: 0,
      scaleX: [0.3, 1],
      easing: 'easeOutExpo',
      duration: 800,
      delay: anime.stagger(40, { start: 500 }),
    });

    return () => {
      timeline.pause();
    };
  }, [text]);

  return <h1 ref={textRef} className={cn(className)} style={style}></h1>;
};

export default TextAnimation;

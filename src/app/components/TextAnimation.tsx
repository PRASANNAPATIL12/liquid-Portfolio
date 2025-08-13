'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TextAnimationProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const TextAnimation: React.FC<TextAnimationProps> = ({ text, className, style }) => {
  return (
    <h1 className={cn('animated-text-container', className)} style={style}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="animated-letter"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
};

export default TextAnimation;

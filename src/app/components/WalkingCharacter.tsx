'use client';

import type { FC } from 'react';
import './WalkingCharacter.css';

const WalkingCharacter: FC = () => {
  return (
    <div className="character-path">
      <div className="character">
        <svg
          width="40"
          height="60"
          viewBox="0 0 40 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="20" y1="10" x2="20" y2="40" stroke="hsl(var(--primary))" strokeWidth="2" />
          <circle cx="20" cy="10" r="5" fill="hsl(var(--primary))" />
          <line className="leg left" x1="20" y1="40" x2="10" y2="55" stroke="hsl(var(--primary))" strokeWidth="2" />
          <line className="leg right" x1="20" y1="40" x2="30" y2="55" stroke="hsl(var(--primary))" strokeWidth="2" />
          <line x1="20" y1="25" x2="5" y2="35" stroke="hsl(var(--primary))" strokeWidth="2" />
          <line x1="20" y1="25" x2="35" y2="35" stroke="hsl(var(--primary))" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

export default WalkingCharacter;

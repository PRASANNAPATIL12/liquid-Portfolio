'use client';

import type { FC } from 'react';
import './WalkingCharacter.css';

const WalkingCharacter: FC = () => {
  return (
    <>
      <div className="walking-character-container">
        <div className="character-path">
          <div className="character">
            {/* A lanky, cool character inspired by Pink Panther */}
            <svg
              width="50"
              height="70"
              viewBox="0 0 50 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g className="arms">
                  {/* Back Arm */}
                  <line className="arm1" x1="25" y1="35" x2="10" y2="48" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round"/>
                  {/* Front Arm */}
                  <line className="arm2" x1="25" y1="35" x2="40" y2="48" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round"/>
              </g>
              <g className="legs">
                {/* Back Leg */}
                <path className="leg1" d="M25 50 Q 20 60 15 70" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" fill="none" />
                {/* Front Leg */}
                <path className="leg2" d="M25 50 Q 30 60 35 70" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" fill="none" />
              </g>
              {/* Body */}
              <line x1="25" y1="22" x2="25" y2="50" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
              {/* Head */}
              <circle cx="25" cy="15" r="8" fill="hsl(var(--primary))" />
              <path d="M 33 15 Q 36 12 38 10" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
      </div>
      <div className="footer-line"></div>
    </>
  );
};

export default WalkingCharacter;

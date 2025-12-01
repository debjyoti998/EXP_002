import React from 'react';
import { Theme } from '../types';

interface BohrAtomProps {
  atomicNumber: number;
  theme: Theme;
}

const BohrAtom: React.FC<BohrAtomProps> = ({ atomicNumber, theme }) => {
  const shells = [];
  let electronsLeft = atomicNumber;
  let shellIndex = 0;
  
  // Logic: Calculate electron shells (2, 8, 18, 32...)
  const capacity = (n: number) => 2 * (n * n);
  
  while (electronsLeft > 0) {
    const cap = capacity(shellIndex + 1);
    const inShell = Math.min(electronsLeft, cap);
    shells.push(inShell);
    electronsLeft -= inShell;
    shellIndex++;
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
      {/* Nucleus */}
      <div className={`w-6 h-6 rounded-full shadow-[0_0_20px_currentColor] z-10 animate-pulse ${theme.atomNucleus}`} />
      
      {/* Shells */}
      {shells.map((count, i) => {
        const radius = 40 + (i * 25);
        const duration = 3 + i; // Outer shells spin slower
        return (
          <div 
            key={i}
            className={`absolute rounded-full border ${theme.atomShell}`}
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
              animation: `spin-3d ${duration}s linear infinite`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Electrons */}
            {Array.from({ length: count }).map((_, j) => {
              const angle = (360 / count) * j;
              return (
                <div
                  key={j}
                  className={`absolute w-2 h-2 rounded-full shadow-[0_0_5px_currentColor] ${theme.atomElectron}`}
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                    marginTop: '-4px',
                    marginLeft: '-4px',
                  }}
                />
              );
            })}
          </div>
        );
      })}
      
      {/* CSS Keyframes for the rotation */}
      <style>{`
        @keyframes spin-3d {
          0% { transform: rotateX(70deg) rotateZ(0deg); }
          100% { transform: rotateX(70deg) rotateZ(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BohrAtom;
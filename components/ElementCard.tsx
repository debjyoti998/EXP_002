import React from 'react';
import { ElementData, Theme } from '../types';
import { CATEGORIES } from '../constants';

interface ElementCardProps {
  element: ElementData;
  onClick: (element: ElementData) => void;
  isDimmed: boolean;
  theme: Theme;
}

const ElementCard: React.FC<ElementCardProps> = ({ element, onClick, isDimmed, theme }) => {
  const [num, sym, name, , catId, col, row] = element;
  const style = CATEGORIES[catId];
  const textColor = theme.id === 'light' ? style.textLight : style.text;
  
  return (
    <div
      onClick={() => onClick(element)}
      className={`
        relative group cursor-pointer transition-all duration-500 ease-out
        flex flex-col justify-center items-center
        h-14 sm:h-20 md:h-24 rounded-sm
        backdrop-blur-sm
        hover:z-50 hover:scale-150 hover:shadow-2xl
        border ${theme.cardBorder} ${theme.cardHoverBorder}
        ${theme.cardBg}
        ${textColor}
        ${isDimmed ? 'opacity-10 grayscale blur-[1px]' : 'opacity-100'}
      `}
      style={{
        gridColumn: col,
        gridRow: row,
        backgroundColor: isDimmed ? 'transparent' : undefined
      }}
      role="button"
      aria-label={`${name}, atomic number ${num}`}
    >
      <span className="text-[0.6rem] font-medium absolute top-1 left-1.5 opacity-60">{num}</span>
      <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter drop-shadow-md">{sym}</span>
      <span className="text-[0.5rem] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-1 truncate max-w-[90%]">{name}</span>
      
      {/* Tiny glow effect on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${style.color} blur-lg -z-10`} />
    </div>
  );
};

export default ElementCard;
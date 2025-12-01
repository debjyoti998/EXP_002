import React from 'react';
import { X, Atom, Zap, Layers, Disc } from 'lucide-react';
import { ElementData, Theme } from '../types';
import { CATEGORIES } from '../constants';
import BohrAtom from './BohrAtom';

interface ModalProps {
  element: ElementData | null;
  onClose: () => void;
  theme: Theme;
}

const Modal: React.FC<ModalProps> = ({ element, onClose, theme }) => {
  if (!element) return null;
  const [num, sym, name, mass, catId, , row] = element;
  const style = CATEGORIES[catId];
  const textColor = theme.id === 'light' ? style.textLight : style.text;

  // Helper to determine approx shell count
  const shellCount = Math.ceil(Math.log(num + 1) / 1.5) || row;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center ${theme.modalOverlay} backdrop-blur-xl animate-in fade-in duration-300 p-4`}>
      <button 
        onClick={onClose}
        className={`absolute top-6 right-6 p-2 ${theme.textMuted} hover:${theme.text} transition-colors z-50 rounded-full hover:${theme.cardBg}`}
        aria-label="Close details"
      >
        <X size={32} />
      </button>

      <div className="flex flex-col md:flex-row items-center gap-12 w-full max-w-5xl h-full md:h-auto overflow-y-auto md:overflow-visible custom-scrollbar">
        
        {/* Left: 3D Visualization */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
          <div className="relative w-80 h-80 flex items-center justify-center">
             {/* Background Glow */}
            <div className={`absolute inset-0 ${style.color} opacity-20 blur-[60px] rounded-full`} />
            <BohrAtom atomicNumber={num} theme={theme} />
          </div>
          <p className={`mt-8 ${theme.textMuted} text-sm font-mono tracking-widest uppercase`}>Bohr Model Representation</p>
        </div>

        {/* Right: Data */}
        <div className="flex-1 w-full max-w-md pb-8 md:pb-0">
          <div className="mb-2">
            <span className={`text-lg font-mono ${textColor} brightness-110`}>
              {num.toString().padStart(3, '0')}
            </span>
          </div>
          
          <h1 className={`text-6xl md:text-7xl font-bold ${theme.text} mb-2 tracking-tight`}>{name}</h1>
          <div className="flex items-center gap-4 mb-8">
            <span className={`px-3 py-1 border ${theme.border} rounded-full text-xs uppercase tracking-widest ${theme.textMuted}`}>
              {style.name}
            </span>
            <span className={`${theme.textMuted} font-mono`}>{mass} u</span>
          </div>

          <p className={`${theme.text} opacity-80 leading-relaxed mb-8`}>
            {name} ({sym}) is a chemical element with atomic number {num}. 
            It resides in group {element[5]} and period {element[6]}. 
            This visualization represents its electron shell configuration in a simplified Bohr model.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 ${theme.cardBg} rounded border ${theme.border} hover:${theme.border.replace('/10', '/30')} transition-colors`}>
              <div className={`flex items-center gap-2 mb-2 ${theme.textMuted}`}>
                <Atom size={16} />
                <span className="text-xs uppercase tracking-wider">Electrons</span>
              </div>
              <span className={`text-2xl ${theme.text} font-mono`}>{num}</span>
            </div>
            <div className={`p-4 ${theme.cardBg} rounded border ${theme.border} hover:${theme.border.replace('/10', '/30')} transition-colors`}>
              <div className={`flex items-center gap-2 mb-2 ${theme.textMuted}`}>
                <Disc size={16} />
                <span className="text-xs uppercase tracking-wider">Protons</span>
              </div>
              <span className={`text-2xl ${theme.text} font-mono`}>{num}</span>
            </div>
            <div className={`p-4 ${theme.cardBg} rounded border ${theme.border} hover:${theme.border.replace('/10', '/30')} transition-colors`}>
              <div className={`flex items-center gap-2 mb-2 ${theme.textMuted}`}>
                <Zap size={16} />
                <span className="text-xs uppercase tracking-wider">Valence</span>
              </div>
              {/* Simplified Valence Calculation for display */}
              <span className={`text-2xl ${theme.text} font-mono`}>
                {element[5] > 2 && element[5] < 13 ? 'Var' : (element[5] % 10 || (element[5] === 18 ? 8 : '-'))}
              </span>
            </div>
             <div className={`p-4 ${theme.cardBg} rounded border ${theme.border} hover:${theme.border.replace('/10', '/30')} transition-colors`}>
              <div className={`flex items-center gap-2 mb-2 ${theme.textMuted}`}>
                <Layers size={16} />
                <span className="text-xs uppercase tracking-wider">Shells</span>
              </div>
              <span className={`text-2xl ${theme.text} font-mono`}>
                {shellCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
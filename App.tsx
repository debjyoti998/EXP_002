import React, { useState, useMemo } from 'react';
import { Search, Moon, Sun } from 'lucide-react';
import { ELEMENTS_RAW, CATEGORIES, THEMES } from './constants';
import { ElementData } from './types';
import ElementCard from './components/ElementCard';
import Modal from './components/Modal';

export default function App() {
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [filterCat, setFilterCat] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  const theme = THEMES[themeMode];

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const elements = useMemo(() => ELEMENTS_RAW, []);

  const filteredElements = useMemo(() => {
    return elements.filter(el => {
      const matchesSearch = el[2].toLowerCase().includes(searchTerm.toLowerCase()) || 
                            el[1].toLowerCase().includes(searchTerm.toLowerCase()) ||
                            el[0].toString().includes(searchTerm);
      return matchesSearch;
    });
  }, [elements, searchTerm]);

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans selection:bg-blue-500/30 overflow-hidden flex flex-col transition-colors duration-500`}>
      {/* Navbar */}
      <nav className={`flex items-center justify-between px-6 py-4 border-b ${theme.border} ${theme.navbarBg} backdrop-blur-md sticky top-0 z-40 transition-colors duration-500`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
            Pt
          </div>
          <span className="font-bold tracking-tight text-lg">Periodic Table</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textMuted} group-focus-within:${theme.text} transition-colors`} size={16} />
            <input 
              type="text" 
              placeholder="Search elements..." 
              className={`w-32 sm:w-48 ${theme.inputBg} border ${theme.border} rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:w-40 sm:focus:w-64 transition-all duration-300 placeholder:${theme.textMuted}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme.inputBg} border ${theme.border} ${theme.text} hover:${theme.cardHoverBorder} transition-all`}
            aria-label="Toggle theme"
          >
            {themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Filters */}
        <aside className={`w-64 border-r ${theme.border} ${theme.sidebarBg} p-6 hidden lg:block overflow-y-auto custom-scrollbar transition-colors duration-500`}>
          <h3 className={`text-xs font-bold ${theme.textMuted} uppercase tracking-widest mb-4`}>Categories</h3>
          <div className="space-y-1">
            {Object.entries(CATEGORIES).map(([id, cat]) => (
              <button
                key={id}
                onClick={() => setFilterCat(filterCat === parseInt(id) ? null : parseInt(id))}
                className={`
                  w-full text-left px-3 py-2 rounded text-xs font-medium transition-all duration-200 flex items-center gap-3
                  ${filterCat === parseInt(id) ? `${cat.color} text-white shadow-lg` : `${theme.textMuted} hover:${theme.text} hover:${theme.inputBg}`}
                `}
              >
                <div className={`w-2 h-2 rounded-full ${cat.color} ${cat.glow}`} />
                {cat.name}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <button 
              onClick={() => { setFilterCat(null); setSearchTerm(''); }}
              className={`w-full py-2 border ${theme.border} rounded text-xs ${theme.textMuted} hover:${theme.text} hover:${theme.border.replace('/10', '/30')} transition-all hover:${theme.inputBg}`}
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Main Grid Area */}
        <main className="flex-1 overflow-auto p-4 sm:p-8 relative">
          <div className="min-w-[1000px] mx-auto pb-20">
            {/* The Grid Container */}
            <div 
              className="grid grid-cols-18 gap-1 auto-rows-min transform transition-transform duration-700 origin-top-left"
            >
              {elements.map((element) => {
                const isFiltered = filterCat !== null && element[4] !== filterCat;
                const isSearched = searchTerm && !filteredElements.includes(element);
                
                const isDimmed = isFiltered || isSearched;

                return (
                  <ElementCard 
                    key={element[0]} 
                    element={element} 
                    onClick={setSelectedElement}
                    isDimmed={!!isDimmed}
                    theme={theme}
                  />
                );
              })}

              {/* SPACER for Row 8 - Forces the gap between transition metals and Lanthanides */}
              <div className="col-span-full row-start-8 h-8 md:h-12" />

              {/* Labels for Lanthanides/Actinides Placeholders */}
              <div className={`col-start-3 row-start-6 border border-dashed ${theme.border} rounded flex items-center justify-center opacity-30 pointer-events-none select-none`}>
                <span className={`text-[0.6rem] ${theme.textMuted}`}>57-71</span>
              </div>
              <div className={`col-start-3 row-start-7 border border-dashed ${theme.border} rounded flex items-center justify-center opacity-30 pointer-events-none select-none`}>
                <span className={`text-[0.6rem] ${theme.textMuted}`}>89-103</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Details Modal */}
      {selectedElement && (
        <Modal 
          element={selectedElement} 
          onClose={() => setSelectedElement(null)}
          theme={theme} 
        />
      )}
    </div>
  );
}
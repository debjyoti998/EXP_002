export type ElementData = [
  number, // Atomic Number
  string, // Symbol
  string, // Name
  number, // Atomic Mass
  number, // Category ID
  number, // Column
  number  // Row
];

export interface Category {
  name: string;
  color: string;
  glow: string;
  text: string;
  textLight: string;
}

export interface CategoryMap {
  [key: number]: Category;
}

export interface Theme {
  id: string;
  bg: string;
  text: string;
  textMuted: string;
  border: string;
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  sidebarBg: string;
  navbarBg: string;
  inputBg: string;
  modalOverlay: string;
  atomShell: string;
  atomNucleus: string;
  atomElectron: string;
}

export interface ThemeMap {
  [key: string]: Theme;
}
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header style={{ 
      background: theme === 'light' ? '#fff' : '#333', 
      color: theme === 'light' ? '#000' : '#fff',
      padding: '20px' 
    }}>
      <h1>Темаи ҳозира: {theme}</h1>
      <button onClick={toggleTheme}>
        Иваз кардани тема
      </button>
    </header>
  );
}

export default Header;
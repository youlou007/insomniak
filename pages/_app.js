import { createContext, useState, useEffect } from 'react';
import '../styles/globals.css';

// Contexte pour gérer le thème
export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

function MyApp({ Component, pageProps }) {
  // État du thème (défaut: sombre)
  const [theme, setTheme] = useState('dark');
  
  // Effet pour appliquer le thème à l'ensemble du document
  useEffect(() => {
    // Appliquer le thème au corps du document
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    
    // Appliquer le thème aux méta-données pour la couleur du thème mobile
    const metaThemeColor = document.querySelector('meta[name=theme-color]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
    }
  }, [theme]);
  
  // Fonction pour basculer entre les thèmes sombre et clair
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <>
      {/* Ajout de la police Summit */}
      <style jsx global>{`
        @font-face {
          font-family: 'Summit';
          src: url('https://lisidesign.com/font/summit') format('woff2');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Component {...pageProps} />
      </ThemeContext.Provider>
    </>
  );
}

export default MyApp; 
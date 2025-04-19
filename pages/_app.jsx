import { useState, createContext, useEffect } from 'react';
import '../styles/globals.css';

// Créer un contexte pour le thème
export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('dark');

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Vérifier si nous sommes côté client
    if (typeof window !== 'undefined') {
      // Appliquer ou retirer la classe light-theme au body
      if (newTheme === 'light') {
        document.documentElement.classList.add('light-theme');
      } else {
        document.documentElement.classList.remove('light-theme');
      }
      
      // Stocker la préférence de thème dans localStorage
      localStorage.setItem('theme', newTheme);
    }
  };

  // Récupérer le thème préféré lors du chargement initial - uniquement côté client
  useEffect(() => {
    // Vérifier si nous sommes côté client
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
        if (savedTheme === 'light') {
          document.documentElement.classList.add('light-theme');
        }
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}

export default MyApp; 
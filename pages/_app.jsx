import { useState, createContext, useEffect } from 'react';
import Head from 'next/head';
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
      // Appliquer ou retirer la classe light-theme au document
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
      // Récupérer le thème sauvegardé ou utiliser 'dark' par défaut
      const savedTheme = localStorage.getItem('theme');
      
      // Si un thème est sauvegardé, l'appliquer
      if (savedTheme) {
        setTheme(savedTheme);
        if (savedTheme === 'light') {
          document.documentElement.classList.add('light-theme');
        } else {
          // S'assurer que la classe light-theme est retirée pour le thème sombre
          document.documentElement.classList.remove('light-theme');
        }
      } else {
        // Si aucun thème n'est sauvegardé, définir 'dark' comme thème par défaut
        setTheme('dark');
        document.documentElement.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      }
    }
  }, []);

  return (
    <>
      <Head>
        {/* Script pour éviter le flash de contenu lors du chargement */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'light') {
                  document.documentElement.classList.add('light-theme');
                }
              } catch (e) {}
            })();
          `
        }} />
      </Head>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Component {...pageProps} />
      </ThemeContext.Provider>
    </>
  );
}

export default MyApp; 
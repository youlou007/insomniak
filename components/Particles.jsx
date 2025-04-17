import { useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../pages/_app';

const Particles = () => {
  const containerRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const numberOfParticles = 150;
    
    // Supprimer les particules existantes
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // Créer de nouvelles particules
    for (let i = 0; i < numberOfParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Taille aléatoire (entre 4 et 8px)
      const size = 4 + Math.random() * 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Opacité aléatoire (entre 0.1 et 0.5)
      const opacity = 0.1 + Math.random() * 0.4;
      // La couleur sera gérée par les variables CSS
      
      // Position aléatoire horizontale
      const randomX = Math.random() * 100;
      particle.style.left = `${randomX}%`;
      
      // Position initiale aléatoire verticale (déjà dans l'animation)
      const randomY = -Math.random() * 50; // Position initiale entre -50vh et 0vh
      particle.style.top = `${randomY}vh`;
      
      // Délai d'animation aléatoire
      const randomDelay = Math.random() * 15;
      particle.style.animationDelay = `${randomDelay}s`;
      
      // Vitesse d'animation aléatoire
      const randomDuration = 10 + Math.random() * 20;
      particle.style.animationDuration = `${randomDuration}s`;
      
      container.appendChild(particle);
    }
    
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [theme]); // Réexécuter si le thème change

  return (
    <div 
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: 'hidden', position: 'fixed', height: '100vh' }}
    />
  );
};

export default Particles; 
import { useEffect, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../pages/_app';

// Fonctions pour calculer les angles des particules selon leur coin d'origine
const getTopLeftAngle = () => {
  // Éventail orienté vers le haut-gauche (225° ± 45°)
  return Math.random() * 90 - 45; // -45° à +45° autour de la base -135°
};

const getTopRightAngle = () => {
  // Éventail orienté vers le haut-droite (315° ± 45°)
  return Math.random() * 90 - 45; // -45° à +45° autour de la base -45°
};

const getBottomRightAngle = () => {
  // Éventail orienté vers le bas-droite (45° ± 45°)
  return Math.random() * 90 - 45; // -45° à +45° autour de la base 45°
};

const getBottomLeftAngle = () => {
  // Éventail orienté vers le bas-gauche (135° ± 45°)
  return Math.random() * 90 - 45; // -45° à +45° autour de la base 135° 
};

const PopupParticles = ({ isVisible }) => {
  const containerRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!containerRef.current || !isVisible) return;
    
    const container = containerRef.current;
    const numberOfParticles = 120; // Augmentation du nombre de particules
    
    // Supprimer les particules existantes
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // Créer de nouvelles particules
    for (let i = 0; i < numberOfParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'popup-particle';
      
      // Taille aléatoire (entre 2 et 6px)
      const size = 2 + Math.random() * 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Opacité aléatoire (entre 0.1 et 0.7)
      const opacity = 0.1 + Math.random() * 0.6;
      // La couleur sera gérée par les variables CSS
      
      // Sélection aléatoire des positions
      // Approche simplifiée : positions directement sur les bords ou près des coins
      const positions = [
        'top', 'right', 'bottom', 'left',
        'top-left', 'top-right', 'bottom-right', 'bottom-left'
      ];
      
      const position = positions[Math.floor(Math.random() * positions.length)];
      
      // Position basée sur le côté ou le coin choisi
      let posX, posY;
      
      switch(position) {
        case 'top':
          posX = 5 + Math.random() * 90; // Maintien de 5-95% de la largeur
          posY = 0;
          break;
        case 'right':
          posX = 100;
          posY = 10 + Math.random() * 80; // Rapproché des bords
          break;
        case 'bottom':
          posX = 5 + Math.random() * 90; // Maintien de 5-95% de la largeur
          posY = 99; // Très proche du bord inférieur
          break;
        case 'left':
          posX = 0;
          posY = 10 + Math.random() * 80; // Rapproché des bords
          break;
        case 'top-left':
          posX = 1; // Plus proche du bord
          posY = 1; // Plus proche du bord
          break;
        case 'top-right':
          posX = 99; // Plus proche du bord
          posY = 1; // Plus proche du bord
          break;
        case 'bottom-right':
          posX = 99; // Plus proche du bord
          posY = 99; // Plus proche du bord
          break;
        case 'bottom-left':
          posX = 1; // Plus proche du bord
          posY = 99; // Plus proche du bord
          break;
      }
      
      // Ajout de variations mineures pour éviter que toutes les particules
      // partent exactement du même point aux coins
      if (position.includes('-')) {
        // Ajouter une petite variation pour les coins
        posX += (position.includes('left') ? 1 : -1) * Math.random() * 5;
        posY += (position.includes('top') ? 1 : -1) * Math.random() * 5;
      }
      
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      // Direction de base selon la position
      let directionClass = `from-${position}`;
      
      // Pour les coins, calculer une direction plus précise en éventail
      if (position.includes('-')) {
        let angle;
        
        // Calculer l'angle de dispersion en fonction du coin
        if (position === 'top-left') {
          angle = getTopLeftAngle();
          particle.style.setProperty('--fan-angle', `${angle}deg`);
          directionClass = 'from-top-left-fan';
        } else if (position === 'top-right') {
          angle = getTopRightAngle();
          particle.style.setProperty('--fan-angle', `${angle}deg`);
          directionClass = 'from-top-right-fan';
        } else if (position === 'bottom-right') {
          angle = getBottomRightAngle();
          particle.style.setProperty('--fan-angle', `${angle}deg`);
          directionClass = 'from-bottom-right-fan';
        } else if (position === 'bottom-left') {
          angle = getBottomLeftAngle();
          particle.style.setProperty('--fan-angle', `${angle}deg`);
          directionClass = 'from-bottom-left-fan';
        }
      }
      
      particle.classList.add(directionClass);
      
      // Variation aléatoire supplémentaire pour la distance de déplacement
      const distanceVariation = 80 + Math.random() * 50; // 80-130%
      particle.style.setProperty('--distance-multiplier', distanceVariation + '%');
      
      // Délai d'animation aléatoire pour une apparition échelonnée
      const randomDelay = Math.random() * 2;
      particle.style.animationDelay = `${randomDelay}s`;
      
      // Vitesse d'animation aléatoire (plus lente)
      const randomDuration = 4 + Math.random() * 4; // 4-8 secondes (encore plus lent)
      particle.style.animationDuration = `${randomDuration}s`;
      
      container.appendChild(particle);
    }
    
    // Ajouter de nouvelles particules périodiquement
    const intervalId = setInterval(() => {
      if (container && isVisible) {
        // Ajouter quelques particules toutes les secondes
        for (let i = 0; i < 8; i++) { // Augmenté pour plus de particules
          const particle = document.createElement('div');
          particle.className = 'popup-particle';
          
          const size = 2 + Math.random() * 4;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          
          const opacity = 0.1 + Math.random() * 0.6;
          // La couleur sera gérée par les variables CSS
          
          // Sélection aléatoire des positions (même approche que ci-dessus)
          const positions = [
            'top', 'right', 'bottom', 'left',
            'top-left', 'top-right', 'bottom-right', 'bottom-left'
          ];
          
          const position = positions[Math.floor(Math.random() * positions.length)];
          
          let posX, posY;
          
          switch(position) {
            case 'top':
              posX = 5 + Math.random() * 90; // Maintien de 5-95% de la largeur
              posY = 0;
              break;
            case 'right':
              posX = 100;
              posY = 10 + Math.random() * 80; // Rapproché des bords
              break;
            case 'bottom':
              posX = 5 + Math.random() * 90; // Maintien de 5-95% de la largeur
              posY = 99; // Très proche du bord inférieur
              break;
            case 'left':
              posX = 0;
              posY = 10 + Math.random() * 80; // Rapproché des bords
              break;
            case 'top-left':
              posX = 1; // Plus proche du bord
              posY = 1; // Plus proche du bord
              break;
            case 'top-right':
              posX = 99; // Plus proche du bord
              posY = 1; // Plus proche du bord
              break;
            case 'bottom-right':
              posX = 99; // Plus proche du bord
              posY = 99; // Plus proche du bord
              break;
            case 'bottom-left':
              posX = 1; // Plus proche du bord
              posY = 99; // Plus proche du bord
              break;
          }
          
          // Ajout de variations mineures pour les coins
          if (position.includes('-')) {
            posX += (position.includes('left') ? 1 : -1) * Math.random() * 5;
            posY += (position.includes('top') ? 1 : -1) * Math.random() * 5;
          }
          
          particle.style.left = `${posX}%`;
          particle.style.top = `${posY}%`;
          
          // Direction de base selon la position
          let directionClass = `from-${position}`;
          
          // Pour les coins, calculer une direction plus précise en éventail
          if (position.includes('-')) {
            let angle;
            
            // Calculer l'angle de dispersion en fonction du coin
            if (position === 'top-left') {
              angle = getTopLeftAngle();
              particle.style.setProperty('--fan-angle', `${angle}deg`);
              directionClass = 'from-top-left-fan';
            } else if (position === 'top-right') {
              angle = getTopRightAngle();
              particle.style.setProperty('--fan-angle', `${angle}deg`);
              directionClass = 'from-top-right-fan';
            } else if (position === 'bottom-right') {
              angle = getBottomRightAngle();
              particle.style.setProperty('--fan-angle', `${angle}deg`);
              directionClass = 'from-bottom-right-fan';
            } else if (position === 'bottom-left') {
              angle = getBottomLeftAngle();
              particle.style.setProperty('--fan-angle', `${angle}deg`);
              directionClass = 'from-bottom-left-fan';
            }
          }
          
          particle.classList.add(directionClass);
          
          const distanceVariation = 80 + Math.random() * 50;
          particle.style.setProperty('--distance-multiplier', distanceVariation + '%');
          
          const randomDuration = 4 + Math.random() * 4; // 4-8 secondes (encore plus lent)
          particle.style.animationDuration = `${randomDuration}s`;
          
          container.appendChild(particle);
        }
      }
    }, 800); // Interval plus court pour plus de particules
    
    return () => {
      clearInterval(intervalId);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [isVisible, theme]); // Réexécuter si isVisible ou theme change

  return (
    <motion.div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-visible rounded-2xl"
      style={{ margin: '-50px', padding: '50px', zIndex: 60 }} // Marge encore augmentée
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default PopupParticles;
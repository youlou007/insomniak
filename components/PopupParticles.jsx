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

// Direction de base selon la position
const getDirectionClass = (position, isMobile) => {
  // En version mobile, inverser la direction des particules
  if (isMobile) {
    // Pour les cotés, inverser la direction
    switch(position) {
      case 'left':
        return 'from-right'; // Depuis la gauche mais se dirige vers la droite (intérieur)
      case 'right':
        return 'from-left'; // Depuis la droite mais se dirige vers la gauche (intérieur)
      case 'top':
        return 'from-top'; // Pas d'inversion pour le haut
      case 'bottom':
        return 'from-bottom'; // Pas d'inversion pour le bas
      default:
        // Pour les coins, utiliser la même classe mais on appliquera une rotation plus tard
        return `from-${position}`;
    }
  }
  
  // Version desktop: direction standard
  return `from-${position}`;
};

// Ajuster l'angle des particules des coins en version mobile
const adjustCornerAngle = (position, angle, isMobile) => {
  // En version mobile, inverser l'angle des particules des coins (rotation de 180°)
  if (isMobile && position.includes('-')) {
    return angle + 180; // Ajouter 180° pour inverser la direction
  }
  return angle;
};

const PopupParticles = ({ isVisible, isMobile = false, isNarrow = false, popupWidth = 0 }) => {
  const containerRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!containerRef.current || !isVisible) return;
    
    const container = containerRef.current;
    
    // Nombre de particules adapté à la taille du popup
    const numberOfParticles = isNarrow ? 60 : isMobile ? 80 : 120;
    
    // Supprimer les particules existantes
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // Créer de nouvelles particules
    for (let i = 0; i < numberOfParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'popup-particle';
      
      // Taille aléatoire
      const size = isNarrow ? (2 + Math.random() * 3) : (2 + Math.random() * 4);
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Opacité aléatoire (entre 0.1 et 0.7)
      const opacity = 0.1 + Math.random() * 0.6;
      
      // Pour la version mobile, distribuer les particules différemment
      let positions;
      
      if (isMobile) {
        // En mobile, limiter les particules aux bordures du popup
        // et non aux bords de l'écran
        positions = [
          'top', 'right', 'bottom', 'left',
          'top-left', 'top-right', 'bottom-right', 'bottom-left'
        ];
      } else {
        positions = [
          'top', 'right', 'bottom', 'left',
          'top-left', 'top-right', 'bottom-right', 'bottom-left'
        ];
      }
      
      const position = positions[Math.floor(Math.random() * positions.length)];
      
      // Position basée sur le côté ou le coin choisi
      let posX, posY;
      
      // Ajustement pour la version mobile
      // Les distances sont plus courtes car le popup est de taille fixe
      const mobileOffset = isNarrow ? 3 : 5;
      
      switch(position) {
        case 'top':
          posX = 10 + Math.random() * 80; // 10-90%
          posY = isMobile ? -mobileOffset : 0;
          break;
        case 'right':
          posX = isMobile ? 105 : 110; // En mobile, juste à côté du popup
          posY = 10 + Math.random() * 80; // 10-90%
          break;
        case 'bottom':
          posX = 10 + Math.random() * 80; // 10-90%
          posY = isMobile ? 105 : 100;
          break;
        case 'left':
          posX = isMobile ? -5 : -10; // En mobile, juste à côté du popup
          posY = 10 + Math.random() * 80; // 10-90%
          break;
        case 'top-left':
          posX = isMobile ? -3 : -5;
          posY = isMobile ? -3 : -5;
          break;
        case 'top-right':
          posX = isMobile ? 103 : 105;
          posY = isMobile ? -3 : -5;
          break;
        case 'bottom-right':
          posX = isMobile ? 103 : 105;
          posY = isMobile ? 103 : 105;
          break;
        case 'bottom-left':
          posX = isMobile ? -3 : -5;
          posY = isMobile ? 103 : 105;
          break;
      }
      
      // Ajout de variations aléatoires pour éviter que toutes les particules
      // partent du même point
      if (position === 'left' || position === 'right') {
        // Variation verticale pour les côtés
        posY += (Math.random() - 0.5) * 20;
      } else if (position === 'top' || position === 'bottom') {
        // Variation horizontale pour le haut/bas
        posX += (Math.random() - 0.5) * 20;
      } else if (position.includes('-')) {
        // Petite variation pour les coins
        posX += (position.includes('left') ? 1 : -1) * Math.random() * 3;
        posY += (position.includes('top') ? 1 : -1) * Math.random() * 3;
      }
      
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      // Direction de base selon la position
      let directionClass = getDirectionClass(position, isMobile);
      
      // Pour les coins, calculer une direction plus précise en éventail
      if (position.includes('-')) {
        let angle;
        
        // Calculer l'angle de dispersion en fonction du coin
        if (position === 'top-left') {
          angle = getTopLeftAngle();
          // Ajuster l'angle pour la version mobile (180° de rotation)
          angle = adjustCornerAngle(position, angle, isMobile);
          particle.style.setProperty('--fan-angle', `${angle}deg`);
          directionClass = 'from-top-left-fan';
        } else if (position === 'top-right') {
          angle = getTopRightAngle();
          // Ajuster l'angle pour la version mobile (180° de rotation)
          angle = adjustCornerAngle(position, angle, isMobile);
          particle.style.setProperty('--fan-angle', `${angle}deg`);
          directionClass = 'from-top-right-fan';
        } else if (position === 'bottom-right') {
          angle = getBottomRightAngle();
          // Ajuster l'angle pour la version mobile (180° de rotation)
          angle = adjustCornerAngle(position, angle, isMobile);
          particle.style.setProperty('--fan-angle', `${angle}deg`);
          directionClass = 'from-bottom-right-fan';
        } else if (position === 'bottom-left') {
          angle = getBottomLeftAngle();
          // Ajuster l'angle pour la version mobile (180° de rotation)
          angle = adjustCornerAngle(position, angle, isMobile);
          particle.style.setProperty('--fan-angle', `${angle}deg`);
          directionClass = 'from-bottom-left-fan';
        }
      }
      
      particle.classList.add(directionClass);
      
      // Variation de la distance parcourue
      // En mobile, les particules parcourent une distance très courte pour ne pas gêner la lecture
      let distanceMultiplier;
      
      if (isMobile) {
        // En mobile, distance très courte pour ne pas gêner la lecture
        distanceMultiplier = 2 + Math.random() * 2; // 2-4% seulement
      } else {
        // En desktop, distance standard plus longue
        distanceMultiplier = position === 'left' || position === 'right'
          ? 90 + Math.random() * 40  // 90-130% pour les côtés
          : 70 + Math.random() * 40; // 70-110% pour le reste
      }
      
      particle.style.setProperty('--distance-multiplier', `${distanceMultiplier}%`);
      
      // Délai d'animation aléatoire pour une apparition échelonnée
      const randomDelay = Math.random() * 2;
      particle.style.animationDelay = `${randomDelay}s`;
      
      // Vitesse d'animation
      // En mobile, animation plus rapide pour que les particules disparaissent plus vite
      const randomDuration = isMobile 
        ? (1.5 + Math.random() * 1.5) // 1.5-3 secondes pour mobile (plus rapide)
        : (4 + Math.random() * 4);    // 4-8 secondes pour desktop
      
      particle.style.animationDuration = `${randomDuration}s`;
      
      container.appendChild(particle);
    }
    
    // Ajouter périodiquement de nouvelles particules
    // Intervalle plus court pour augmenter le spawn rate
    const interval = isMobile ? 500 : 1000; // 500ms en mobile au lieu de 1000-1500ms
    const newParticlesCount = isMobile ? 8 : isNarrow ? 3 : 8; // Plus de particules en mobile
    
    const intervalId = setInterval(() => {
      if (container && isVisible) {
        // Ajouter quelques particules
        for (let i = 0; i < newParticlesCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'popup-particle';
          
          const size = isNarrow ? (2 + Math.random() * 3) : (2 + Math.random() * 4);
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          
          const opacity = 0.1 + Math.random() * 0.6;
          
          let posX, posY;
          
          const positions = [
            'top', 'right', 'bottom', 'left',
            'top-left', 'top-right', 'bottom-right', 'bottom-left'
          ];
          
          const position = positions[Math.floor(Math.random() * positions.length)];
          
          const mobileOffset = isNarrow ? 3 : 5;
          
          switch(position) {
            case 'top':
              posX = 10 + Math.random() * 80;
              posY = isMobile ? -mobileOffset : 0;
              break;
            case 'right':
              posX = isMobile ? 105 : 110;
              posY = 10 + Math.random() * 80;
              break;
            case 'bottom':
              posX = 10 + Math.random() * 80;
              posY = isMobile ? 105 : 100;
              break;
            case 'left':
              posX = isMobile ? -5 : -10;
              posY = 10 + Math.random() * 80;
              break;
            case 'top-left':
              posX = isMobile ? -3 : -5;
              posY = isMobile ? -3 : -5;
              break;
            case 'top-right':
              posX = isMobile ? 103 : 105;
              posY = isMobile ? -3 : -5;
              break;
            case 'bottom-right':
              posX = isMobile ? 103 : 105;
              posY = isMobile ? 103 : 105;
              break;
            case 'bottom-left':
              posX = isMobile ? -3 : -5;
              posY = isMobile ? 103 : 105;
              break;
          }
          
          if (position === 'left' || position === 'right') {
            posY += (Math.random() - 0.5) * 20;
          } else if (position === 'top' || position === 'bottom') {
            posX += (Math.random() - 0.5) * 20;
          } else if (position.includes('-')) {
            posX += (position.includes('left') ? 1 : -1) * Math.random() * 3;
            posY += (position.includes('top') ? 1 : -1) * Math.random() * 3;
          }
          
          particle.style.left = `${posX}%`;
          particle.style.top = `${posY}%`;
          
          // Direction de base selon la position
          let directionClass = getDirectionClass(position, isMobile);
          
          if (position.includes('-')) {
            let angle;
            
            if (position === 'top-left') {
              angle = getTopLeftAngle();
              angle = adjustCornerAngle(position, angle, isMobile);
              particle.style.setProperty('--fan-angle', `${angle}deg`);
              directionClass = 'from-top-left-fan';
            } else if (position === 'top-right') {
              angle = getTopRightAngle();
              angle = adjustCornerAngle(position, angle, isMobile);
              particle.style.setProperty('--fan-angle', `${angle}deg`);
              directionClass = 'from-top-right-fan';
            } else if (position === 'bottom-right') {
              angle = getBottomRightAngle();
              angle = adjustCornerAngle(position, angle, isMobile);
              particle.style.setProperty('--fan-angle', `${angle}deg`);
              directionClass = 'from-bottom-right-fan';
            } else if (position === 'bottom-left') {
              angle = getBottomLeftAngle();
              angle = adjustCornerAngle(position, angle, isMobile);
              particle.style.setProperty('--fan-angle', `${angle}deg`);
              directionClass = 'from-bottom-left-fan';
            }
          }
          
          particle.classList.add(directionClass);
          
          // Distance plus courte pour mobile
          let distanceMultiplier;
          
          if (isMobile) {
            distanceMultiplier = 2 + Math.random() * 2; // 2-4% seulement
          } else {
            distanceMultiplier = position === 'left' || position === 'right'
              ? 90 + Math.random() * 40
              : 70 + Math.random() * 40;
          }
          
          particle.style.setProperty('--distance-multiplier', `${distanceMultiplier}%`);
          
          // Animation plus rapide pour mobile
          const randomDuration = isMobile 
            ? (1.5 + Math.random() * 1.5)
            : (4 + Math.random() * 4);
          
          particle.style.animationDuration = `${randomDuration}s`;
          
          container.appendChild(particle);
        }
      }
    }, interval);
    
    return () => {
      clearInterval(intervalId);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [isVisible, theme, isMobile, isNarrow]);

  // Ajuster la marge du conteneur des particules
  // En mobile, une marge plus petite car le popup est de taille fixe
  const getContainerMargin = () => {
    if (isMobile) {
      return isNarrow ? '-25px' : '-30px';
    }
    return '-50px';
  };

  return (
    <motion.div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-visible rounded-2xl"
      style={{ 
        margin: getContainerMargin(),
        padding: isMobile ? (isNarrow ? '25px' : '30px') : '50px',
        zIndex: 60 
      }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default PopupParticles;
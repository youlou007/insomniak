import { useEffect, useState, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PopupParticles from './PopupParticles';
import { ThemeContext } from '../pages/_app';
import { getAssetPath } from '../utils/assetPrefix';

const PoemPopup = ({ poem, onClose, searchTerm }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [popupWidth, setPopupWidth] = useState(0);
  const [showMoreLines, setShowMoreLines] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');
  const popupRef = useRef(null);
  const contentRef = useRef(null);
  const searchInputRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  
  // Vérifier la taille de l'écran et ajuster les états en conséquence
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setIsMobile(width < 768);
      setIsNarrow(width < 400);
    };
    
    // Vérifier au chargement
    checkScreenSize();
    
    // Vérifier à chaque redimensionnement
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  // Mesurer la largeur réelle du popup une fois qu'il est rendu
  useEffect(() => {
    if (popupRef.current && isVisible) {
      // Utiliser un ResizeObserver pour suivre les changements de taille du popup
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          setPopupWidth(entry.contentRect.width);
        }
      });
      
      resizeObserver.observe(popupRef.current);
      
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [isVisible]);
  
  // Empêcher le défilement du body lorsque le popup est ouvert
  useEffect(() => {
    // Sauvegarder la position de défilement actuelle
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Appliquer immédiatement le blocage du défilement pour éviter tout saut
    document.body.classList.add('popup-open');
    
    // Appliquer directement le scroll top au body pour simuler un défilement vers le haut
    // sans utiliser window.scrollTo qui ne fonctionne pas correctement avec popup-open
    document.body.style.top = `-${scrollPosition}px`;
    
    // Définir isVisible à true après un court délai pour permettre les animations d'entrée
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    return () => {
      // Récupérer la position de défilement originale
      const scrollY = parseInt(document.body.style.top || '0') * -1;
      
      // Réactiver le défilement en supprimant la classe
      document.body.classList.remove('popup-open');
      document.body.style.top = '';
      
      // Restaurer la position de défilement
      window.scrollTo({
        top: scrollY || scrollPosition,
        behavior: 'smooth'
      });
      
      clearTimeout(timer);
    };
  }, []);
  
  // Initialiser la recherche locale avec le terme de recherche global
  useEffect(() => {
    setLocalSearchTerm(searchTerm || '');
  }, [searchTerm]);
  
  // Fonction pour basculer la barre de recherche
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    // Si on ouvre la recherche, focus sur l'input
    if (!isSearchVisible) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
  };
  
  // Fonction pour gérer la saisie de recherche locale
  const handleLocalSearchInput = (e) => {
    setLocalSearchTerm(e.target.value);
  };
  
  // Fonction pour effacer la recherche locale
  const clearLocalSearch = () => {
    setLocalSearchTerm('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  
  // Version modifiée pour utiliser la recherche locale
  const highlightText = (text) => {
    if (!localSearchTerm) return text;
    
    const regex = new RegExp(`(${localSearchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? <mark key={i} className="bg-[#D3D3D3] text-black px-1 rounded">{part}</mark> : part
    );
  };
  
  // Fonction pour gérer la fermeture avec animation
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500); // Attendre la fin de l'animation avant de fermer
  };

  // Calculer les styles du popup en fonction de la taille de l'écran
  const getPopupStyles = () => {
    // Pour desktop, on fixe à une taille max plutôt qu'un pourcentage
    if (screenWidth >= 768) {
      return {
        padding: '2rem',
        maxWidth: '24rem',
        width: '100%'
      };
    }
    
    // Calculer le padding en fonction de la largeur
    let padding;
    if (screenWidth < 320) {
      padding = '0.5rem';
    } else if (screenWidth < 400) {
      padding = '0.75rem';
    } else {
      padding = '1rem';
    }
    
    // Pour la version mobile, utiliser une largeur fixe plutôt qu'un pourcentage
    // Cette largeur sera constante même lorsque l'écran est agrandi latéralement
    let fixedWidth;
    
    if (screenWidth < 320) {
      fixedWidth = 280; // 280px pour les très petits écrans
    } else if (screenWidth < 400) {
      fixedWidth = 320; // 320px pour les écrans étroits
    } else {
      fixedWidth = 350; // 350px pour les mobiles normaux
    }
    
    // S'assurer que le popup ne dépasse pas la largeur de l'écran
    // Garder au moins 24px de marge de chaque côté
    const minSideMargin = 24;
    const totalSideMargins = minSideMargin * 2;
    const maxWidth = screenWidth - totalSideMargins;
    
    // Utiliser la plus petite valeur entre largeur fixe et largeur maximale
    const finalWidth = Math.min(fixedWidth, maxWidth);
    
    return {
      padding: padding,
      width: `${finalWidth}px`, // Largeur en pixels plutôt qu'en pourcentage
      margin: '0 auto'
    };
  };
  
  // Déterminer la taille du texte en fonction de la largeur du popup
  const getTextSizeClass = (type) => {
    // Si popupWidth n'est pas encore calculé
    if (!popupWidth) {
      // Utiliser screenWidth comme fallback
      if (type === 'title') {
        return isNarrow ? 'text-xl' : isMobile ? 'text-2xl' : 'text-3xl';
      } else if (type === 'meta') {
        return isNarrow ? 'text-xs' : isMobile ? 'text-sm' : 'text-base';
      } else if (type === 'content') {
        return isNarrow ? 'text-sm' : isMobile ? 'text-base' : 'text-xl';
      }
    }
    
    // Utiliser popupWidth pour un dimensionnement plus précis
    if (type === 'title') {
      if (popupWidth < 200) return 'text-lg';
      if (popupWidth < 250) return 'text-xl';
      if (popupWidth < 350) return 'text-2xl';
      return 'text-3xl';
    } else if (type === 'meta') {
      if (popupWidth < 200) return 'text-xs';
      if (popupWidth < 300) return 'text-sm';
      return 'text-base';
    } else if (type === 'content') {
      if (popupWidth < 200) return 'text-xs';
      if (popupWidth < 250) return 'text-sm';
      if (popupWidth < 350) return 'text-base';
      return 'text-xl';
    }
    
    return '';
  };
  
  // Calculer les marges en fonction de la taille du popup
  const getSpacingClass = (type) => {
    if (!popupWidth) {
      // Fallback basé sur la largeur d'écran
      if (type === 'title') {
        return isNarrow ? 'mb-2' : 'mb-3';
      } else if (type === 'meta') {
        return isNarrow ? 'mb-3' : 'mb-5';
      } else if (type === 'line') {
        return isNarrow ? 'mb-1.5' : isMobile ? 'mb-2' : 'mb-3';
      }
    }
    
    // Basé sur la largeur réelle du popup
    if (type === 'title') {
      if (popupWidth < 200) return 'mb-1.5';
      if (popupWidth < 300) return 'mb-2';
      return 'mb-3';
    } else if (type === 'meta') {
      if (popupWidth < 200) return 'mb-2';
      if (popupWidth < 300) return 'mb-3';
      return 'mb-5';
    } else if (type === 'line') {
      if (popupWidth < 200) return 'mb-1';
      if (popupWidth < 300) return 'mb-1.5';
      if (popupWidth < 400) return 'mb-2';
      return 'mb-3';
    }
    
    return '';
  };

  // Fonction pour gérer le défilement du contenu
  const handleContentScroll = (e) => {
    // Si l'utilisateur a défilé vers le bas, montrer le reste du contenu
    if (contentRef.current && contentRef.current.scrollTop > 10) {
      setShowMoreLines(true);
    } else {
      setShowMoreLines(false);
    }
  };

  // Calculer la hauteur du conteneur de texte en fonction de la taille du popup
  const getContentContainerStyle = () => {
    // Nombre maximum de lignes visibles avant défilement
    const maxVisibleLines = 14;
    
    // Hauteur approximative d'une ligne de texte en pixels, selon la taille du texte
    let lineHeight;
    if (popupWidth < 200) {
      lineHeight = 18; // Pour text-xs
    } else if (popupWidth < 250) {
      lineHeight = 20; // Pour text-sm
    } else if (popupWidth < 350) {
      lineHeight = 24; // Pour text-base
    } else {
      lineHeight = 28; // Pour text-xl
    }
    
    // Espace entre les lignes
    let lineSpacing;
    if (popupWidth < 200) {
      lineSpacing = 4; // mb-1
    } else if (popupWidth < 300) {
      lineSpacing = 6; // mb-1.5
    } else if (popupWidth < 400) {
      lineSpacing = 8; // mb-2
    } else {
      lineSpacing = 12; // mb-3
    }
    
    // Calculer la hauteur maximale du conteneur
    const maxHeight = maxVisibleLines * (lineHeight + lineSpacing);
    
    return {
      maxHeight: `${maxHeight}px`,
      overflowY: 'auto',
      scrollbarWidth: 'none', // Firefox
      msOverflowStyle: 'none', // IE/Edge
      position: 'relative'
    };
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={handleClose}
      >
        {/* Overlay avec effet de flou */}
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Bouton hamburger pour recherche */}
        <div className="fixed right-0 top-4 z-[60] mr-4">
          <button 
            className="w-16 h-16 relative focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              toggleSearch();
            }}
            aria-label="Rechercher dans le poème"
          >
            <img 
              src={getAssetPath("/images/hamburger button.png")}
              alt="Rechercher"
              className="w-16 h-16 object-contain"
            />
          </button>
        </div>
        
        {/* Barre de recherche */}
        {isSearchVisible && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed right-4 top-16 z-[60] w-64 p-2 rounded-lg shadow-lg"
            style={{ 
              backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Rechercher dans ce poème..."
                value={localSearchTerm}
                onChange={handleLocalSearchInput}
                className="w-full border rounded-lg py-2 pl-4 pr-10 search-input"
              />
              {localSearchTerm && (
                <button 
                  onClick={clearLocalSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <img 
                    src={getAssetPath("/images/return button.png")}
                    alt="Effacer"
                    className="w-5 h-5 object-contain"
                  />
                </button>
              )}
              {!localSearchTerm && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <img 
                    src={getAssetPath("/images/loupe barre de recherche.png")}
                    alt="Rechercher"
                    className="w-5 h-5 object-contain"
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Contenu du popup */}
        <motion.div
          ref={popupRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: isVisible ? 1 : 0.9, opacity: isVisible ? 1 : 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-transparent rounded-2xl text-center popup-content"
          style={getPopupStyles()}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Particules autour du popup */}
          <PopupParticles 
            isVisible={isVisible} 
            isMobile={isMobile} 
            isNarrow={isNarrow}
            popupWidth={popupWidth}
          />
          
          <h2 className={`font-bold ${getTextSizeClass('title')} ${getSpacingClass('title')}`}>
            {highlightText(poem.title)}
          </h2>
          <div className={`text-gray-400 ${getTextSizeClass('meta')} ${getSpacingClass('meta')}`}>
            {poem.author && <span>Par {highlightText(poem.author)}</span>}
            {poem.date && <span className="ml-2">• {poem.date}</span>}
          </div>
          
          {/* Conteneur de poème avec défilement caché */}
          <div 
            ref={contentRef}
            className={`whitespace-pre-line text-gray-200 poem-text ${getTextSizeClass('content')} poem-scroll-container`}
            style={getContentContainerStyle()}
            onScroll={handleContentScroll}
          >
            {poem.content.split('\n').map((line, index) => (
              <div key={index} className={`${getSpacingClass('line')}`}>
                {highlightText(line)}
              </div>
            ))}
            
            {/* Indicateur de défilement si le poème est long */}
            {poem.content.split('\n').length > 14 && !showMoreLines && (
              <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none flex justify-center items-end">
                <div className="w-5 h-5 border-b-2 border-r-2 border-gray-300 border-opacity-60 transform rotate-45 mb-1 animate-bounce-subtle"></div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PoemPopup; 
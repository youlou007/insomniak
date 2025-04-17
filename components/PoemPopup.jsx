import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PopupParticles from './PopupParticles';

const PoemPopup = ({ poem, onClose, searchTerm }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Empêcher le défilement du body lorsque le popup est ouvert
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Définir isVisible à true après un court délai pour permettre les animations d'entrée
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(timer);
    };
  }, []);

  // Fonction pour gérer la fermeture avec animation
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500); // Attendre la fin de l'animation avant de fermer
  };

  // Fonction pour mettre en surbrillance le texte recherché
  const highlightText = (text) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? <mark key={i} className="bg-[#00FFFF] text-black px-1 rounded">{part}</mark> : part
    );
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
        
        {/* Contenu du popup */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: isVisible ? 1 : 0.9, opacity: isVisible ? 1 : 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-transparent rounded-2xl p-8 max-w-sm w-full mx-4 text-center popup-content"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Particules autour du popup */}
          <PopupParticles isVisible={isVisible} />
          
          <h2 className="text-3xl font-bold mb-3">{highlightText(poem.title)}</h2>
          <div className="text-base text-gray-400 mb-7">
            {poem.author && <span>Par {highlightText(poem.author)}</span>}
            {poem.date && <span className="ml-2">• {poem.date}</span>}
          </div>
          
          <div className="whitespace-pre-line text-gray-200 text-xl poem-text">
            {poem.content.split('\n').map((line, index) => (
              <div key={index} className="mb-3">
                {highlightText(line)}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PoemPopup; 
import { useState, useContext, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PoemsVisibilityContext } from '../pages/_app';

const Poem = ({ poem, searchTerm, onReadMore, isCompact = false, noBorder = false, centered = false }) => {
  const { title, content, author, date, id } = poem;
  const { clickedPoemId, setClickedPoemId } = useContext(PoemsVisibilityContext);
  const poemRef = useRef(null);
  const [poemPosition, setPoemPosition] = useState(null);

  // Diviser le contenu en lignes
  const lines = content.split('\n');
  
  // Obtenir les 4 premières lignes
  const previewLines = lines.slice(0, 4);
  
  // Fonction pour mettre en surbrillance le texte recherché
  const highlightText = (text) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? <mark key={i} className="bg-[#D3D3D3] text-black px-1 rounded">{part}</mark> : part
    );
  };

  // Retrait du contour des boîtes de poèmes
  const cardStyle = "bg-transparent p-4 rounded-lg";

  const textAlignment = centered ? "text-center" : "";

  // Mesurer la position du poème au chargement
  useEffect(() => {
    if (poemRef.current) {
      const rect = poemRef.current.getBoundingClientRect();
      setPoemPosition({
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
        height: rect.height
      });
    }
  }, []);

  // Gérer le clic sur un poème
  const handlePoemClick = () => {
    if (poemPosition) {
      setClickedPoemId(id);
    }
    onReadMore(poem);
  };

  // Déterminer si ce poème doit être visible
  const isVisible = clickedPoemId === null || clickedPoemId === id;

  return (
    <motion.div 
      ref={poemRef}
      className={`${cardStyle} relative ${isCompact ? 'w-full' : 'w-full'} cursor-pointer poem-card poem-card-transition`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={handlePoemClick}
      animate={{
        opacity: isVisible ? 1 : 0,
        height: isVisible ? 'auto' : 0,
        marginTop: isVisible ? undefined : 0,
        marginBottom: isVisible ? undefined : 0,
        padding: isVisible ? '1rem' : 0,
        overflow: 'hidden'
      }}
      style={{ 
        opacity: isVisible ? 1 : 0,
        height: isVisible ? 'auto' : 0,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      {/* Titre du poème */}
      <h3 className={`poetry-title text-2xl font-bold mb-3 ${textAlignment}`}>{highlightText(title)}</h3>
      <div className={`text-sm text-gray-400 mb-3 ${textAlignment}`}>
        {author && <span>{highlightText(author)}</span>}
        {date && <span className="ml-2">• {date}</span>}
      </div>
      
      <div className={`whitespace-pre-line text-gray-200 ${textAlignment}`}>
        {previewLines.map((line, index) => (
          <div key={`preview-${index}`} className="mb-1">
            {highlightText(line)}
          </div>
        ))}
      </div>
      
      {lines.length > 4 && (
        <div className={`mt-3 text-gray-400 ${textAlignment}`}>...</div>
      )}
    </motion.div>
  );
};

export default Poem; 
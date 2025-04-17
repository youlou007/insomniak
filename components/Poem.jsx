import { useState } from 'react';
import { motion } from 'framer-motion';

const Poem = ({ poem, searchTerm, onReadMore, isCompact = false, noBorder = false, centered = false }) => {
  const { title, content, author, date } = poem;

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
      regex.test(part) ? <mark key={i} className="bg-[#00FFFF] text-black px-1 rounded">{part}</mark> : part
    );
  };

  // Retrait du contour des boîtes de poèmes
  const cardStyle = "bg-transparent p-4 rounded-lg";

  const textAlignment = centered ? "text-center" : "";

  return (
    <motion.div 
      className={`${cardStyle} relative ${isCompact ? 'w-full' : 'w-full'} cursor-pointer poem-card`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={() => onReadMore(poem)}
    >
      <h3 className={`text-xl font-semibold mb-2 ${textAlignment}`}>{highlightText(title)}</h3>
      <div className={`text-sm text-gray-400 mb-3 ${textAlignment}`}>
        {author && <span>Par {highlightText(author)}</span>}
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
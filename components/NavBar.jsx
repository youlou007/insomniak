import React, { useRef } from 'react';
import { getAssetPath } from '../utils/assetPrefix';

const NavBar = ({ 
  toggleTheme, 
  theme, 
  isMenuVisible, 
  onMenuToggle, 
  searchTerm, 
  onSearchInput, 
  onSearch,
  onReturnToAllPoems 
}) => {
  const menuRef = useRef(null);
  
  const handleSearch = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchTerm);
    }
  };
  
  return (
    <nav className="relative z-10">
      {/* Bouton de basculement de thème */}
      <button 
        className="theme-toggle-button"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'}
      >
        <img 
          src={getAssetPath("/images/journuit button.png")}
          alt={theme === 'dark' ? 'Mode jour' : 'Mode nuit'}
          width={60}
          height={60}
          className={`w-16 h-16 object-contain ${theme === 'dark' ? 'opacity-100' : 'opacity-50 rotate-180'}`}
          style={{ 
            filter: theme === 'dark' ? 'none' : 'invert(0.8) hue-rotate(180deg)', 
            transition: 'all 0.3s ease' 
          }}
        />
      </button>
      
      {/* Bouton hamburger pour recherche */}
      <div className="fixed right-0 top-4 z-50 mr-4">
        <button 
          className="w-16 h-16 relative focus:outline-none"
          onClick={onMenuToggle}
          aria-label="Menu"
        >
          <img 
            src={getAssetPath("/images/hamburger button.png")}
            alt="Menu"
            className="w-16 h-16 object-contain"
          />
        </button>
        
        {/* Le menu déroulant est toujours dans le DOM, mais avec la classe hidden si nécessaire */}
        <div 
          ref={menuRef} 
          className={`navbar-menu absolute right-0 top-16 bg-opacity-90 p-4 rounded-lg shadow-lg w-64 ${isMenuVisible ? '' : 'hidden'}`}
          style={{ 
            backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            display: isMenuVisible ? 'block' : 'none' 
          }}
        >
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Rechercher un poème..."
              value={searchTerm}
              onChange={onSearchInput}
              onKeyDown={handleSearch}
              className="w-full border rounded-lg py-2 pl-4 pr-10 search-input"
            />
            {searchTerm && (
              <button 
                onClick={onReturnToAllPoems}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <img 
                  src={getAssetPath("/images/return button.png")}
                  alt="Retour"
                  className="w-6 h-6 object-contain"
                />
              </button>
            )}
            {!searchTerm && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <img 
                  src={getAssetPath("/images/loupe barre de recherche.png")}
                  alt="Rechercher"
                  className="w-6 h-6 object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 
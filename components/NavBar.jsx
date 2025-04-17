import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

const NavBar = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 bg-black bg-opacity-90 z-50 py-2 px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Yacine et ces nuits</h1>
        
        <button 
          className="w-10 h-10 relative focus:outline-none"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <Image 
            src="/images/hamburger button.png" 
            alt="Menu"
            width={40} 
            height={40} 
            className="object-contain"
          />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Rechercher un poème..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-bar w-full bg-transparent border border-gray-500 border-opacity-15 rounded-lg py-2 pl-4 pr-10 text-white text-opacity-90 backdrop-blur-sm shadow-none transition-all duration-300 hover:border-opacity-25 focus:border-opacity-40 focus:outline-none"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Image 
                    src="/images/loupe barre de recherche.png" 
                    alt="Rechercher"
                    width={24} 
                    height={24} 
                    className="object-contain"
                  />
                </button>
              </div>
            </form>
            
            <nav className="mt-4 flex space-x-4 justify-center">
              <a href="#" className="flex flex-col items-center">
                <Image 
                  src="/images/home button.png" 
                  alt="Accueil"
                  width={24} 
                  height={24}
                  className="object-contain" 
                />
                <span className="text-xs mt-1">Accueil</span>
              </a>
              <a href="#" className="flex flex-col items-center">
                <Image 
                  src="/images/profile user.png" 
                  alt="Profil"
                  width={24} 
                  height={24}
                  className="object-contain"
                />
                <span className="text-xs mt-1">Profil</span>
              </a>
              <a href="#" className="flex flex-col items-center">
                <Image 
                  src="/images/settings button.png" 
                  alt="Paramètres"
                  width={24} 
                  height={24}
                  className="object-contain"
                />
                <span className="text-xs mt-1">Paramètres</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar; 
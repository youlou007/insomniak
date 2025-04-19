import { useState, useEffect, useRef, useContext } from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import Particles from '../components/Particles';
import Poem from '../components/Poem';
import PoemPopup from '../components/PoemPopup';
import Image from 'next/image';
import { ThemeContext } from './_app';
import { getAssetPath } from '../utils/assetPrefix';

export default function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [poems, setPoems] = useState([]);
  const [selectedPoem, setSelectedPoem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const originalPoemsRef = useRef([]);
  const menuRef = useRef(null);

  // Fonction pour détecter et adapter à la version mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Vérifier au chargement
    checkIfMobile();
    
    // Vérifier à chaque redimensionnement
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Chargement initial des poèmes
  useEffect(() => {
    fetchPoems();
  }, []);

  const fetchPoems = async (query = '') => {
    setIsLoading(true);
    
    try {
      // Utiliser l'API pour charger les poèmes en tenant compte du basePath
      const basePath = process.env.NODE_ENV === 'production' ? '/insomniak' : '';
      const apiUrl = query 
        ? `${basePath}/api/poems?query=${encodeURIComponent(query)}` 
        : `${basePath}/api/poems`;
        
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des poèmes');
      }
      
      const data = await response.json();
      
      if (!query) {
        originalPoemsRef.current = data;
      }
      
      setPoems(data);
    } catch (error) {
      console.error("Erreur:", error);
      // En cas d'erreur, afficher au moins quelques poèmes par défaut pour éviter une page vide
      setPoems([
        {
          id: 1,
          title: "Erreur de chargement",
          author: "Yacine",
          date: "10 janvier 2024",
          content: "Impossible de charger les poèmes depuis l'API.\nVeuillez réessayer plus tard."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de recherche
  const handleSearch = (query) => {
    setSearchTerm(query);
    fetchPoems(query);
  };

  // Gestion de la saisie de recherche
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchPoems(value);
  }

  // Fonction pour ouvrir le popup d'un poème
  const handleOpenPoem = (poem) => {
    setSelectedPoem(poem);
  };

  // Fonction pour fermer le popup
  const handleClosePoem = () => {
    setSelectedPoem(null);
  };

  // Fonction pour retourner à tous les poèmes
  const handleReturnToAllPoems = () => {
    setSearchTerm('');
    setPoems(originalPoemsRef.current);
    closeSearchMenu();
  };

  // Séparer les poèmes pour l'affichage spécial
  const featuredPoems = poems.slice(0, 2);
  const regularPoems = poems.slice(2);

  // Fonction pour ouvrir le menu de recherche
  const openSearchMenu = () => {
    setIsMenuVisible(true);
    setIsSearching(true);
  };
  
  // Fonction pour fermer le menu de recherche et réinitialiser la recherche
  const closeSearchMenu = () => {
    setIsMenuVisible(false);
    setIsSearching(false);
    
    // Réinitialiser la recherche si un terme est présent
    if (searchTerm) {
      setSearchTerm('');
      setPoems(originalPoemsRef.current);
    }
  };
  
  // Fonction pour gérer le clic sur le menu hamburger
  const handleHamburgerClick = () => {
    if (isMenuVisible) {
      closeSearchMenu();
    } else {
      openSearchMenu();
    }
  };

  // Fonction pour calculer la hauteur du conteneur de la main en fonction du type d'appareil
  const getHandContainerStyle = () => {
    if (isMobile) {
      return {
        width: '100%',
        maxWidth: '1500px',
        height: isMobile ? '800px' : '1300px',
        marginTop: isMobile ? '-100px' : '0'
      };
    }
    return {
      width: '100%',
      maxWidth: '1500px',
      height: '1300px'
    };
  };

  // Fonction pour organiser les poèmes différemment selon le format d'écran
  const renderPoems = () => {
    if (isMobile) {
      // En mobile, afficher tous les poèmes sous la main
      return (
        <>
          {/* Image de la main seule */}
          <div className="w-full relative">
            <div 
              className="relative mx-auto" 
              style={getHandContainerStyle()}
            >
              <img
                src={getAssetPath("/images/title hand.png")}
                alt="Main"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* Tous les poèmes sous la main en une seule colonne */}
          <div className="w-full mt-4">
            <div className="grid grid-cols-1 gap-6 mx-auto">
              {poems.map((poem) => (
                <div key={poem.id} className="w-[300px] mx-auto">
                  <Poem 
                    poem={poem} 
                    searchTerm={searchTerm} 
                    onReadMore={handleOpenPoem}
                    noBorder={true}
                    centered={true}
                    isCompact={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } else {
      // En desktop, garder l'affichage original avec les poèmes de part et d'autre de la main
      return (
        <>
          {/* Image de la main et poèmes */}
          <div className="w-full relative">
            <div 
              className="relative mx-auto" 
              style={getHandContainerStyle()}
            >
              <img
                src={getAssetPath("/images/title hand.png")}
                alt="Main"
                className="w-full h-full object-contain"
              />
              
              {/* Poèmes de part et d'autre de la main */}
              <div className="absolute left-[-0px] bottom-[200px] w-[300px]">
                {featuredPoems[0] && (
                  <Poem 
                    poem={featuredPoems[0]} 
                    searchTerm={searchTerm} 
                    onReadMore={handleOpenPoem}
                    isCompact={true}
                    noBorder={true}
                    centered={true}
                  />
                )}
              </div>
              
              <div className="absolute right-[-0px] bottom-[200px] w-[300px]">
                {featuredPoems[1] && (
                  <Poem 
                    poem={featuredPoems[1]} 
                    searchTerm={searchTerm} 
                    onReadMore={handleOpenPoem}
                    isCompact={true}
                    noBorder={true}
                    centered={true}
                  />
                )}
              </div>
            </div>
          </div>
          
          {/* Poèmes réguliers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-auto my-24">
            {regularPoems.map((poem) => (
              <div key={poem.id} className="w-[300px] mx-auto">
                <Poem 
                  poem={poem} 
                  searchTerm={searchTerm} 
                  onReadMore={handleOpenPoem}
                  noBorder={true}
                  centered={true}
                />
              </div>
            ))}
          </div>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Yacine, pensées nocturnes - Poèmes</title>
        <meta name="description" content="Collection de poèmes de Yacine" />
        <link rel="icon" href={getAssetPath("/favicon.ico")} />
      </Head>

      <Particles />
      
      {/* Bouton de basculement de thème */}
      <button 
        className="theme-toggle-button fixed top-4 left-4 z-50"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'}
      >
        <img 
          src={getAssetPath("/images/journuit button.png")}
          alt={theme === 'dark' ? 'Mode jour' : 'Mode nuit'}
          width={60}
          height={60}
          className="w-16 h-16 object-contain"
        />
      </button>
      
      <div className="relative z-10 flex-grow flex flex-col min-h-screen">
        <div className="fixed right-0 top-4 z-50 mr-4">
          <button 
            className="w-16 h-16 relative focus:outline-none"
            onClick={handleHamburgerClick}
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
                onChange={handleSearchInput}
                className="w-full border rounded-lg py-2 pl-4 pr-10 search-input"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                  color: theme === 'dark' ? '#fff' : '#000'
                }}
              />
              {searchTerm && (
                <button 
                  onClick={handleReturnToAllPoems}
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
        
        <main className="pt-10 max-w-7xl mx-auto px-4 flex-grow">
          {isLoading ? (
            <div className="text-center py-12 flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
          ) : poems.length > 0 ? (
            <>
              {/* Section avec le titre et la main */}
              <div className="flex flex-col justify-start items-center relative pt-10">
                {/* Titre séparé de l'image de la main */}
                <div className="w-full text-center mb-8">
                  <h1 className={`font-bold ${isMobile ? 'text-4xl md:text-6xl' : 'text-8xl'}`}>
                    Yacine - L'encre des insomnies
                  </h1>
                </div>
                
                {/* Affichage des poèmes selon la version (mobile ou desktop) */}
                {renderPoems()}
              </div>
            </>
          ) : (
            <div className="text-center py-12 min-h-[500px] flex items-center justify-center">
              <div>
                <h1 className="text-4xl mb-4">Aucun poème trouvé</h1>
                {searchTerm ? (
                  <p className="text-xl">Aucun résultat pour "{searchTerm}"</p>
                ) : (
                  <p className="text-xl">Impossible de charger les poèmes.</p>
                )}
                <button 
                  onClick={handleReturnToAllPoems}
                  className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300"
                >
                  Retour à tous les poèmes
                </button>
              </div>
            </div>
          )}
        </main>
        
        <footer className="py-6 text-center mt-auto">
          <p>© {new Date().getFullYear()} L'encre des insomnies Tous droits réservés (c'est a moi).</p>
        </footer>
      </div>
      
      {/* Popup pour afficher le poème complet */}
      {selectedPoem && (
        <PoemPopup poem={selectedPoem} onClose={handleClosePoem} searchTerm={searchTerm} />
      )}
    </div>
  );
} 
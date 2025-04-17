import { useState, useEffect, useRef, useContext } from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import Particles from '../components/Particles';
import Poem from '../components/Poem';
import PoemPopup from '../components/PoemPopup';
import Image from 'next/image';
import { ThemeContext } from './_app';

export default function Home() {
  const [poems, setPoems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPoem, setSelectedPoem] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const originalPoemsRef = useRef([]);
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Cliquer en dehors de la recherche pour la fermer
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target) && isSearching) {
        // Clic détecté en dehors de la zone de recherche
        if (!event.target.closest('.navbar-menu') && !event.target.closest('[aria-label="Menu"]')) {
          setIsSearching(false);
          if (!searchTerm) {
            // Si la recherche est vide, on restaure tous les poèmes
            setPoems(originalPoemsRef.current);
          }
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearching, searchTerm]);

  // Charger les poèmes au chargement de la page
  useEffect(() => {
    fetchPoems();
  }, []);

  // Fonction pour récupérer les poèmes (avec ou sans recherche)
  const fetchPoems = async (query = '') => {
    setIsLoading(true);
    try {
      const url = query ? `/api/poems?query=${encodeURIComponent(query)}` : '/api/poems';
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des poèmes');
      }
      
      const data = await response.json();
      setPoems(data);
      
      // Stocker les poèmes originaux pour pouvoir y revenir
      if (!query) {
        originalPoemsRef.current = data;
      }
    } catch (error) {
      console.error("Erreur:", error);
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
    setIsSearching(false);
    setPoems(originalPoemsRef.current);
  };

  // Séparer les poèmes pour l'affichage spécial
  const featuredPoems = poems.slice(0, 2);
  const regularPoems = poems.slice(2);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Yacine, pensées nocturnes - Poèmes</title>
        <meta name="description" content="Collection de poèmes de Yacine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Particles />
      
      {/* Bouton de basculement de thème */}
      <button 
        className="theme-toggle-button"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'}
      >
        <img 
          src="/images/journuit button.png" 
          alt={theme === 'dark' ? 'Mode jour' : 'Mode nuit'}
          width={60}
          height={60}
          className="w-16 h-16 object-contain"
        />
      </button>
      
      <div className="relative z-10">
        <div className="fixed right-0 top-4 z-50 mr-4">
          <button 
            className="w-16 h-16 relative focus:outline-none"
            onClick={() => {
              setIsSearching(!isSearching);
              document.querySelector('.navbar-menu').classList.toggle('hidden');
            }}
            aria-label="Menu"
          >
            <img 
              src="/images/hamburger button.png" 
              alt="Menu"
              className="w-16 h-16 object-contain"
            />
          </button>
          <div ref={searchRef} className="navbar-menu hidden absolute right-0 top-16 bg-opacity-90 p-4 rounded-lg shadow-lg w-64">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Rechercher un poème..."
                value={searchTerm}
                onChange={handleSearchInput}
                className="w-full border rounded-lg py-2 pl-4 pr-10 search-input"
              />
              {searchTerm && (
                <button 
                  onClick={handleReturnToAllPoems}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <img 
                    src="/images/return button.png" 
                    alt="Retour"
                    className="w-6 h-6 object-contain"
                  />
                </button>
              )}
              {!searchTerm && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <img 
                    src="/images/loupe barre de recherche.png" 
                    alt="Rechercher"
                    className="w-6 h-6 object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <main className="pt-10 max-w-7xl mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">Chargement...</div>
          ) : poems.length > 0 ? (
            <>
              {/* Section avec le titre et la main */}
              <div className="min-h-screen flex flex-col justify-start items-center relative pt-10">
                {/* Titre séparé de l'image de la main */}
                <div className="w-full text-center mb-0">
                  <h1 className="text-8xl font-bold font-blocky">Yacine - L'encre des insomnie</h1>
                </div>
                
                {/* Image de la main et poèmes */}
                <div className="w-full relative">
                  <div className="relative mx-auto" style={{ width: '100%', maxWidth: '1500px', height: '1300px' }}>
                    <img
                      src="/images/title hand.png"
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
          ) : (
            <div className="text-center py-12">
              {searchTerm ? `Aucun poème trouvé pour "${searchTerm}"` : "Aucun poème disponible"}
            </div>
          )}
        </main>
        
        <footer className="py-6 text-center">
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
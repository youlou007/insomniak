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

  // Données des poèmes directement intégrées (plutôt que de les charger via l'API)
  const poemsData = [
    {
      id: 1,
      title: "Le Clair de Lune",
      author: "Yacine",
      date: "10 janvier 2024",
      content: "La lune éclaire mes nuits\nComme un phare dans l'obscurité\nGuide mes pas silencieux\nVers l'horizon infini\nJe marche seul dans la nuit\nBercé par sa douce lueur\nQui apaise mon âme inquiète\nEt calme mes pensées agitées"
    },
    {
      id: 2,
      title: "L'Écho du Silence",
      author: "Yacine",
      date: "15 février 2024",
      content: "Dans le silence de l'aube\nJ'entends l'écho de ton nom\nQui résonne comme une prière\nDans les recoins de mon âme\nLes mots se perdent et s'envolent\nMais ton souvenir demeure\nComme une empreinte indélébile\nSur le sable de ma mémoire"
    },
    {
      id: 3,
      title: "Les Saisons du Cœur",
      author: "Yacine",
      date: "3 mars 2024",
      content: "Mon cœur connaît ses saisons\nComme la terre ses révolutions\nL'hiver de la solitude\nLe printemps de l'espérance\nL'été de la passion brûlante\nL'automne de la sagesse\nChaque battement raconte\nUne histoire sans fin"
    },
    {
      id: 4,
      title: "Fragments d'Éternité",
      author: "Yacine",
      date: "20 avril 2024",
      content: "Nous ne sommes que fragments\nD'une éternité qui nous dépasse\nPoussières d'étoiles en mouvement\nDans l'immensité de l'espace\nNos vies sont des instants fugaces\nDes clins d'œil à l'infini\nDes notes dans la symphonie\nDu grand orchestre cosmique"
    },
    {
      id: 5,
      title: "Rivages",
      author: "Yacine",
      date: "5 mai 2024",
      content: "Sur le rivage de tes yeux\nJe contemple l'océan\nDe tout ce que nous pourrions être\nDe tout ce que nous ne serons pas\nLes vagues de tes émotions\nViennent s'échouer sur mon cœur\nLaissant des traces éphémères\nQue la marée du temps efface\nSur le rivage de tes yeux\nJe contemple l'océan\nDe tout ce que nous pourrions être\nDe tout ce que nous ne serons pas\nLes vagues de tes émotions\nViennent s'échouer sur mon cœur\nLaissant des traces éphémères\nQue la marée du temps efface\nSur le rivage de tes yeux\nJe contemple l'océan\nDe tout ce que nous pourrions être\nDe tout ce que nous ne serons pas\nLes vagues de tes émotions\nViennent s'échouer sur mon cœur\nLaissant des traces éphémères\nQue la marée du temps efface"
    }
  ];

  // Chargement initial des poèmes
  useEffect(() => {
    fetchPoems();
  }, []);

  const fetchPoems = async (query = '') => {
    setIsLoading(true);
    
    try {
      // Filtrer les poèmes en fonction de la recherche
      if (query) {
        const searchTermLower = query.toLowerCase();
        const filtered = poemsData.filter(poem => 
          poem.title.toLowerCase().includes(searchTermLower) || 
          poem.content.toLowerCase().includes(searchTermLower) ||
          (poem.author && poem.author.toLowerCase().includes(searchTermLower))
        );
        setPoems(filtered);
      } else {
        setPoems(poemsData);
        originalPoemsRef.current = poemsData;
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
        className="theme-toggle-button"
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
            <div className="text-center py-12">Chargement...</div>
          ) : poems.length > 0 ? (
            <>
              {/* Section avec le titre et la main */}
              <div className="min-h-screen flex flex-col justify-start items-center relative pt-10">
                {/* Titre séparé de l'image de la main */}
                <div className="w-full text-center mb-0">
                  <h1 className={`font-bold font-blocky ${isMobile ? 'text-4xl md:text-6xl' : 'text-8xl'}`}>
                    Yacine - L'encre des insomnies
                  </h1>
                </div>
                
                {/* Affichage des poèmes selon la version (mobile ou desktop) */}
                {renderPoems()}
              </div>
            </>
          ) : (
            <div className="text-center py-12 min-h-[500px]">
              {searchTerm ? `Aucun poème trouvé pour "${searchTerm}"` : "Aucun poème disponible"}
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
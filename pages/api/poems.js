// Données d'exemple pour les poèmes
const poems = [
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
    content: "Sur le rivage de tes yeux\nJe contemple l'océan\nDe tout ce que nous pourrions être\nDe tout ce que nous ne serons pas\nLes vagues de tes émotions\nViennent s'échouer sur mon cœur\nLaissant des traces éphémères\nQue la marée du temps efface"
  }
];

export default function handler(req, res) {
  const { query } = req.query;
  
  if (query) {
    const searchTerm = query.toLowerCase();
    const filteredPoems = poems.filter(poem => 
      poem.title.toLowerCase().includes(searchTerm) || 
      poem.content.toLowerCase().includes(searchTerm) ||
      (poem.author && poem.author.toLowerCase().includes(searchTerm))
    );
    return res.status(200).json(filteredPoems);
  }
  
  res.status(200).json(poems);
} 
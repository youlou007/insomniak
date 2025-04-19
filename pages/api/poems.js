// Données d'exemple pour les poèmes
const poems = [
  {
    id: 1,
    title: "Fleurter",
    author: "Yacine",
    date: "10 janvier 2024",
    content: "Lorsque l'amour est frivole\nLorsque les mots s'envolent\nLa douceur de ces lèvres\nSes paroles sont d'orfèvre\n\nLégère est sa beauté\nComme lourd est mon cœur\nNe pouvant lui avouer\nMe consume la peur\n\nUn lien si fragile\nPour de si belles paroles\nDes mots je suis peut-être agile\nC'est pour toi que mon amour s'envole"
  },
  {
    id: 2,
    title: "Faux Souvenir",
    author: "Yacine",
    date: "15 février 2024",
    content: "C'est à jamais que je te grave\nDans les tréfonds de ma mémoire\nMes pensées tu accapares\nDu matin jusqu'au soir\n\nLorsqu'à mon cœur vient ta pensée\nLes émotions commencent à me dépasser\nJamais de mon cœur je ne pourrais t'effacer\n\nEn ces quelques phrases pleines de maladresses\nJe t'adresse toute ma tendresse\nTe témoignant ainsi mon amour\nCar c'est toi que j'aimerais pour toujours."
  },
  {
    id: 3,
    title: "Accaparant",
    author: "Yacine",
    date: "3 mars 2024",
    content: "Accaparant mon esprit\nSon parfum enivrant\nJ'en rêve toute la nuit\nMon esprit se ment\n\nTrouble devient ma vue\nCe n'est qu'elle que je vois\nTout ce que je passe en revue\nD'elle mon cœur aboie\n\nSaurais-je élever mes mots \nEt non pas ma voix \nVoudrais-tu cet anneau \nCar je n'aime que toi"
  },
  {
    id: 4,
    title: "Clair noirceur",
    author: "Yacine",
    date: "20 avril 2024",
    content: "Lorsqu'à la lumière de ses yeux\nMes craintes crament\nQuand la clarté de son cœur\nBouscule la noirceur de mon âme\n\nPerdu sur ce doux chemin\nRêvant parfois d'effleurer tes mains\nMe serrant contre toi\nM'imprégnant de ton doux parfum\n\nUne plume manquant de finesse\nJ'agence ces mots de manière grotesque\nDe côté, ton sourire, j'admire\nNe te regardant pas par peur de te nuire\n\nMon cœur t'adressant ces mots\nSe jouant des limites des interdits\nT'aimant malgré les maux\nSans peur de chuter dans l'infini\n\nCelui de mes sentiments\nBien que le canevas soit noir\nMa plume est immaculée de blanc\nUn sentiment sans pouvoir le voir\n\nComme porté par le vent\nJ'aimerais parfois le crier\nMon âme brûle\nUne flamme s'éveille\n\nFaible pourtant cinglante\nGrandissant par battements\nHier d'amour aujourd'hui sanglante\nMaintenant au chaud ce froid volcan\n\nPenché à son sommet\nSous ce doux ciel étoilé\nDes sentiments tels un phare\nMon cœur s'apaise car\n\nAu clair de ses yeux\nJe lui offre mon âme"
  },
  {
    id: 5,
    title: "Perpétuel",
    author: "Yacine",
    date: "5 mai 2024",
    content: "On a un pouvoir\nCelui d'aimer quelqu'un\nMême si on ne peut se voir\nEn vérité on ne fait qu'un\n\nEn quête d'expression de mes sentiments ,\nTe dire tout ce que je ressens\nPour toi je ressens cette chose,\nQui me métamorphose.\n\nCette perception inexplicable,\nC'est mon amour inébranlable.\nQui transforme mon coeur,\nEn y ajoutant une touche de douceur\n\nSi je venais un jour à mourir\nJe ne te dirais pas je t'aime\nAinsi ce regret infini\nM'attachera à cette vie\nEt ces liens ne pouvant être défaits\nUne part de moi restera à tes côtés"
  },
  {
    id: 6,
    title: "Douce souffrance",
    author: "Yacine",
    date: "12 juin 2024",
    content: "Lorsqu'une parure\nAmpute les mots\nOn apprécie ces blessures\nQuitte à se voir en lambeaux\n\nUne étincelle un pincement\nUn rêve qui s'allonge\nUne réalité freinant calmement\nSurréel tel un songe\n\nUne perfection sans pareil\nUne finesse qui m'émerveille\nMacule ne pouvant l'altérer\nMon cœur en frôle l'arrêt\n\nLe battement d'aile\nQu'est son toucher\nJe ne veux que d'elle\nPour une éternité\n\nAinsi les mots altérant ce charme\nProvoquant en mon cœur ces larmes\nAlimentant le fleuve de mon amour\nCar c'est toi que j'aimerais pour toujours"
  },
  {
    id: 7,
    title: "Lumière noir",
    author: "Yacine",
    date: "20 juillet 2024",
    content: "À tous ces moments clairs\nPassés dans le noir\nUn amour comme l'air\nExistant sans que l'on puisse le voir\n\nÉtant de ces fleurs\nPoussant sans lumières\nSous le soleil je meurs\nNon sans une dernière prière\n\nUn court vœu d'amour\nDont la grâce est éternelle\nInvisible il demeure pour toujours\nBrillant si fort pourtant si frêle"
  },
  {
    id: 8,
    title: "Désir",
    author: "Yacine",
    date: "5 août 2024",
    content: "On a un pouvoir\nCelui d'aimer quelqu'un\nMême si on ne peut se voir\nEn vérité on ne fait qu'un\n\nComment t'avouer mes sentiments,\nTe dire tout ce que pour toi je ressens\nNe pouvant nommer cette chose,\nQui en moi se métamorphose.\n\nCette chose inexplicable,\nC'est mon amour inébranlable.\nIl métamorphose mon cœur,\nEn y ajoutant une touche de douceur"
  },
  {
    id: 9,
    title: "Flétrir",
    author: "Yacine",
    date: "15 septembre 2024",
    content: "La chaleur d'un sourire\nLa froideur de mon âme\nAucune crainte de mourir\nSur les nuages je plane\n\nAu loin les fleurs fanent\n\nDe leurs orgueils\nIls se pavanent\nDe leurs cercueils\nElles émanent\n\nAu loin les fleurs fanent\n\nNoirci par les années\nFinissant par s'endurcir\nSon temps est écoulé\nSans jamais qu'il ne puisse fuir"
  },
  {
    id: 10,
    title: "Antithétique",
    author: "Yacine",
    date: "8 octobre 2024",
    content: "Si je t'aime comme je pleure\nEt te déteste comme je ris \nDe mon amour tu aurais peur \nDe ton soleil je serais la pluie"
  },
  {
    id: 11,
    title: "Moi",
    author: "Yacine",
    date: "22 octobre 2024",
    content: "Même sans gravité\nDe toi je tomberais amoureux\nChaud comme l'été\nPourtant il sonne creux\n\nPrêt à se briser\nD'une coquille il s'est protégé\nUn amour une peur\nJe parle bien sûr de mon cœur"
  },
  {
    id: 12,
    title: "Prière",
    author: "Yacine",
    date: "30 octobre 2024",
    content: "Qu'est-ce que le roi de la terre\nS'il ne peut aimer\nQu'est-ce que le roi de la mer\nS'il ne peut prier\n\nPourquoi m'aimes-tu\nQuels sont ces sentiments accrus\nCe diamant soudainement mis à nu\nQuel est la raison de leurs venue\n\nIl n'y a que pour haïr\nQu'il faut une raison\nDe ton amour ai-je peur de mourir\nHésitant parfois j'affirme la négation\n\nAlors avance ne te retourne pas\nPour se remplir la panse\nIls feront de toi leur roi\n\nEt c'est seulement lorsque tu le verras\nCelui qui marchera devant toi\nSans aucune raison par simple amour par passion\nRêvant de te faire reine de sa nation\n\nRegarde-le dans les yeux\nN'est-il pas beau comme les cieux\nPrends-lui la main\nCar c'est ton destin"
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
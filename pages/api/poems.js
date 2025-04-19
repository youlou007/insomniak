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
    date: "15 janvier 2024",
    content: "C'est à jamais que je te grave\nDans les tréfonds de ma mémoire\nMes pensées tu accapares\nDu matin jusqu'au soir\n\nLorsqu'à mon cœur vient ta pensée\nLes émotions commencent à me dépasser\nJamais de mon cœur je ne pourrais t'effacer\n\nEn ces quelques phrases pleines de maladresses\nJe t'adresse toute ma tendresse\nTe témoignant ainsi mon amour\nCar c'est toi que j'aimerais pour toujours."
  },
  {
    id: 3,
    title: "Accaparant",
    author: "Yacine",
    date: "20 janvier 2024",
    content: "Accaparant mon esprit\nSon parfum enivrant\nJ'en rêve toute la nuit\nMon esprit se ment\n\nTrouble devient ma vue\nCe n'est qu'elle que je vois\nTout ce que je passe en revue\nD'elle mon cœur aboie\n\nSaurais-je élever mes mots \nEt non pas ma voix \nVoudrais-tu cet anneau \nCar je n'aime que toi"
  },
  {
    id: 4,
    title: "Clair noirceur",
    author: "Yacine",
    date: "25 janvier 2024",
    content: "Lorsqu'à la lumière de ses yeux\nMes craintes crament\nQuand la clarté de son cœur\nBouscule la noirceur de mon âme\n\nPerdu sur ce doux chemin\nRêvant parfois d'effleurer tes mains\nMe serrant contre toi\nM'imprégnant de ton doux parfum\n\nUne plume manquant de finesse\nJ'agence ces mots de manière grotesque\nDe côté, ton sourire, j'admire\nNe te regardant pas par peur de te nuire\n\nMon cœur t'adressant ces mots\nSe jouant des limites des interdits\nT'aimant malgré les maux\nSans peur de chuter dans l'infini\n\nCelui de mes sentiments\nBien que le canevas soit noir\nMa plume est immaculée de blanc\nUn sentiment sans pouvoir le voir\n\nComme porté par le vent\nJ'aimerais parfois le crier\nMon âme brûle\nUne flamme s'éveille\n\nFaible pourtant cinglante\nGrandissant par battements\nHier d'amour aujourd'hui sanglante\nMaintenant au chaud ce froid volcan\n\nPenché à son sommet\nSous ce doux ciel étoilé\nDes sentiments tels un phare\nMon cœur s'apaise car\n\nAu clair de ses yeux\nJe lui offre mon âme"
  },
  {
    id: 5,
    title: "Perpétuel",
    author: "Yacine",
    date: "30 janvier 2024",
    content: "On a un pouvoir\nCelui d'aimer quelqu'un\nMême si on ne peut se voir\nEn vérité on ne fait qu'un\n\nEn quête d'expression de mes sentiments ,\nTe dire tout ce que je ressens\nPour toi je ressens cette chose,\nQui me métamorphose.\n\nCette perception inexplicable,\nC'est mon amour inébranlable.\nQui transforme mon coeur,\nEn y ajoutant une touche de douceur\n\nSi je venais un jour à mourir\nJe ne te dirais pas je t'aime\nAinsi ce regret infini\nM'attachera à cette vie\nEt ces liens ne pouvant être défaits\nUne part de moi restera à tes côtés"
  },
  {
    id: 6,
    title: "Douce souffrance",
    author: "Yacine",
    date: "5 février 2024",
    content: "Lorsqu'une parure\nAmpute les mots\nOn apprécie ces blessures\nQuitte à se voir en lambeaux\n\nUne étincelle un pincement\nUn rêve qui s'allonge\nUne réalité freinant calmement\nSurréel tel un songe\n\nUne perfection sans pareil\nUne finesse qui m'émerveille\nMacule ne pouvant l'altérer\nMon cœur en frôle l'arrêt\n\nLe battement d'aile\nQu'est son toucher\nJe ne veux que d'elle\nPour une éternité\n\nAinsi les mots altérant ce charme\nProvoquant en mon cœur ces larmes\nAlimentant le fleuve de mon amour\nCar c'est toi que j'aimerais pour toujours"
  },
  {
    id: 7,
    title: "Lumière noir",
    author: "Yacine",
    date: "10 février 2024",
    content: "À tous ces moments clairs\nPassés dans le noir\nUn amour comme l'air\nExistant sans que l'on puisse le voir\n\nÉtant de ces fleurs\nPoussant sans lumières\nSous le soleil je meurs\nNon sans une dernière prière\n\nUn court vœu d'amour\nDont la grâce est éternelle\nInvisible il demeure pour toujours\nBrillant si fort pourtant si frêle"
  },
  {
    id: 8,
    title: "Désir",
    author: "Yacine",
    date: "15 février 2024",
    content: "On a un pouvoir\nCelui d'aimer quelqu'un\nMême si on ne peut se voir\nEn vérité on ne fait qu'un\n\nComment t'avouer mes sentiments,\nTe dire tout ce que pour toi je ressens\nNe pouvant nommer cette chose,\nQui en moi se métamorphose.\n\nCette chose inexplicable,\nC'est mon amour inébranlable.\nIl métamorphose mon cœur,\nEn y ajoutant une touche de douceur"
  },
  {
    id: 9,
    title: "Flétrir",
    author: "Yacine",
    date: "20 février 2024",
    content: "La chaleur d'un sourire\nLa froideur de mon âme\nAucune crainte de mourir\nSur les nuages je plane\n\nAu loin les fleurs fanent\n\nDe leurs orgueils\nIls se pavanent\nDe leurs cercueils\nElles émanent\n\nAu loin les fleurs fanent\n\nNoirci par les années\nFinissant par s'endurcir\nSon temps est écoulé\nSans jamais qu'il ne puisse fuir"
  },
  {
    id: 10,
    title: "Antithétique",
    author: "Yacine",
    date: "25 février 2024",
    content: "Si je t'aime comme je pleure\nEt te déteste comme je ris \nDe mon amour tu aurais peur \nDe ton soleil je serais la pluie"
  },
  {
    id: 11,
    title: "Moi",
    author: "Yacine",
    date: "1 mars 2024",
    content: "Même sans gravité\nDe toi je tomberais amoureux\nChaud comme l'été\nPourtant il sonne creux\n\nPrêt à se briser\nD'une coquille il s'est protégé\nUn amour une peur\nJe parle bien sûr de mon cœur"
  },
  {
    id: 12,
    title: "Prière",
    author: "Yacine",
    date: "5 mars 2024",
    content: "Qu'est-ce que le roi de la terre\nS'il ne peut aimer\nQu'est-ce que le roi de la mer\nS'il ne peut prier\n\nPourquoi m'aimes-tu\nQuels sont ces sentiments accrus\nCe diamant soudainement mis à nu\nQuel est la raison de leurs venue\n\nIl n'y a que pour haïr\nQu'il faut une raison\nDe ton amour ai-je peur de mourir\nHésitant parfois j'affirme la négation\n\nAlors avance ne te retourne pas\nPour se remplir la panse\nIls feront de toi leur roi\n\nEt c'est seulement lorsque tu le verras\nCelui qui marchera devant toi\nSans aucune raison par simple amour par passion\nRêvant de te faire reine de sa nation\n\nRegarde-le dans les yeux\nN'est-il pas beau comme les cieux\nPrends-lui la main\nCar c'est ton destin"
  },
  {
    id: 13,
    title: "Calvaire",
    author: "Yacine",
    date: "10 mars 2024",
    content: "Mon être tout entier\nSe mettant alors à trembler\nMon âme sur le point d'imploser\nD'un simple toucher en moi remonte un passé\nLointain mais précieux\nLe prenant avec moi\nJusqu'haut dans les cieux\nLaissant des mois et des mois\nPassés errant la nuit dans le froid\nDes moments de tristesse\nComme de joie"
  },
  {
    id: 14,
    title: "Tourment",
    author: "Yacine",
    date: "15 mars 2024",
    content: "Regarder le vide\nFaire passer le temps\nRêvant qu'un jour\nViendra mon moment\n\nD'argent avide\nFroid devient le sang\nSans plus d'amour\nC'est une perte de temps\n\nToutes ces secondes\nNe sont que passagères\nLe son n'est qu'une onde\nQui fait vibrer l'air\nSerais-tu l'ombre\nFaisant vibrer mon être\n\nPar devoir ou par passion\nDemeurer dans l'action\nLe temps tel une fraction\nCourent-ils tous à leur perdition\n\nA quoi bon vouloir tout posséder\nLorsque le cœur lui demeure enfermé"
  },
  {
    id: 15,
    title: "Eclipse",
    author: "Yacine",
    date: "20 mars 2024",
    content: "Le soir j'ai des conversations avec la lune\nElle me parle du soleil\nEt je lui parle d'elle\nMais la lune n'aura jamais le soleil\nEt je ne l'aurai jamais, Elle"
  },
  {
    id: 16,
    title: "Mépris",
    author: "Yacine",
    date: "25 mars 2024",
    content: "A mes yeux tu n'es qu'iridescence\nQue faire de cette condescendance \nDont je ne peux me défaire \nSon regard me liant par le fer\n\nLoin d'elle j'aimerais fuir \nMon âme semble se débattre \nCes yeux me faisant cuire \nSon charme semble vouloir m'abattre"
  },
  {
    id: 17,
    title: "Vide",
    author: "Yacine",
    date: "1 avril 2024",
    content: "Voir de ces yeux\nMon visage se dépeindre\nCe sourire dois-je le feindre\nFinissant par sonner creux \n\nPour elle serais-je un jeu \nEn mon cœur s'enfonce ce pieu \nM'efforçant de faire de mon mieux \nDe larmes s'emplissent mes yeux"
  },
  {
    id: 18,
    title: "Rémission",
    author: "Yacine",
    date: "5 avril 2024",
    content: "Pardon à la lune\nPardon aux étoiles\nPardon à ma plume\nPardon à ma toile\n\nMes yeux pleins de rancune\nPeuvent-ils la désirer\nSans pour autant l'altérer\nPardon à la lune\n\nSombre dans l'abîme de cette spirale\nUn regard envoûtant\nDont dont le charme est persistant\nPardon aux étoiles\n\nAlimenté par l'amertume\nVallonné de changements il rumine\nAmoindrie, mon aspiration s'affine\nPardon à ma plume\n\nLentement rongé par le mal\nVoleur des âmes\nArrache au bras de sa femme\nPardon à ma toile\n\nAinsi\nPardon à la lune\nPardon aux étoiles\nPardon à ma plume\nPardon à ma toile"
  },
  {
    id: 19,
    title: "…",
    author: "Yacine",
    date: "10 avril 2024",
    content: "Plongerais-tu dans mon cœur\nDont le fond abyssal\nBrillant de par sa noirceur\nDuquel rutile le mal"
  },
  {
    id: 20,
    title: "Réminiscence",
    author: "Yacine",
    date: "15 avril 2024",
    content: "Fragile, le corps faillit\nLà où s'embrase l'âme\nUn amour qui ne faiblit\nDans cet iris de flamme\n\nQue faire de cette douleur\nÀ qui exprimerais-je mes peurs\nSournoise est cette souffrance\nDont le cadeau est l'absence\n\nPorté par amour\nUn fardeau si lourd\nMe voilà enfin amputé\nL'échine demeurant courbé\n\nRetroussées sont les manches\nCelle d'une nouvelle vie\nTransparaissent des cicatrices franches\nTémoignant du soleil après la pluie"
  },
  {
    id: 21,
    title: "Affront",
    author: "Yacine",
    date: "20 avril 2024",
    content: "Pourrais-je accrocher ces larmes\nAu vent de sa douceur\nPeut-être finiront elles par sécher\nSous ce torrent grondeur \n\nSa langue sait être la lame \nPerforant mon cœur \nPrise je n'arrive pas à lâcher\nElle est maîtresse de mon malheur"
  },
  {
    id: 22,
    title: "Valeur",
    author: "Yacine",
    date: "25 avril 2024",
    content: "Lorsque l'on me demanda\nDe la lune ou des étoiles\nQuel serait mon choix\nCelui-ci fut sans grand mal\n\nUn bijou pour moi si précieux\nÉtant plus pur que l'éther\nPlus profond que la mer\nJe parle bien sûr de tes yeux\n\nSe perdant parfois dans les miens\nAu feu de ton amour mon cœur crépite\nRêvant qu'un jour mon cœur soit le sien\nMartelé tel un tambour, mon âme palpite\n\nÔ perpétuel tourment lancinant\nQuel est donc ce mal calcinant\nCette musique que joue mon cœur\nSans cesse, attise cette vive douleur"
  },
  {
    id: 23,
    title: "Piquant de rose",
    author: "Yacine",
    date: "1 mai 2024",
    content: "Pris de légèreté\nLa tête compose\nAppréciant fleurter\nSur le piquant d'une rose\nPassant le comme le temps\nPour si peu palpitant\nLourd comme le vent\nAdoucissant le moment\nLe cœur ne peut qu'y croire\nA ce riche trésor\nLes yeux ne pouvant le voir\nValant bien plus que l'or\nL'espace d'un instant\nCouper le fil du temps\nCœur pur comme l'éther\nVisible comme l'air\nGrand comme la Terre\nUn bien dont il est fier\nSans pouvoir revenir en arrière\nIl s'enchaîne par le fer\nInépuisable comme la mer\nLe seul de son ère\nDes regrets palpables\nLe silence d'une larme\nUn souvenir inestimable\nQue brise cette lame\nLe regret\nNe pas avoir tout donné\nLa richesse ne pas avoir partagée\nPar ce manque de volonté\nLe temps s'est arrêté\nImmuable\nSi facilement friable\nAuquel on s'accroche\nSans y être proche\nSon filin s'écoule\nSeul l'âme le ressent\nUn joyau un fragment\nC'est à lui-même qu'il ment"
  },
  {
    id: 24,
    title: "Calciner",
    author: "Yacine",
    date: "5 mai 2024",
    content: "De mille feux inextinguibles\nMon amour semble presque tangible\nTu es mon cœur me faisant briller\nJe ne peux arrêter de t'aimer\n\nVoir s'éteindre la flamme \nDe ces larmes intarissables \nCe nuage de peine si calme \nSans toi je suis incapable"
  },
  {
    id: 25,
    title: "Troubles souvenirs",
    author: "Yacine",
    date: "10 mai 2024",
    content: "De mon cœur elle est le battement\nDe mon sang elle est les vaisseaux\nJe me demande parfois comment\nLes traits de son visage sont si beaux\n\nChaque soir ma tête m'empêche de dormir\nD'elle ne subsistent que de doux souvenirs\nDans mes rêves revenant me hanter\nC'est mon cœur que j'aimerais arracher\n\nDe mon amour j'étouffe\nEntre nous subsiste ce gouffre\nDe mes souvenirs sa voix se moufle\nQuel est ce mal dont je souffre"
  },
  {
    id: 26,
    title: "Désordre",
    author: "Yacine",
    date: "15 mai 2024",
    content: "Lorsque je parle de beauté éblouissante\nJe parle d'une étoile scintillante\nVisible à l'autre bout de l'espace\nTraversant ce froid sidéral\nRien ne l'altère\nLa regarder, des autres, me rend aveugle\nDe son orbite j'aimerais faire partie\nRejeté maintes fois\nDe ma trajectoire petit à petit je dévie\nVagabond erre mon noyau calcinant\nSaurai-je trancher les liens de la solitude\nMon attraction semblant perdre en amplitude\nPeu à peu ma flamme s'éteint\nSerait-ce là mon dernier spectacle\nMerci de rester au sein de l'habitacle\nCelui-ci ne vous protège de rien\nCar aujourd'hui je m'éteins en vain"
  },
  {
    id: 27,
    title: "Doré",
    author: "Yacine",
    date: "20 mai 2024",
    content: "Son corps par le travail forgé\nA elle ne cesse de m'attirer\nElle ne veut cependant m'aimer\nMais je ne peux désespérer\n\nEn mon cœur je sens éclore\nCet amour inondant de lumière\nCes doux cheveux teintés d'or\nCertes de l'aimer je suis fier\n\nComme elle j'aime dormir\nLa voyant dans mes rêves\nAvec elle loin j'aimerais fuir\nSi j'étais Adam elle serait Ève"
  },
  {
    id: 28,
    title: "Rêverie",
    author: "Yacine",
    date: "25 mai 2024",
    content: "Au cœur de ces bras\nMes soucis s'effacent\nBrûlant comme du bois\nEn mon cœur elle passe\n\nSe consument alors mes peines\nHier semblaient-elles indélébiles\nJ'aimerais la rendre mienne\nAssurant ce lien indéfectible"
  },
  {
    id: 29,
    title: "Blâme",
    author: "Yacine",
    date: "30 mai 2024",
    content: "Ciel bleu pourtant temps de pluie\nMon cœur est vide n'y résonne aucun bruit\nD'une pierre brisée la joie en fuit\nInondant les autres asséchant mon puits\n\nD'une autre personne\nIl manque le fragment\nQuelqu'un qu'il affectionne\nD'où renaissent ces sentiments\n\nChaque jour il court\nPar manque de temps\nC'est son cœur lourd\nQui le freine souvent\n\nUne lumière\nCe petit espoir\nUne forte barrière\nContre le noir\n\nCelui de l'abandon\nParfois plus fort que la raison\nQui par peur du pardon\nDélaisse la mission\n\nCelle d'une vie\nForger une personne\nQui par-delà vents et pluie\nPrend le taureau par les cornes\n\nMettant à mal l'abandon\nSeul subissant ce blâme\nS'acharner corps et âme \nQuitte à en perdre la raison!"
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
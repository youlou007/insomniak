/**
 * Fonction pour obtenir le chemin d'accès correct aux actifs selon l'environnement
 * @param {string} path - Le chemin relatif de l'actif
 * @returns {string} - Le chemin complet tenant compte du préfixe d'actif
 */
export function getAssetPath(path) {
  const isProd = process.env.NODE_ENV === 'production';
  const prefix = isProd ? '/insomniak' : '';
  
  // Normaliser le chemin en s'assurant qu'il commence par /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${prefix}${normalizedPath}`;
} 
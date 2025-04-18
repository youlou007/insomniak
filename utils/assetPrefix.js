/**
 * Préfixe les chemins d'assets avec le assetPrefix de Next.js en production
 */
export function getAssetPath(path) {
  const prefix = process.env.NODE_ENV === 'production' ? '/insomniak' : '';
  return `${prefix}${path}`;
} 
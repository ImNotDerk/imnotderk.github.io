/**
 * Prefix an internal route or public asset path with Astro's configured `base`
 * so links resolve identically in local dev and GitHub Pages (`/website-portfolio`).
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (!path || path === '/') {
    return base ? `${base}/` : '/';
  }
  if (path.startsWith('#')) {
    return base ? `${base}/${path}` : `/${path}`;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

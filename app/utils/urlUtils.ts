export const CONTENT_DIR = process.env.CONTENT_DIR || '.';

export function encodePathForUrl(fullPath: string): string {
  
  const relativePath = fullPath.replace(CONTENT_DIR, '').replace(/^[/\\]+/, '');
  
  return relativePath
    .split('/')
    .map(segment => 
      encodeURIComponent(segment)
        .replace(/%20/g, '+')
        .replace(/\./g, '%2E')
    )
    .join('/');
}

export function decodeUrlToPath(urlPath: string): string {
  
  const decodedPath = urlPath
    .split('/')
    .map(segment => 
      decodeURIComponent(
        segment
          .replace(/\+/g, ' ')
          .replace(/%2E/g, '.')
      )
    )
    .join('/');
  
  return `${CONTENT_DIR}/${decodedPath}`.replace(/\/+/g, '/');
}
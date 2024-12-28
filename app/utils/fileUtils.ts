import { promises as fs } from 'fs';
import path from 'path';
import { FileItem } from '../types';

const IGNORED_FILES = [
  '.DS_Store',
  'Thumbs.db',
  '.env',
  '.env.local',
  '.gitignore',
  '.vscode',
  '.idea',
  '.vs',
  '*.url',
];

const shouldIgnore = (filename: string): boolean => {
  const lowerFilename = filename.toLowerCase();
  
  return IGNORED_FILES.some(pattern => {
    if (pattern.startsWith('*')) {
      const ext = pattern.slice(1);
      return lowerFilename.endsWith(ext);
    }
    return lowerFilename === pattern.toLowerCase();
  });
};

export async function getFileTree(dirPath: string): Promise<FileItem[]> {
  const items = await fs.readdir(dirPath, { withFileTypes: true });
  const fileTree: FileItem[] = [];

  for (const item of items) {
    if (shouldIgnore(item.name)) {
      continue;
    }

    const fullPath = path.join(dirPath, item.name);
    
    if (item.isDirectory()) {
      const children = await getFileTree(fullPath);
      if (children.length > 0) {
        fileTree.push({
          name: item.name,
          path: fullPath,
          type: 'folder',
          isMedia: false,
          children
        });
      }
    } else {
      const ext = path.extname(item.name).toLowerCase();
      const isMedia = ['.mp4', '.webm', '.mkv'].includes(ext);
      
      fileTree.push({
        name: item.name,
        path: fullPath,
        type: 'file',
        isMedia
      });
    }
  }
  return fileTree.sort((a, b) => {
    if (a.type === b.type) {
      // Extract the numeric part from the filename
      const aNumberMatch = a.name.match(/^\d+/);
      const bNumberMatch = b.name.match(/^\d+/);
      
      const aNumber = aNumberMatch ? parseInt(aNumberMatch[0], 10) : -1;
      const bNumber = bNumberMatch ? parseInt(bNumberMatch[0], 10) : -1;

      if (aNumber !== -1 && bNumber !== -1) {
        return aNumber - bNumber;
      }
      return a.name.localeCompare(b.name);
    }
    return a.type === 'folder' ? -1 : 1;
  });
}
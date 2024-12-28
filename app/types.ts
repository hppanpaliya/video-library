export interface FileItem {
    name: string;
    path: string;
    type: 'file' | 'folder';
    isMedia: boolean;
    children?: FileItem[];
  }
  
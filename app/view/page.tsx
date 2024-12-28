import { promises as fs } from 'fs';
import path from 'path';
import { FileItem } from '../types';
import FolderView from '../components/FolderView';
import { getFileTree } from '../utils/fileUtils';
import Sidebar from '../components/Sidebar';
import VideoPlayer from '../components/VideoPlayer';
import FileViewer from '../components/FileViewer';
import Breadcrumb from '../components/Breadcrumb';
import { decodeUrlToPath } from '../utils/urlUtils';


const isTextFile = (filename: string) => {
  const textExtensions = ['.txt', '.py', '.js', '.java', '.cpp', '.h', '.css', '.html', '.json', '.md', '.xml', '.yaml', '.yml'];
  return textExtensions.some(ext => filename.toLowerCase().endsWith(ext));
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ViewPage({ searchParams }: PageProps) {
  const searchParam = await searchParams;
  const pathParam = searchParam.path;
  const currentPath = typeof pathParam === 'string' ? decodeUrlToPath(pathParam) : '.';

  try {
    const stats = await fs.stat(currentPath);
    const isDirectory = stats.isDirectory();
    
    if (isDirectory) {
      const files = await getFileTree(currentPath);
      return (
        <main className="min-h-screen dark:bg-gray-950">
          <div className="p-6">
            <div className="mb-6">
              <Breadcrumb path={currentPath} />
              <h1 className="text-3xl font-bold dark:text-gray-100">
                {path.basename(currentPath)}
              </h1>
            </div>
            <FolderView items={files} />
          </div>
        </main>
      );
    }

    const parentDir = path.dirname(currentPath);
    const siblingFiles = (await getFileTree(parentDir)).filter(f => f.isMedia);
    const ext = path.extname(currentPath).toLowerCase();

    const file: FileItem = {
      name: path.basename(currentPath),
      path: currentPath,
      type: 'file',
      isMedia: ['.mp4', '.webm', '.mkv'].includes(ext)
    };

    if (file.isMedia) {
      return (
        <div className="flex flex-col h-screen dark:bg-gray-950">
          <div className="p-4 border-b dark:border-gray-800">
            <Breadcrumb path={currentPath} />
          </div>
          <div className="flex flex-1">
            <Sidebar files={siblingFiles} currentPath={currentPath} />
            <div className="flex-1">
              <VideoPlayer src={currentPath} />
            </div>
          </div>
        </div>
      );
    }

    let content: string | undefined;
    if (isTextFile(currentPath)) {
      content = await fs.readFile(currentPath, 'utf-8');
    }

    return (
      <div className="min-h-screen dark:bg-gray-950">
        <div className="p-4 border-b dark:border-gray-800">
          <Breadcrumb path={currentPath} />
        </div>
        <FileViewer file={file} content={content} />
      </div>
    );

  } catch (error) {
    console.error('Error accessing path:', error);
    return (
      <div className="min-h-screen dark:bg-gray-950 p-6">
        <div className="mb-6">
          <Breadcrumb path={currentPath} />
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
            Error Accessing Path
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Unable to access the requested path. Please make sure the path is correct and you have proper permissions.
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Path: {currentPath}
          </p>
        </div>
      </div>
    );
  }
}
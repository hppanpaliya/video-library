import { FileItem } from '../types';
import Link from 'next/link';
import { encodePathForUrl } from '../utils/urlUtils';

export default function Sidebar({ files, currentPath }: { files: FileItem[], currentPath: string }) {
    return (
      <div className="w-64 h-screen overflow-y-auto bg-gray-100 dark:bg-gray-900 border-r dark:border-gray-700 p-4">
        <h2 className="text-xl font-bold mb-4 dark:text-gray-100">Files</h2>
        <div className="space-y-2">
          {files.map((file) => (
            <div key={file.path} className="pl-2">
              <Link
                href={`/view?path=${encodePathForUrl(file.path)}`}
                className={`block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${
                  currentPath === file.path ? 'bg-gray-200 dark:bg-gray-800' : ''
                } dark:text-gray-200`}
              >
                {file.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
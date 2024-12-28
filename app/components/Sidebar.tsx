import { FileItem } from '../types';
import Link from 'next/link';
import { encodePathForUrl } from '../utils/urlUtils';
import { SidebarMobileWrapper } from './SidebarMobileWrapper';

interface SidebarProps {
  files: FileItem[];
  currentPath: string;
}

// This remains a server component
export default function Sidebar({ files, currentPath }: SidebarProps) {
  const SidebarContent = (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-bold dark:text-gray-100 truncate">
          Files
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {files.map((file) => (
          <div key={file.path} className="group">
            <Link
              href={`/view?path=${encodePathForUrl(file.path)}`}
              className={`
                flex items-center p-2 rounded 
                hover:bg-gray-200 dark:hover:bg-gray-800 
                transition-colors relative
                ${currentPath === file.path ? 'bg-gray-200 dark:bg-gray-800' : ''}
                dark:text-gray-200
              `}
            >
              <span className="flex-1 truncate">{file.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

  // Wrap the content with mobile controls
  return <SidebarMobileWrapper>{SidebarContent}</SidebarMobileWrapper>;
}
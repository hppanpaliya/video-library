import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { encodePathForUrl } from '../utils/urlUtils';
import { CONTENT_DIR } from '../utils/urlUtils';
import LogoutButton from './LogoutButton';

interface BreadcrumbProps {
  path: string;
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

export default function Breadcrumb({ path }: BreadcrumbProps) {
    const relativePath = path.replace(CONTENT_DIR, '').replace(/^[/\\]+/, '');
    
    const segments = relativePath.split(/[/\\]/).filter(Boolean);
    const decodedSegments = segments.map((segment: string) => decodeURIComponent(segment));
  
    const breadcrumbItems: BreadcrumbItem[] = decodedSegments.map((segment: string, index: number) => {
      const cumulativePath = segments
        .slice(0, index + 1)
        .join('/');
        
      return {
        name: segment,
        path: `${CONTENT_DIR}/${cumulativePath}`.replace(/\/+/g, '/')
      };
    });
  
    return (
      <div className="flex items-center space-x-2 text-sm mb-2 text-gray-600 dark:text-gray-400 overflow-x-auto pb-2">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-200 flex items-center flex-shrink-0">
          <Home size={16} className="mr-1" />
          <span>Home</span>
        </Link>
        {breadcrumbItems.map((item: BreadcrumbItem, index: number) => (
          <div key={item.path} className="flex items-center flex-shrink-0">
            <ChevronRight size={16} className="mx-1" />
            <Link
              href={`/view?path=${encodePathForUrl(item.path)}`}
              className={`hover:text-gray-900 dark:hover:text-gray-200 ${
                index === breadcrumbItems.length - 1 ? 'font-medium' : ''
              }`}
            >
              {item.name}
            </Link>
          </div>
        ))}
        <div className="flex-1" />
        <LogoutButton />
      </div>
    );
  }
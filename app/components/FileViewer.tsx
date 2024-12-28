'use client';
import { useState } from 'react';
import { FileItem } from '../types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { encodePathForUrl } from '../utils/urlUtils';

interface FileViewerProps {
  file: FileItem;
  content?: string;
}

export default function FileViewer({ file, content }: FileViewerProps) {
  const [downloading, setDownloading] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(`/api/file?path=${encodePathForUrl(file.path)}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } finally {
      setDownloading(false);
    }
  };

  const ext = file.name.split('.').pop()?.toLowerCase();
  const isHtml = ext === 'html';
  
  return (
    <div className="p-4 h-full dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold dark:text-gray-100">{file.name}</h2>
          <span className="px-2 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
            {isHtml ? 'HTML' : ext}
          </span>
        </div>
        <div className="flex space-x-3">
          {isHtml && iframeError && (
            <button
              onClick={() => window.open(`/api/file?path=${encodePathForUrl(file.path)}`, '_blank')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
            >
              Open in New Tab
            </button>
          )}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50"
          >
            {downloading ? 'Downloading...' : 'Download'}
          </button>
        </div>
      </div>
      
      {isHtml ? (
        <>
          <iframe 
            src={`/api/file?path=${encodePathForUrl(file.path)}`}
            className="w-full h-[calc(100vh-8rem)] border-0 dark:border-gray-700"
            onError={() => setIframeError(true)}
            sandbox="allow-same-origin allow-scripts"
          />
          {iframeError && (
            <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900 rounded">
              <p className="text-yellow-800 dark:text-yellow-200">
                Unable to display HTML content in iframe. You can try opening it in a new tab or downloading the file.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="h-[calc(100vh-8rem)] overflow-auto rounded border dark:border-gray-700">
          <SyntaxHighlighter
            language={ext}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: 'transparent',
              minHeight: '100%'
            }}
            showLineNumbers={true}
            wrapLines={true}
          >
            {content || ''}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}
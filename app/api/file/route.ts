import { createReadStream } from 'fs';
import { stat, readFile } from 'fs/promises';
import { NextRequest } from 'next/server';
import path from 'path';
import { decodeUrlToPath } from '../../utils/urlUtils';

export async function GET(request: NextRequest) {
  try {
    const urlPath = request.nextUrl.searchParams.get('path');
    if (!urlPath) {
      return new Response('Path parameter is required', { status: 400 });
    }

    const filePath = decodeUrlToPath(urlPath);
    const ext = path.extname(filePath).toLowerCase();
    const stats = await stat(filePath);

    if (ext === '.html') {
      try {
        const content = await readFile(filePath, 'utf-8');
        return new Response(content, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Content-Length': Buffer.byteLength(content).toString(),
          },
        });
      } catch (error) {
        console.error('Error reading HTML file:', error);
        return new Response('Error reading HTML file', { status: 500 });
      }
    }

    const mimeTypes: Record<string, string> = {
      '.txt': 'text/plain',
      '.py': 'text/plain',
      '.js': 'text/plain',
      '.java': 'text/plain',
      '.cpp': 'text/plain',
      '.zip': 'application/zip',
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';
    const stream = createReadStream(filePath);

    return new Response(stream as never, {
      headers: {
        'Content-Length': stats.size.toString(),
        'Content-Type': contentType,
        ...(contentType === 'application/octet-stream' ? {
          'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`,
        } : {}),
      },
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return new Response('Error loading file try refreshing the page', { status: 500 });
  }
}
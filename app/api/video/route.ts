import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import { NextRequest } from 'next/server';
import path from 'path';

export async function GET(request: NextRequest) {
  const filePath = request.nextUrl.searchParams.get('path');
  
  if (!filePath) {
    return new Response('Path parameter is required', { status: 400 });
  }

  try {
    const ext = path.extname(filePath).toLowerCase();
    const stats = await stat(filePath);

    const mimeTypes: Record<string, string> = {
      '.html': 'text/html',
      '.txt': 'text/plain',
      '.py': 'text/plain',
      '.js': 'text/plain',
      '.java': 'text/plain',
      '.cpp': 'text/plain',
      '.zip': 'application/zip',
      '.xml': 'text/xml',
      '.yaml': 'text/yaml',
      '.yml': 'text/yaml',
      
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
    return new Response('Error loading file '+ error , { status: 500 });
  }
}
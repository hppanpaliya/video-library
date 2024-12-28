import { createReadStream, statSync } from 'fs';
import { NextRequest } from 'next/server';


export async function GET(request: NextRequest) {
  try {
    const urlPath = request.nextUrl.searchParams.get('path');
    if (!urlPath) {
      return new Response('Path parameter is required', { status: 400 });
    }

    const filePath = urlPath;
    const stat = statSync(filePath);
    const fileSize = stat.size;
    const range = request.headers.get('range');

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const file = createReadStream(filePath, { start, end });

      const headers = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize.toString(),
        'Content-Type': 'video/mp4',
      };

      return new Response(file as never, {
        status: 206,
        headers,
      });
    } else {
      const file = createReadStream(filePath);
      const headers = {
        'Content-Length': fileSize.toString(),
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes',
      };

      return new Response(file as never, {
        status: 200,
        headers,
      });
    }
  } catch (error) {
    console.error('Error streaming video:', error);
    return new Response('Error streaming video', { status: 500 });
  }
}
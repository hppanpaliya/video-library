import { getFileTree } from './utils/fileUtils';
import FolderView from './components/FolderView';
import LogoutButton from './components/LogoutButton';

export default async function Home() {
  const files = await getFileTree(process.env.CONTENT_DIR || './videos');
  
  return (
    <main className="min-h-screen">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 flex justify-between items-center">
          Video Library
          <LogoutButton />
        </h1>
      </div>
      <FolderView items={files} />
    </main>
  );
}
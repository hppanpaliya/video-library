export default function VideoPlayer({ src }: { src: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <video
        className="max-w-full max-h-[calc(100vh-4rem)]"
        controls
        autoPlay
        src={`/api/video?path=${encodeURIComponent(src)}`}
      />
    </div>
  );
}

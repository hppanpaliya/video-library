# Video Library Viewer

A web application built with Next.js 15.1 for viewing and managing video files and related content.

## Features

- File browser interface
- Video playback support
- Syntax highlighting for code files
- Dark mode support
- File downloads
- Responsive design with Tailwind CSS

## Installation

1. Clone the repository:
```sh
git clone https://github.com/hppanpaliya/video-library
```

```sh
cd video-library
```

2. Install dependencies:
```sh
npm install
```

## Development

To run the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

Build the application for production:

```sh
npm run build
```

Start the production server:

```sh
npm run start
```

## Project Structure

```
.
├── app/                 # Next.js app directory
├── public/              # Static files
├── videos/              # Video files directory
├── .next/               # Next.js build output
├── package.json         # Project dependencies
└── tailwind.config.ts   # Tailwind CSS configuration
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Icon library
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) - Code syntax highlighting

## Contributing

Open a Pull Request

## Environment Variables

The following environment variables can be configured in .env.local

"CONTENT_DIR" - Directory path for Video files (default: "./videos")
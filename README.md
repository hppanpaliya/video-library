# Video Library Viewer

A modern, secure web application for organizing and streaming your personal video collection. Built with Next.js 15.1, this self-hosted solution provides an elegant interface for browsing, watching your video files with a responsive design and user authentication system.


## Features

- File browser interface
- Video playback support
- Syntax highlighting for code files
- Dark mode support
- File downloads
- Responsive design with Tailwind CSS
- User authentication system with registration and login
- Secure password hashing with bcrypt
- Better-SQLite3 database storage for easy setup

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
├── middleware.ts        # Middleware functions
├── package.json         # Project dependencies
└── tailwind.config.ts   # Tailwind CSS configuration
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Icon library
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) - Code syntax highlighting
- [Better-SQLite3](https://github.com/WiseLibs/better-sqlite3) - SQLite database
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Password hashing

## Contributing

Open a Pull Request

## Environment Variables

The following environment variables can be configured in .env.local
```sh
echo "CONTENT_DIR=$(pwd)/videos" > .env.local
echo "JWT_SECRET=secret" >> .env.local
echo "REGISTRATION_SECRET=secret" >> .env.local
```

- `CONTENT_DIR` - Directory path for Video files (default: "./videos")
- `JWT_SECRET` - Secret key for JWT token generation (required)
- `REGISTRATION_SECRET` - Secret code required for user registration (required)
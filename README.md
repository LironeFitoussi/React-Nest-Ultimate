# Ultimate MERN Stack Template

A full-featured MERN (MongoDB, Express.js, React, Node.js) stack template for building modern web applications.

## Features

- 🚀 Full-stack MERN application setup
- 🔐 Authentication system
- 📱 Responsive design
- 🎨 Modern UI components
- 🔄 Real-time updates
- 📦 Easy to deploy

## Quick Start

1. Click the "Use this template" button on GitHub to create a new repository
2. Clone your new repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```
3. Install dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```
4. Set up environment variables:
   - Create `.env` file in the server directory
   - Add necessary environment variables (see `.env.example`)

5. Start the development servers:
   ```bash
   # Start server (from server directory)
   npm run dev

   # Start client (from client directory)
   npm start
   ```

## Project Structure

```
├── client/             # React frontend
├── server/             # Node.js backend
├── .gitignore         # Git ignore file
└── README.md          # Project documentation
```

## Available Scripts

### Server
- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm test` - Run tests

### Client
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
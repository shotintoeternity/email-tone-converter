# Email Tone Converter

A simple email tone converter web application that uses the Groq API. This project features an Express backend to call the Groq Chat Completions API for rewriting email text in a selected tone, and a React frontend to interact with the user.

## Table of Contents

- [Features](#features)
- [Directory Structure](#directory-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Production Build](#production-build)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Express Backend:** Integrates with the Groq API to convert email text.
- **React Frontend:** Provides an interface for entering email text, selecting a tone (Professional, Casual, Friendly), and displaying the rewritten email.
- **Copy Functionality:** Allows users to easily copy the converted email.
- **Clean UI:** Designed with friendly styling using Arial and a responsive layout.

## Directory Structure

```
email-tone-converter/
├── .env                   # Environment variables (not committed)
├── package.json           # Root package.json (monorepo setup)
├── server.js              # Express backend
└── client/
    ├── package.json       # React client package.json (with proxy configuration)
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js         # Main React component
        ├── App.css        # Styling for the React app
        └── index.js       # React entry point
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- A Groq API key. Sign up and generate one at [Groq Cloud](https://console.groq.com).

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/shotintoeternity/email-tone-converter.git
   cd email-tone-converter
   ```

2. **Install Root Dependencies:**

   ```bash
   npm install
   ```

3. **Install Client Dependencies:**

   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Configure Environment Variables:**

   Create a `.env` file in the root directory with the following content (replace with your actual API key):

   ```env
   GROQ_API_KEY=your_api_key_here
   ```

## Usage

To run the application in development mode, run the following command in the project root:

```bash
npm start
```

This command uses `concurrently` to start both:

- The Express backend on [http://localhost:5000](http://localhost:5000)
- The React frontend on [http://localhost:3000](http://localhost:3000)

Open your browser and navigate to [http://localhost:3000](http://localhost:3000). Paste your email text or idea, select a tone, and click **Convert Email Tone**. The rewritten email will display along with a copy button.

## Production Build

To build the React app for production and have Express serve the static files:

1. **Build the React App:**

   ```bash
   cd client
   npm run build
   cd ..
   ```

2. **Start the Express Server:**

   ```bash
   npm run server
   ```

Now, the Express server will serve the production build from the `client/build` directory.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Open a pull request with a description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).

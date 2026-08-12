# learning-backend-mern

Learning Backend : Node JS, Express JS, Mongo DB

This is my personal learning log while working through backend fundamentals with
the MERN stack. It's organized as a series of numbered "chapter" folders, each one
a small standalone project that builds on the concepts from the last. Not a
polished product — just a running record of what I built while learning.

## Documentation

Google Docs Link: https://docs.google.com/document/d/19RgZH-rZo4eyp3i7zxdl2LDyGTVcEcRl1Ji8EhunlYM/edit?usp=sharing

## Chapters

| Chapter | Covers |
|---|---|
| [`chapter-1 nodejs basics`](./chapter-1%20nodejs%20basics) | Node.js fundamentals — sync vs. async file reading with the `fs` module, basic module imports/exports. |
| [`chapter-2 nodejs webserver`](./chapter-2%20nodejs%20webserver) | Building a raw HTTP server with Node's built-in `http` module — routing by URL, setting headers, serving HTML/JSON, plus a server-side rendering example. |
| [`chapter-3 express js`](./chapter-3%20express%20js) | Intro to Express — app/router/built-in/third-party middleware (`morgan`, `express.json`, `express.static`), and handling GET/POST/PUT/DELETE/PATCH. |
| [`chapter-4 rest apis`](./chapter-4%20rest%20apis) | REST API design — full CRUD endpoints (`/products`) over an in-memory/JSON data source. |
| [`chapter-5_6 mvc file structure _env-file`](./chapter-5_6%20mvc%20file%20structure%20_env-file) | Restructuring the app into MVC (routes/controllers), and loading config from `.env` with `dotenv`. |
| [`chapter-7 mongoose`](./chapter-7%20mongoose) | Connecting to MongoDB with Mongoose — schemas/models and swapping the JSON data source for a real database. |
| [`chapter-8_9 connecting api with react _deployment`](./chapter-8_9%20connecting%20api%20with%20react%20_deployment) | Wiring a React (Vite) frontend up to the Express/Mongoose API with CORS, and serving the built client from Express for deployment. |
| [`chapter-11 authentication using jwt`](./chapter-11%20authentication%20using%20jwt) | Adding authentication — signup/login with hashed passwords (`bcrypt`) and JWT-based auth (`jsonwebtoken`). |
| [`authentication-practice`](./authentication-practice) | Extra standalone practice repo for the same signup/login/JWT flow, separate from the numbered chapters. |

## Stack

Node.js, Express, MongoDB/Mongoose, React (Vite), JWT, bcrypt.

## Running a chapter

Each chapter folder is its own project with its own `package.json`. To run one:

```bash
cd "chapter-x ..."
npm install
npm start   # or: node index.js
```

Chapters that use MongoDB or environment variables need a local `.env` file
(see the chapter's own files for the expected variables) and a running MongoDB
instance. The `chapter-8_9` and `chapter-11` folders also have a `client/`
subfolder for the React frontend, which needs its own `npm install`.

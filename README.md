# Mini Message Board

A server-rendered message board built with **Express**, **EJS**, and **PostgreSQL**.

Users can create messages, view them on the homepage, and open individual messages for details. The app includes server-side validation and persistent storage.

## Live Demo

[View Live Demo](https://mini-message-board-faly.onrender.com/)

## Features

- View all messages on the homepage
- Add a new message via form
- View message details
- Server-side rendering using EJS
- Server-side validation with express-validator
- Persistent storage using PostgreSQL

## Tech

- Node.js
- Express
- express-validator
- EJS
- PostgreSQL

## Run Locally

```bash
git clone https://github.com/Sai-Eshwar-Supreet/mini-message-board.git
cd mini-message-board
npm install
npm run dev
```

The app will run on: http://localhost:8080

## Environment Variables

Create a .env file in the root:

```
PORT=8080
TITLE=Mini Message Board
DB_CONNECTION_STRING=<your_postgres_connection_string>
```

# Project Structure

```
.
├── controllers/
├── db/
├── models/
├── public/
├── routes/
├── views/
```

## Notes

- Messages are stored in PostgreSQL (persistent)
- No authentication (open message board)
- Validation is handled on the server

## Context

- Built while learning backend development with [The Odin Project](https://www.theodinproject.com/) and extended with database integration and validation.

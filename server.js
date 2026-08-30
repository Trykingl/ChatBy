const express = require('express');
const Database = require('better-sqlite3');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const db = new Database('chatby.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    sender TEXT NOT NULL,
    time TEXT NOT NULL
  )
`);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`server running at http://localhost:${PORT}`);
})

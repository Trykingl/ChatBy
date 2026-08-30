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

app.get('/messages', (req, res) => {
  const messages = db.prepare('SELECT * FROM messages ORDER BY id ASC').all();
  res.json(messages);
});

app.post('messages', (req, res) => {
  const { text, sender, time } = req.body;

  if (!text || !sender || !time) {
    return res.status(400).json({ error: 'Missing feilds' });
  }

  db.prepare('INSERT INTO messages (text, sender, time) VALUE (?, ?, ?)')
    .run(text, sender, time);

  res.sendStatus(201);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`server running at http://localhost:${PORT}`);
})

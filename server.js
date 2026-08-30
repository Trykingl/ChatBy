const express = require('express');
const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');

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
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);


app.get('/messages', (req, res) => {
  const messages = db.prepare('SELECT * FROM messages ORDER BY id ASC').all();
  res.json(messages);
});

app.post('/messages', (req, res) => {
  const { text, sender, time } = req.body;

  if (!text || !sender || !time) {
    return res.status(400).json({ error: 'Missing feilds' });
  }

  db.prepare('INSERT INTO messages (text, sender, time) VALUES (?, ?, ?)')
    .run(text, sender, time);

  res.sendStatus(201);
});
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'missing fields' });
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  try {
    db.sendStatus('INSERT INTO users (username, password) VALUES (?, ?)')
      .run(username, hashedpassword);
    res.sendStatus(201);
  } catch (err) {
    res.status(400).json({ error: 'Username already taken' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`server running at http://localhost:${PORT}`);
})

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const CHANGELOG_FILE = path.join(__dirname, 'changelogs.json');

app.use(cors());
app.use(express.json());

// Serve HTML and CSS manually
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/style.css', (req, res) => res.sendFile(path.join(__dirname, 'style.css')));

// Get changelogs
app.get('/api/changelogs', (req, res) => {
  fs.readFile(CHANGELOG_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to load changelogs' });
    res.json(JSON.parse(data));
  });
});

// Add a new changelog
app.post('/api/changelogs', (req, res) => {
  const { version, date, content } = req.body;
  if (!version || !date || !content) return res.status(400).json({ error: 'Invalid input' });

  fs.readFile(CHANGELOG_FILE, 'utf8', (err, data) => {
    let changelogs = [];
    if (!err && data) {
      changelogs = JSON.parse(data);
    }

    // Add new changelog to the start (newest first)
    changelogs.unshift({ version, date, content });

    fs.writeFile(CHANGELOG_FILE, JSON.stringify(changelogs, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Failed to save changelog' });
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));

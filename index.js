const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/puter', (req, res) => {
  const prompt = req.query.prompt || 'Bonjour';
  const model = req.query.model || 'gpt-4.1-nano';
  res.redirect(`/api-json.html?prompt=${encodeURIComponent(prompt)}&model=${encodeURIComponent(model)}`);
});

app.get('/html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'api.html'));
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    message: 'API Puter.js gratuite et illimitée',
    endpoints: {
      'GET /puter?prompt=message': 'Retourne une réponse JSON de l\'IA',
      'GET /html?prompt=message': 'Page HTML avec interface Puter',
      'GET /': 'Page d\'accueil'
    },
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`API JSON endpoint: GET /puter?prompt=votre_message`);
  console.log(`Status endpoint: GET /api/status`);
});

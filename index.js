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
  const image_url = req.query.image_url || '';
  const uid = req.query.uid || '';
  
  let redirectUrl = `/api-json.html?prompt=${encodeURIComponent(prompt)}&model=${encodeURIComponent(model)}`;
  
  if (image_url) {
    redirectUrl += `&image_url=${encodeURIComponent(image_url)}`;
  }
  if (uid) {
    redirectUrl += `&uid=${encodeURIComponent(uid)}`;
  }
  
  res.redirect(redirectUrl);
});

app.get('/html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'api.html'));
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    message: 'API Puter.js gratuite et illimitee - Support Vision/Images',
    endpoints: {
      'GET /puter?prompt=message&model=...': 'Texte seul - Retourne JSON',
      'GET /puter?prompt=message&model=...&image_url=URL': 'Analyse d\'image - Retourne JSON',
      'GET /puter?prompt=message&model=...&image_url=URL&uid=ID': 'Avec identifiant unique',
      'GET /html?prompt=message': 'Page HTML avec interface Puter',
      'GET /': 'Page d\'accueil avec selecteur de modeles'
    },
    vision_models: [
      'gpt-4o', 'gpt-4o-mini', 'gpt-4.1', 
      'claude-sonnet-4', 'claude-opus-4',
      'gemini-2.5-flash', 'gemini-2.5-pro',
      'meta-llama/llama-4-scout', 'meta-llama/llama-4-maverick'
    ],
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`API JSON endpoint: GET /puter?prompt=votre_message`);
  console.log(`API Vision endpoint: GET /puter?prompt=decrivez&image_url=URL`);
  console.log(`Status endpoint: GET /api/status`);
});

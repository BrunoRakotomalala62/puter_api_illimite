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
  const image_url = req.query.image_url || '';
  const model = req.query.model || (image_url ? 'gpt-5-nano' : 'gpt-4.1-nano');
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

app.get('/generate', (req, res) => {
  const prompt = req.query.prompt || 'A beautiful landscape';
  const model = req.query.model || 'gpt-image-1';
  const uid = req.query.uid || '';
  
  let redirectUrl = `/generate.html?prompt=${encodeURIComponent(prompt)}&model=${encodeURIComponent(model)}`;
  
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
    message: 'API Puter.js - Chat + Vision + Generation d\'images',
    endpoints: {
      'GET /': 'Interface complete',
      'GET /puter?prompt=...&model=...': 'Chat IA - JSON',
      'GET /puter?prompt=...&model=...&image_url=URL': 'Analyse image - JSON',
      'GET /generate?prompt=...&model=gpt-image-1': 'Generation image',
      'GET /api/status': 'Status API'
    },
    chat_models: ['gpt-4o', 'gpt-4.1-nano', 'claude-sonnet-4', 'gemini-2.5-flash'],
    vision_models: ['gpt-4o', 'claude-sonnet-4', 'gemini-2.5-flash', 'meta-llama/llama-4-scout'],
    image_models: ['gpt-image-1', 'dall-e-3'],
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Chat/Vision: GET /puter?prompt=...`);
  console.log(`Image Gen: GET /generate?prompt=...`);
  console.log(`Status: GET /api/status`);
});

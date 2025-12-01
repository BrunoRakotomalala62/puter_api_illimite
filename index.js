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
  
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>API</title></head>
<body style="margin:0;padding:10px;font-family:monospace;white-space:pre-wrap;"><script src="https://js.puter.com/v2/"></script><script>
const prompt = ${JSON.stringify(prompt)};
const model = ${JSON.stringify(model)};
const image_url = ${JSON.stringify(image_url)};
const uid = ${JSON.stringify(uid)};

(async function() {
  try {
    let response;
    if (image_url) {
      response = await puter.ai.chat(prompt, image_url, { model: model });
    } else {
      response = await puter.ai.chat(prompt, { model: model });
    }
    
    let responseText = '';
    if (typeof response === 'string') {
      responseText = response;
    } else if (response.message && response.message.content) {
      if (Array.isArray(response.message.content)) {
        responseText = response.message.content.map(c => c.text || c).join('\\n');
      } else {
        responseText = response.message.content;
      }
    } else if (response.content) {
      if (Array.isArray(response.content)) {
        responseText = response.content.map(c => c.text || c).join('\\n');
      } else {
        responseText = response.content;
      }
    } else {
      responseText = JSON.stringify(response);
    }
    
    const jsonData = {
      success: true,
      model: model,
      prompt: prompt,
      image_url: image_url || null,
      uid: uid || null,
      response: responseText,
      timestamp: new Date().toISOString()
    };
    document.body.textContent = JSON.stringify(jsonData, null, 2);
  } catch (error) {
    let errorMsg = 'Une erreur est survenue';
    if (error && error.message) errorMsg = error.message;
    else if (typeof error === 'string') errorMsg = error;
    else if (error && error.error) {
      if (typeof error.error === 'string') errorMsg = error.error;
      else if (error.error.message) errorMsg = error.error.message;
      else errorMsg = JSON.stringify(error.error);
    } else if (error) errorMsg = JSON.stringify(error);
    
    const jsonData = {
      success: false,
      model: model,
      prompt: prompt,
      image_url: image_url || null,
      uid: uid || null,
      error: errorMsg,
      timestamp: new Date().toISOString()
    };
    document.body.textContent = JSON.stringify(jsonData, null, 2);
  }
})();
</script></body>
</html>`;
  
  res.type('html').send(html);
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

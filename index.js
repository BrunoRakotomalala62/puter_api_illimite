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

app.get('/speech2speech', (req, res) => {
  const audio_url = req.query.audio_url || '';
  const voice = req.query.voice || '21m00Tcm4TlvDq8ikWAM';
  const model = req.query.model || 'eleven_multilingual_sts_v2';
  const output_format = req.query.output_format || 'mp3_44100_128';
  const remove_noise = req.query.remove_noise === 'true';
  const uid = req.query.uid || '';
  
  if (!audio_url) {
    res.type('html').send(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:10px;font-family:monospace;white-space:pre-wrap;">${JSON.stringify({
      success: false,
      error: "audio_url parameter is required",
      usage: "/speech2speech?audio_url=URL&voice=VOICE_ID&model=MODEL&output_format=FORMAT",
      voices: {
        "21m00Tcm4TlvDq8ikWAM": "Rachel (default)",
        "EXAVITQu4vr4xnSDxMaL": "Bella",
        "ErXwobaYiN019PkySvjV": "Antoni",
        "VR6AewLTigWG4xSOukaG": "Arnold"
      },
      models: ["eleven_multilingual_sts_v2", "eleven_english_sts_v2"],
      timestamp: new Date().toISOString()
    }, null, 2)}</body></html>`);
    return;
  }
  
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Speech2Speech API</title></head>
<body style="margin:0;padding:10px;font-family:monospace;white-space:pre-wrap;"><script src="https://js.puter.com/v2/"></script><script>
const audio_url = ${JSON.stringify(audio_url)};
const voice = ${JSON.stringify(voice)};
const model = ${JSON.stringify(model)};
const output_format = ${JSON.stringify(output_format)};
const remove_noise = ${remove_noise};
const uid = ${JSON.stringify(uid)};

(async function() {
  try {
    const options = {
      voice: voice,
      model: model,
      output_format: output_format,
      removeBackgroundNoise: remove_noise
    };
    
    const audio = await puter.ai.speech2speech(audio_url, options);
    
    const audioSrc = audio.src || audio.toString();
    
    const jsonData = {
      success: true,
      audio_url: audio_url,
      voice: voice,
      model: model,
      output_format: output_format,
      remove_noise: remove_noise,
      uid: uid || null,
      result_audio_url: audioSrc,
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
      audio_url: audio_url,
      voice: voice,
      model: model,
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

const OPENROUTER_MODELS = [
  "openrouter:shisa-ai/shisa-v2-llama3.3-70b",
  "openrouter:shisa-ai/shisa-v2-llama3.3-70b:free",
  "openrouter:sophosympatheia/midnight-rose-70b",
  "openrouter:switchpoint/router",
  "openrouter:tencent/hunyuan-a13b-instruct",
  "openrouter:tencent/hunyuan-a13b-instruct:free",
  "openrouter:thedrummer/anubis-70b-v1.1",
  "openrouter:thedrummer/anubis-pro-105b-v1",
  "openrouter:thedrummer/cydonia-24b-v4.1",
  "openrouter:thedrummer/rocinante-12b",
  "openrouter:thedrummer/skyfall-36b-v2",
  "openrouter:thedrummer/unslopnemo-12b",
  "openrouter:thenlper/gte-base",
  "openrouter:thenlper/gte-large",
  "openrouter:thudm/glm-4-32b",
  "openrouter:thudm/glm-4.1v-9b-thinking",
  "openrouter:thudm/glm-z1-32b",
  "openrouter:tngtech/deepseek-r1t-chimera",
  "openrouter:tngtech/deepseek-r1t-chimera:free",
  "openrouter:tngtech/deepseek-r1t2-chimera:free",
  "openrouter:tngtech/tng-r1t-chimera",
  "openrouter:tngtech/tng-r1t-chimera:free",
  "openrouter:undi95/remm-slerp-l2-13b",
  "openrouter:x-ai/grok-2-1212",
  "openrouter:x-ai/grok-2-vision-1212",
  "openrouter:x-ai/grok-3",
  "openrouter:x-ai/grok-3-beta",
  "openrouter:x-ai/grok-3-mini",
  "openrouter:x-ai/grok-3-mini-beta",
  "openrouter:x-ai/grok-4",
  "openrouter:x-ai/grok-4-fast:free",
  "openrouter:x-ai/grok-4.1-fast:free",
  "openrouter:x-ai/grok-code-fast-1",
  "openrouter:x-ai/grok-vision-beta",
  "openrouter:z-ai/glm-4-32b",
  "openrouter:z-ai/glm-4.5",
  "openrouter:z-ai/glm-4.5-air",
  "openrouter:z-ai/glm-4.5-air:free",
  "openrouter:z-ai/glm-4.5v",
  "openrouter:z-ai/glm-4.6",
  "openrouter:z-ai/glm-4.6:exacto"
];

app.get('/api/models', (req, res) => {
  res.json({
    success: true,
    openrouter_models: OPENROUTER_MODELS,
    chat_models: ['gpt-4o', 'gpt-4.1-nano', 'gpt-5-nano', 'claude-sonnet-4', 'gemini-2.5-flash'],
    vision_models: ['gpt-4o', 'gpt-5-nano', 'gemini-2.5-flash', 'openrouter:x-ai/grok-2-vision-1212', 'openrouter:x-ai/grok-vision-beta', 'openrouter:thudm/glm-4.1v-9b-thinking', 'openrouter:z-ai/glm-4.5v'],
    image_models: ['gpt-image-1', 'dall-e-3'],
    total_models: OPENROUTER_MODELS.length + 5,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    message: 'API Puter.js - Chat + Vision + Generation d\'images + Speech2Speech',
    endpoints: {
      'GET /': 'Interface complete',
      'GET /puter?prompt=...&model=...': 'Chat IA - JSON',
      'GET /puter?prompt=...&model=...&image_url=URL': 'Analyse image - JSON',
      'GET /generate?prompt=...&model=gpt-image-1': 'Generation image',
      'GET /speech2speech?audio_url=...&voice=...': 'Speech to Speech',
      'GET /api/models': 'Liste des modeles',
      'GET /api/status': 'Status API'
    },
    chat_models: ['gpt-4o', 'gpt-4.1-nano', 'gpt-5-nano', 'claude-sonnet-4', 'gemini-2.5-flash'],
    vision_models: ['gpt-4o', 'gpt-5-nano', 'gemini-2.5-flash'],
    image_models: ['gpt-image-1', 'dall-e-3'],
    openrouter_models_count: OPENROUTER_MODELS.length,
    speech2speech: {
      voices: {
        "21m00Tcm4TlvDq8ikWAM": "Rachel (default)",
        "EXAVITQu4vr4xnSDxMaL": "Bella",
        "ErXwobaYiN019PkySvjV": "Antoni",
        "VR6AewLTigWG4xSOukaG": "Arnold"
      },
      models: ["eleven_multilingual_sts_v2", "eleven_english_sts_v2"],
      output_formats: ["mp3_44100_128", "opus_48000_64", "pcm_48000"]
    },
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Chat/Vision: GET /puter?prompt=...`);
  console.log(`Image Gen: GET /generate?prompt=...`);
  console.log(`Speech2Speech: GET /speech2speech?audio_url=...`);
  console.log(`Status: GET /api/status`);
});

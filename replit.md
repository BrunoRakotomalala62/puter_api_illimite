# Puter AI API - Multi-Modeles + Vision

## Overview
API gratuite et illimitee utilisant Puter.js avec acces a 500+ modeles IA (GPT, Claude, Gemini, Llama, etc.). Support complet pour l'analyse d'images (Vision). Aucune cle API requise.

## Project Structure
```
├── index.js              # Serveur Express principal
├── package.json          # Dependances Node.js
├── public/
│   ├── index.html        # Interface avec selecteur de modeles + Vision
│   ├── api.html          # Page de reponse HTML
│   └── api-json.html     # Page de reponse JSON avec support images
└── replit.md             # Documentation du projet
```

## API Endpoints

### GET /puter?prompt=message&model=model_name
Endpoint texte - retourne la reponse en JSON.
- **prompt**: Le message a envoyer a l'IA
- **model**: Le modele a utiliser (optionnel, defaut: gpt-4.1-nano)

Exemple:
```
GET /puter?prompt=Bonjour&model=claude-sonnet-4
```

### GET /puter?prompt=message&model=model_name&image_url=URL&uid=ID
Endpoint Vision/Image - analyse une image et retourne JSON.
- **prompt**: Le message/question sur l'image
- **model**: Le modele a utiliser (recommande: gpt-4o, claude-sonnet-4, gemini-2.5-flash)
- **image_url**: URL de l'image a analyser
- **uid**: Identifiant unique optionnel pour le tracking

Exemple:
```
GET /puter?prompt=Decrivez cette image&model=gpt-4o&image_url=https://example.com/photo.jpg&uid=user123
```

Reponse:
```json
{
  "success": true,
  "model": "gpt-4o",
  "prompt": "Decrivez cette image",
  "image_url": "https://example.com/photo.jpg",
  "uid": "user123",
  "response": "Cette image montre...",
  "timestamp": "2025-11-30T17:00:00.000Z"
}
```

## Modeles Disponibles

### OpenAI
- `gpt-4.1-nano` - Rapide et efficace
- `gpt-4.1` - Modele puissant
- `gpt-4o` - Multimodal
- `gpt-4o-mini` - Version legere
- `o3-mini`, `o4-mini` - Raisonnement

### Claude (Anthropic)
- `claude-sonnet-4` - Excellent pour le code
- `claude-sonnet-4-5` - Version amelioree
- `claude-opus-4` - Le plus puissant
- `claude-haiku-4-5` - Tres rapide

### Gemini (Google)
- `gemini-2.5-flash` - Rapide
- `gemini-2.5-pro` - Professionnel
- `gemini-2.0-flash`

### Meta / Llama
- `meta-llama/llama-4-scout`
- `meta-llama/llama-4-maverick`
- `meta-llama/llama-3.3-70b-instruct`

### Autres
- `grok-3`, `grok-3-mini` - xAI
- `deepseek-chat`, `deepseek-reasoner`
- `mistral-large-latest`, `mistral-small-latest`
- `amazon-nova-pro`, `amazon-nova-lite`

## Technologies
- Node.js avec Express
- Puter.js (gratuit et illimite)
- HTML/CSS/JavaScript

## Note
Puter.js fonctionne cote client. C'est 100% gratuit - aucune cle API requise.

## Replit Environment Setup (November 30, 2025)

### Configuration Complete
- **Workflow**: Configured to run `npm start` on port 5000 with webview output
- **Dependencies**: All npm packages installed (express, cors, @heyputer/puter.js)
- **Deployment**: Configured for autoscale deployment
- **Server**: Binds to 0.0.0.0:5000 for proper Replit proxy support

### Development
- Run `npm start` to start the development server
- Access the application through the Replit webview
- Server automatically configured for Replit's proxy environment

### Architecture
- **Frontend**: Static HTML/CSS/JS files served from `/public`
- **Backend**: Express.js server for routing and serving static files
- **AI Integration**: Client-side Puter.js library handles all AI requests
- **No API keys required**: Puter.js is completely free and unlimited

# Puter AI API - Multi-Modeles

## Overview
API gratuite et illimitee utilisant Puter.js avec acces a 500+ modeles IA (GPT, Claude, Gemini, Llama, etc.). Aucune cle API requise.

## Project Structure
```
├── index.js              # Serveur Express principal
├── package.json          # Dependances Node.js
├── public/
│   ├── index.html        # Interface avec selecteur de modeles
│   ├── api.html          # Page de reponse HTML
│   └── api-json.html     # Page de reponse JSON
└── replit.md             # Documentation du projet
```

## API Endpoints

### GET /puter?prompt=message&model=model_name
Endpoint principal - retourne la reponse en JSON.
- **prompt**: Le message a envoyer a l'IA
- **model**: Le modele a utiliser (optionnel, defaut: gpt-4.1-nano)

Exemple:
```
GET /puter?prompt=Bonjour&model=claude-sonnet-4
```

Reponse:
```json
{
  "success": true,
  "model": "claude-sonnet-4",
  "prompt": "Bonjour",
  "response": "Bonjour ! Comment puis-je vous aider ?",
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

# AI Agent Orchestrator with n8n

An intelligent dashboard that allows you to generate and manage n8n automation workflows using natural language prompts powered by Google Gemini AI.

## 🚀 Features
- **AI Architect**: Chat-based interface to generate n8n workflows ("Create a daily report at 9 AM").
- **Visual Dashboard**: View and manage your n8n workflows in a modern, dark-themed UI.
- **Auto-Sanitization**: Automatically fixes common structural errors in AI-generated JSON before sending to n8n.
- **Local Integration**: Connects directly to your self-hosted or local n8n instance.

---

## 🛠️ Prerequisites

1.  **Node.js** (v18 or higher)
2.  **npm**
3.  **n8n Instance** (Running locally or via Docker)
4.  **Google Gemini API Key** (Free tier available)

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd tech_expo_project
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:

```bash
# .env.local

# URL of your n8n instance (Must include /api/v1)
N8N_API_URL=http://localhost:5678/api/v1

# Your n8n API Key (Settings > Developer > API Key)
N8N_API_KEY=your_n8n_api_key_here

# Your Google Gemini API Key (https://aistudio.google.com/)
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐳 Setting up n8n with Docker

If you don't have n8n running, the easiest way is via Docker.

### 1. Run n8n Container
Run the following command to start n8n on port `5678`.

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -e GENERIC_TIMEZONE="UTC" \
  -v ~/.n8n:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n
```

### 2. Access n8n
1.  Open [http://localhost:5678](http://localhost:5678).
2.  Set up your owner account.
3.  Go to **Settings** -> **Developer API**.
4.  Copy the **API Key** and paste it into your `.env.local` as `N8N_API_KEY`.

---

## 🧪 Testing & Debugging

### Debugging AI Generation
If you encounter errors like "Model not found", you can verify your Gemini API key and available models using the included script:

```bash
# Install dependencies first if needed
npm install dotenv

# Run the debug script
node scripts/debug_gemini.js
```
This script will test ensuring your API key is valid and tell you which model ID (`gemini-flash-latest`, `gemini-pro`, etc.) is working.

### Debugging n8n Connection
The application logs all interactions with the n8n API to a local file for inspection.
- Check **`api_responses.json`** in the project root to see the exact JSON being sent to and received from n8n.
- If a workflow fails to create, check this file to see if the AI generated valid JSON (e.g., missing `nodes` or `settings`).

---

## 📝 Usage

1.  **Create an Agent**:
    - Click **+ New Agent**.
    - In the chat, type: *"Create a workflow that runs every day at 1 PM and sends a message to Slack."*
    - Click **Generate Workflow**.
2.  **Manual Import**:
    - You can also paste raw n8n JSON schema into the "Manual JSON" tab to import existing workflows.

## ⚠️ Common Issues
- **404 Model Not Found**: Run `node scripts/debug_gemini.js` and update `app/api/ai/generate/route.ts` with the working model name.
- **Workflow Error in n8n**: If n8n says "propertyValues not iterable", the AI might have used an old node version. The system prompt is optimized to avoid this, but you can retry the generation.

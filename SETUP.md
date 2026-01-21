# Chat Bot Setup Instructions

## API Configuration Fixed! ✅

The portfolio chat bot has been updated with a proper backend architecture:

### What Was Changed:
1. **Backend API Proxy** (`api/chat.js`):
   - Created a serverless function to handle Poe API requests
   - API key is now kept secure on the server side
   - Proper CORS headers configured
   - Error handling implemented

2. **Frontend Updates** (`index.html`):
   - Changed API endpoint from `https://poe.com/api/chat` to `/api/chat`
   - Updated request format to send `{message: "..."}`
   - Updated response handling to expect `{reply: "..."}`

3. **Security**:
   - Created `.gitignore` to prevent API key exposure
   - Created `.env.example` as a template

### Setup Your API Key:

#### Option 1: For Codespaces (Current Environment)
```bash
# Set the environment variable in your Codespaces
export POE_API_KEY="your_actual_api_key_here"
```

To make it persistent across Codespaces sessions, add it to your Codespaces secrets:
1. Go to GitHub Settings > Codespaces
2. Add a new secret: `POE_API_KEY`
3. Set the value to your Poe API key from https://poe.com/api_key

#### Option 2: For Local Development
```bash
# Create a .env file
cp .env.example .env

# Edit .env and add your actual API key
POE_API_KEY=your_actual_api_key_here
```

#### Option 3: For Vercel Deployment
1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add: `POE_API_KEY` = your actual API key
4. Deploy!

### Get Your Poe API Key:
1. Go to https://poe.com/api_key
2. Click "Generate API key"
3. Copy the key (it starts with "pk-...")

### Test the Bot:
1. Make sure your API key is set (check with `echo $POE_API_KEY`)
2. Refresh your portfolio page
3. Click the chat button and try asking: "What are Rishi's key skills?"
4. The bot should now respond properly!

### Troubleshooting:
- **Bot not responding**: Check if POE_API_KEY is set in environment
- **CORS errors**: Make sure you're accessing via the Codespaces URL, not localhost
- **404 on /api/chat**: Ensure the api/chat.js file exists and is deployed

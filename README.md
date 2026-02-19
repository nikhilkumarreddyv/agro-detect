# 🌱 Plant AI Doctor

An intelligent plant disease detection web application powered by Google's Gemini Vision AI. Upload photos of your plants and get instant AI-powered diagnoses with treatment recommendations.

## ✨ Features

- **AI-Powered Detection**: Uses Google Gemini Vision API for accurate plant disease identification
- **Instant Analysis**: Get real-time disease detection and severity assessment
- **Treatment Recommendations**: Receive actionable steps to treat your plants
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with SWC
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI API**: Google Gemini Vision API
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v6
- **Testing**: Vitest with Testing Library

## 📋 Prerequisites

- Node.js 18+ or Bun
- A Google Gemini API key (free tier available)

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd plant-ai-doctor-main/plant-ai-doctor-main
```

### 2. Install dependencies

Using npm:
```bash
npm install
```

Or using Bun:
```bash
bun install
```

### 3. Get your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 4. Configure environment variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace `your_api_key_here` with your actual Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

### 5. Start the development server

```bash
npm run dev
```

Or with Bun:
```bash
bun run dev
```

The app will be available at `http://localhost:8080`

## 🎯 Usage

1. Navigate to the **Detect** page
2. Upload or drag-and-drop an image of your plant
3. Click **Analyze Plant** to start the AI analysis
4. View the diagnosis results including:
   - Disease name
   - Confidence level
   - Severity rating
   - Detailed description
   - Treatment recommendations

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/          # shadcn/ui components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── pages/           # Route pages
│   ├── Index.tsx    # Landing page
│   ├── Detect.tsx   # Disease detection page
│   └── NotFound.tsx
├── lib/             # Utility functions
│   ├── plantAI.ts   # AI API integration
│   └── utils.ts
└── hooks/           # Custom React hooks
```

## 🧪 Testing

Run tests:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🔐 Security Notes

- Never commit your `.env` file to version control
- Keep your API key secure and don't share it publicly
- The `.env` file is already included in `.gitignore`
- Use environment variables for all sensitive data

## 📝 API Integration Details

The app uses Google's Gemini 1.5 Flash model for vision-based plant disease detection. The integration:

- Converts uploaded images to base64 format
- Sends images to Gemini Vision API with structured prompts
- Parses AI responses into structured disease information
- Handles errors gracefully with user-friendly messages

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🐛 Troubleshooting

### API Key Issues
- Ensure your API key is correctly set in the `.env` file
- Verify the key starts with `VITE_` prefix for Vite to expose it
- Restart the dev server after changing environment variables

### Build Issues
- Delete `node_modules` and reinstall dependencies
- Clear Vite cache: `rm -rf node_modules/.vite`
- Ensure you're using Node.js 18+

### Image Upload Issues
- Supported formats: JPG, PNG, WEBP
- Recommended image size: Under 5MB
- Ensure clear, well-lit photos of plant leaves

## 🌟 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- AI powered by [Google Gemini](https://deepmind.google/technologies/gemini/)

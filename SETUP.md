# Quick Setup Guide

## Step-by-Step Instructions to Enable AI Integration

### 1. Get Your Free Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **"Get API Key"** or **"Create API Key"**
3. Select **"Create API key in new project"** (or use an existing project)
4. Copy the generated API key

### 2. Add the API Key to Your Project

Open the `.env` file in the project root and replace the placeholder:

```env
VITE_GEMINI_API_KEY=paste_your_actual_api_key_here
```

**Example:**
```env
VITE_GEMINI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. Install Dependencies (if not already done)

```bash
npm install
# or
bun install
```

### 4. Start the Development Server

```bash
npm run dev
# or
bun run dev
```

### 5. Test the AI Integration

1. Open `http://localhost:8080` in your browser
2. Click on **"Detect Disease"** or navigate to `/detect`
3. Upload an image of a plant leaf
4. Click **"Analyze Plant"**
5. Wait 3-5 seconds for the AI analysis
6. View your results!

## ⚠️ Important Notes

- **Restart Required**: After adding/changing the API key, restart the dev server
- **Free Tier**: Gemini API offers generous free tier limits
- **Secure**: Never commit your `.env` file to git (it's already in `.gitignore`)
- **Format**: Images should be clear, well-lit photos of plant leaves

## 🔍 Testing Tips

For best results when testing:
- Use close-up images of plant leaves
- Ensure good lighting
- Focus on areas showing symptoms
- Supported formats: JPG, PNG, WEBP

## 🐛 Troubleshooting

### "API key not configured" Error
- Check that your `.env` file exists in the project root
- Verify the key name is exactly `VITE_GEMINI_API_KEY`
- Restart the dev server after adding the key

### API Request Failed
- Verify your API key is valid
- Check your internet connection
- Ensure you haven't exceeded API rate limits

### Image Upload Issues
- Try a different image format
- Reduce image size if it's very large (> 5MB)
- Ensure the image contains a plant

## 📚 Additional Resources

- [Gemini API Documentation](https://ai.google.dev/docs)
- [API Pricing & Limits](https://ai.google.dev/pricing)
- [Project README](./README.md)

---

**Need Help?** If you encounter issues, check the browser console for error messages.

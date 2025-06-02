# Fortune Cookie App 🥠

A React Native fortune cookie app with AI-powered fortune generation.

## 🚀 Setup Instructions

### 1. Environment Variables

Copy the example environment file and configure your API keys:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```bash
# Google Gemini API Key (Free)
GEMINI_API_KEY=your_gemini_api_key_here

# OpenAI API Key (Optional, paid)
OPENAI_API_KEY=your_openai_api_key_here

# API Timeout
API_TIMEOUT=10000
```

### 2. Get API Keys

**Google Gemini API (Free):**

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy it to your `.env` file

**OpenAI API (Optional, Paid):**

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy it to your `.env` file

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the App

```bash
# For iOS
npm run ios

# For Android
npm run android
```

## 📁 Project Structure

This folder contains the organized source code for the Fortune Cookie app.

## 📂 Directories

### `/components`

React Native components organized by functionality:

- **`PixelCookie.tsx`** - The main cookie component with pixel art styling

  - Handles whole cookie and broken pieces
  - Manages rotation animations
  - Contains all cookie-related styles

- **`FortuneCard.tsx`** - The fortune display component

  - Minimal card design
  - Animated appearance
  - Typography styling

- **`RefreshButton.tsx`** - The top-right refresh button

  - Pixel art styled button
  - Custom CSS icon (no emoji)
  - Handles app reset functionality

- **`index.ts`** - Component exports for clean imports

### `/constants`

Application constants and data:

- **`fortunes.ts`** - Array of Turkish fortune messages

### `/services`

API services and integrations:

- **`aiService.ts`** - AI-powered fortune generation
  - Google Gemini AI integration
  - OpenAI API integration
  - Fallback to local fortunes
  - Environment variable configuration

## 🎯 Benefits of This Structure

- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Components can be easily reused or modified
- **Maintainability**: Easier to find and update specific functionality
- **Cleaner Imports**: Organized import statements
- **Type Safety**: TypeScript interfaces for all components
- **Performance**: Better tree-shaking and bundle optimization
- **Security**: API keys stored in environment variables

## 📱 Component Usage

```typescript
import {PixelCookie, FortuneCard, RefreshButton} from './src/components';
import {fortunes} from './src/constants/fortunes';
import {aiFortuneService} from './src/services/aiService';
```

## 🔧 Environment Variables

The app uses environment variables to securely store API keys. Make sure to:

1. Never commit `.env` files to version control
2. Use `.env.example` as a template for other developers
3. Keep your API keys secure and don't share them publicly

## 📝 Notes

- The app works offline with local fortunes as a fallback
- AI features require internet connection and valid API keys
- Google Gemini API is free with generous limits
- OpenAI API is optional and requires payment

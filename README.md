# 📁 Project Structure

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

## 🎯 Benefits of This Structure

- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Components can be easily reused or modified
- **Maintainability**: Easier to find and update specific functionality
- **Cleaner Imports**: Organized import statements
- **Type Safety**: TypeScript interfaces for all components
- **Performance**: Better tree-shaking and bundle optimization

## 📱 Component Usage

```typescript
import { PixelCookie, FortuneCard, RefreshButton } from "./src/components";
import { fortunes } from "./src/constants/fortunes";
```

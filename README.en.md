# 🤖 Gitty TodoList

> A modern tech-style intelligent task management application

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=flat&logo=tailwind-css)

## ✨ Features

### Core Functions
- ✅ **Task Management** - Add, edit, delete tasks
- ✅ **Task Completion** - Mark tasks as complete with checkbox
- ✅ **Priority System** - High/Medium/Low priorities with different colors
- ⏰ **Time Tracking** - Automatically records task creation time
- 💾 **Data Persistence** - Local storage, data persists after refresh

### Priority Colors
| Priority | Color | Description |
|----------|-------|-------------|
| 🔴 High | Red | Important and urgent tasks |
| 🟡 Medium | Orange | Normal important tasks |
| 🟢 Low | Green | Non-urgent tasks |

### UI Highlights
- 🌟 **Cyberpunk Style** - Dark background with neon glow effects
- 📱 **Responsive Design** - Supports mobile, tablet, and desktop
- ✨ **Smooth Animations** - Buttons and cards with transition effects
- 🎨 **Glassmorphism** - Modern frosted glass visual effects

## 🚀 Quick Start

### Requirements
- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the project
git clone https://github.com/WenOwen/openclaw.git
cd openclaw

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access the App

- Local: http://localhost:3000
- Codespace: https://friendly-space-trout-ggxqxj65457hv7g6-3000.app.github.dev/?vsBrowser=1

## 📖 User Guide

### Adding Tasks
1. Enter task content in the input field
2. Select priority (High/Medium/Low)
3. Click "Add" button or press Enter

### Editing Tasks
1. Click the "Edit" button on the right side of a task
2. Modify task content or priority
3. Click "Save" or "Cancel"

### Deleting Tasks
1. Click the "Delete" button on the right side of a task
2. The task will be immediately removed

### Filtering Tasks
- **All** - Show all tasks
- **Active** - Show incomplete tasks
- **Completed** - Show completed tasks
- **Priority Filter** - Filter by High/Medium/Low

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React useState + useEffect
- **Data Storage**: Browser LocalStorage

## 📁 Project Structure

```
openclaw/
├── app/
│   ├── globals.css      # Global styles (Cyberpunk theme)
│   ├── layout.tsx       # Root layout component
│   └── page.tsx        # Main page component (TodoList logic)
├── public/              # Static assets
├── package.json         # Project config
├── tailwind.config.ts   # Tailwind config
├── tsconfig.json        # TypeScript config
└── next.config.ts       # Next.js config
```

## 🎨 Customization

### Modify Color Theme
Modify color variables in `app/globals.css`:

```css
:root {
  --background: #0a0e27;    /* Background color */
  --accent-blue: #00d4ff;   /* Cyan accent */
  --accent-purple: #b14eff; /* Purple accent */
  --accent-pink: #ff006e;   /* Pink accent */
}
```

### Modify Priority Colors
Modify the `priorityConfig` object in `app/page.tsx`:

```typescript
const priorityConfig = {
  high: { 
    label: 'High', 
    color: 'from-red-600 to-red-500',  // Gradient color
    // ...
  },
  // ...
};
```

## 🔧 Deployment

### Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Changelog

### v1.1.0
- ✅ Added priority filter feature
- ✅ Optimized task color display
- ✅ Added glow effects

### v1.0.0
- ✅ Initial release
- ✅ Basic task management
- ✅ Priority system
- ✅ Cyberpunk UI style

## 🤝 Contributing

Feel free to submit Issues and Pull Requests!

## 📄 License

MIT License

---

**Made with ❤️ by Gitty** 🐙

# 54 Colours of Vietnam (54 Sắc Màu Các Dân Tộc Việt Nam)

An interactive digital cultural museum and learning resource celebrating the heritage, traditional attire, architecture, and cultural spaces of all 54 officially recognised ethnic groups in Vietnam.

Designed for Year 9 / Grade 8 students, teachers, and cultural heritage enthusiasts.

---

## ✨ Features

- **54 Ethnic Groups:** Comprehensive cultural discovery across 5 dimensions: Where They Live, Traditional Homes, Economic Life, Traditions & Culture, and Traditional Costumes (Male & Female).
- **Interactive Cultural Map:** Explore Vietnam's 8 cultural-geographic regions and language families.
- **Audio Experience:** Integrated museum background music with volume adjustment (default 5%) and sticky top toolbar.
- **Visual Archives & 3D AI Generation:** High-resolution cultural photography and optional AI-assisted cultural reconstruction powered by Google Gemini.
- **British English Standard:** Curated vocabulary and educational tone tailored for secondary school pupils.
- **Responsive 16:9 Museum Viewport:** Optimised for school interactive whiteboards, projectors, laptops, and tablets.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### 1. Installation

```bash
git clone <repository-url>
cd Vietnamis54ethnicgroups
npm install
```

### 2. Configure Environment Variables (Optional)

Create a `.env` or `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

> **Note:** The core interactive museum, all 54 ethnic groups, audio player, cultural maps, and regional dioramas are fully functional offline or without an API key. An API key is only required if you wish to generate new real-time 3D AI illustrations.

### 3. Run Locally

```bash
# Start development server
npm run dev

# Or build and test production bundle
npm run build
npm run preview
```

---

## 🌐 Deploy to Vercel

This repository is pre-configured for one-click deployment on [Vercel](https://vercel.com):

1. Push this repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new) and click **"Add New Project"** -> **"Import Git Repository"**.
3. Select your repository.
4. Vercel automatically detects the framework settings:
   - **Framework Preset:** Vite
   - **Build Command:** `vite build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. *(Optional)* In **Settings > Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Google Gemini API key.
6. Click **Deploy**.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Motion (Framer Motion)
- **Icons:** Lucide React
- **Build Tool:** Vite 8
- **Serverless / Backend:** Vercel Serverless Functions / Express / Node.js
- **AI Engine:** Google GenAI SDK (`@google/genai`)

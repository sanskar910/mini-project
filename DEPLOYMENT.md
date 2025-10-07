# Deployment Instructions

## Deploy to Vercel

### Option 1: GitHub Integration (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import from GitHub: `faculty-time-table-portal/mini-project`
5. Configure:
   - Framework Preset: Create React App
   - Root Directory: `my-react-project`
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Navigate to project directory
cd my-react-project

# Deploy
vercel --prod
```

## Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "New site from Git"
4. Choose GitHub and select the repository
5. Configure:
   - Base directory: `my-react-project`
   - Build command: `npm run build`
   - Publish directory: `my-react-project/build`
6. Click "Deploy site"

## Local Development

```bash
cd my-react-project
npm install
npm start
```

The application will be available at `http://localhost:3000`
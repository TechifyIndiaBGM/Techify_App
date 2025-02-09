# Deployment Guide

This guide will help you deploy your Todo application on various platforms.

## Prerequisites
- Node.js v18+ installed
- Git installed
- NPM or Yarn package manager

## General Deployment Steps

1. Build the application:
```bash
npm install
npm run build
```

This will create a `dist` folder containing both the frontend and backend code.

2. Set environment variables:
- `NODE_ENV=production`
- `PORT=5000` (or any port provided by your hosting platform)

3. Start the application:
```bash
npm start
```

## Platform-Specific Instructions

### 1. Railway (Free Tier Available)

1. Create an account on [Railway](https://railway.app)
2. Install Railway CLI:
```bash
npm i -g @railway/cli
```

3. Login to Railway:
```bash
railway login
```

4. Initialize your project:
```bash
railway init
```

5. Deploy:
```bash
railway up
```

### 2. Render (Free Tier Available)

1. Create an account on [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set the following:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: `Node`
   - Plan: Free

### 3. DigitalOcean (Paid)

1. Create a Droplet on [DigitalOcean](https://digitalocean.com)
2. SSH into your server
3. Clone your repository:
```bash
git clone <your-repo-url>
cd <your-project>
```

4. Install dependencies and build:
```bash
npm install
npm run build
```

5. Install PM2 for process management:
```bash
npm install -g pm2
```

6. Start your application:
```bash
pm2 start npm --name "todo-app" -- start
```

7. Setup NGINX as reverse proxy:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. Vercel (Free Tier Available)

1. Create an account on [Vercel](https://vercel.com)
2. Install Vercel CLI:
```bash
npm i -g vercel
```

3. Login to Vercel:
```bash
vercel login
```

4. Deploy:
```bash
vercel
```

## Important Notes

1. Always set your environment variables in your hosting platform's dashboard
2. Make sure to use HTTPS in production
3. Consider adding a process manager like PM2 for better reliability
4. Set up proper monitoring and logging
5. Configure auto-scaling if needed based on your platform

## Troubleshooting

If you encounter any issues:

1. Check the logs on your hosting platform
2. Ensure all environment variables are set correctly
3. Verify the build process completed successfully
4. Check if the port is correctly set and accessible
5. Verify Node.js version compatibility

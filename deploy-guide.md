# Quluub Deployment Guide - Optimized Version

## 🚀 Deployment Options for Optimized Code

### Option 1: Automated GitHub Actions (Recommended)

The GitHub Actions workflow will automatically build and deploy optimized code when you push to main branch.

**Setup Steps:**
1. Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):
   ```
   VITE_API_URL=https://your-backend-url.com/api
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   VITE_GOOGLE_OAUTH_REDIRECT_URL=https://your-frontend-url.com/auth/google/callback
   SERVER_USER=your-server-username
   SERVER_HOST=your-server-ip
   FRONTEND_PATH=/path/to/frontend/on/server
   BACKEND_PATH=/path/to/backend/on/server
   DEPLOY_KEY=your-ssh-private-key
   ```

2. Push to main branch - deployment happens automatically!

### Option 2: Manual Deployment

**Frontend:**
```bash
# Build optimized frontend
npm run build

# Upload dist/ folder to your web server
scp -r dist/* user@server:/var/www/html/
```

**Backend:**
```bash
# Build optimized backend
cd backend
node build.js

# Upload backend/dist/ folder to your server
scp -r dist/* user@server:/opt/quluub-backend/

# On server, install dependencies and start
ssh user@server
cd /opt/quluub-backend
npm install --production
pm2 start server.min.js --name quluub-backend
```

### Option 3: Docker Deployment

```bash
# Frontend Dockerfile (create in root)
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
EXPOSE 80

# Backend uses existing Dockerfile in backend/dist/
cd backend/dist
docker build -t quluub-backend .
docker run -d -p 5000:5000 --env-file .env quluub-backend
```

## 📦 What Gets Optimized

### Frontend Optimizations:
- ✅ JavaScript minified (3.96 MB bundle)
- ✅ CSS optimized (106 KB)
- ✅ Tree-shaking removes unused code
- ✅ Code splitting for better caching

### Backend Optimizations:
- ✅ Server code minified (56% size reduction)
- ✅ Production dependencies only
- ✅ Console logs removed
- ✅ Compression enabled

## 🔧 Server Configuration

### Nginx Configuration (Frontend)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;
    
    # Enable gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### PM2 Configuration (Backend)
```json
{
  "name": "quluub-backend",
  "script": "server.min.js",
  "instances": "max",
  "exec_mode": "cluster",
  "env": {
    "NODE_ENV": "production",
    "PORT": 5000
  },
  "log_file": "/var/log/pm2/quluub.log",
  "error_file": "/var/log/pm2/quluub-error.log",
  "out_file": "/var/log/pm2/quluub-out.log"
}
```

## 🔒 Security Checklist

- [ ] Update all environment variables for production
- [ ] Enable HTTPS with SSL certificates
- [ ] Configure firewall rules
- [ ] Set up database backups
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Use strong JWT secrets

## 📊 Performance Monitoring

After deployment, monitor:
- Response times
- Memory usage
- CPU utilization
- Database performance
- Error rates

The optimized build should show significant improvements in all metrics!

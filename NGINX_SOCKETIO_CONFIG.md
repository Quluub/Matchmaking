# Nginx Configuration for Socket.IO

## Problem
Socket.IO requests are getting 404 errors on production server (`love.quluub.com`) because the reverse proxy is not properly configured to handle Socket.IO traffic.

## Required Nginx Configuration

Add this to your Nginx server block for `love.quluub.com`:

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name love.quluub.com;

    # SSL configuration (if using HTTPS)
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    # Main application proxy
    location / {
        # Handle preflight CORS requests
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Authorization,DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Access-Control-Max-Age' 1728000; # 20 days
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }

        # Add CORS headers to actual requests
        add_header 'Access-Control-Allow-Origin' "$http_origin" always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;

        proxy_pass http://localhost:5000;  # Your Node.js app port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Important for Socket.IO
        proxy_buffering off;
        proxy_read_timeout 86400;
    }

    # Specific Socket.IO configuration
    location /socket.io/ {
        proxy_pass http://localhost:5000;  # Your Node.js app port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Socket.IO specific settings
        proxy_buffering off;
        proxy_read_timeout 86400;
        proxy_send_timeout 86400;
        proxy_connect_timeout 60s;
        
        # Enable WebSocket support
        proxy_set_header Sec-WebSocket-Extensions $http_sec_websocket_extensions;
        proxy_set_header Sec-WebSocket-Key $http_sec_websocket_key;
        proxy_set_header Sec-WebSocket-Version $http_sec_websocket_version;
    }

    # PeerJS configuration (for video calls)
    location /peerjs/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
        proxy_read_timeout 86400;
    }
}
```

## Apache Configuration (Alternative)

If using Apache instead of Nginx:

```apache
<VirtualHost *:80>
<VirtualHost *:443>
    ServerName love.quluub.com
    
    # SSL configuration
    SSLEngine on
    SSLCertificateFile /path/to/your/certificate.crt
    SSLCertificateKeyFile /path/to/your/private.key
    
    # Enable required modules
    LoadModule proxy_module modules/mod_proxy.so
    LoadModule proxy_http_module modules/mod_proxy_http.so
    LoadModule proxy_wstunnel_module modules/mod_proxy_wstunnel.so
    
    # Main proxy
    ProxyPreserveHost On
    ProxyRequests Off
    
    # Socket.IO WebSocket support
    ProxyPass /socket.io/ ws://localhost:5000/socket.io/
    ProxyPassReverse /socket.io/ ws://localhost:5000/socket.io/
    
    # Socket.IO HTTP polling support
    ProxyPass /socket.io/ http://localhost:5000/socket.io/
    ProxyPassReverse /socket.io/ http://localhost:5000/socket.io/
    
    # Main application
    ProxyPass / http://localhost:5000/
    ProxyPassReverse / http://localhost:5000/
    
    # Headers for WebSocket
    RewriteEngine On
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://localhost:5000/$1" [P,L]
</VirtualHost>
```

## Testing the Configuration

1. **Restart your web server:**
   ```bash
   # For Nginx
   sudo systemctl restart nginx
   
   # For Apache
   sudo systemctl restart apache2
   ```

2. **Test Socket.IO endpoint directly:**
   ```bash
   curl -I https://love.quluub.com/socket.io/
   ```
   Should return a 200 status, not 404.

3. **Check WebSocket upgrade:**
   ```bash
   curl -H "Upgrade: websocket" -H "Connection: upgrade" https://love.quluub.com/socket.io/
   ```

## Environment Variables

Make sure your Node.js app has the correct environment variables:

```bash
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://match.quluub.com
```

## Troubleshooting

1. **Check if Node.js app is running:**
   ```bash
   ps aux | grep node
   netstat -tlnp | grep :5000
   ```

2. **Check Nginx/Apache error logs:**
   ```bash
   tail -f /var/log/nginx/error.log
   tail -f /var/log/apache2/error.log
   ```

3. **Test Node.js app directly:**
   ```bash
   curl http://localhost:5000/socket.io/
   ```

## Common Issues

- **Missing WebSocket modules**: Ensure `proxy_wstunnel` (Apache) or proper Nginx WebSocket support
- **Incorrect proxy_pass**: Must match your Node.js app's actual port
- **Missing Connection upgrade headers**: Required for WebSocket handshake
- **Firewall blocking**: Ensure port 5000 is accessible from reverse proxy

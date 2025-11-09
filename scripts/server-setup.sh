#!/bin/bash

################################################################################
# Ubuntu Server Setup Script for BigHearted Labs Website
# Run this script on your Ubuntu server to set up Nginx and configure hosting
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
DOMAIN=""
WWW_DOMAIN=""
EMAIL=""
DEPLOY_USER=$(whoami)

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}BigHearted Labs - Server Setup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Get user input
read -p "Enter your domain name (e.g., bigheartedlabs.com): " DOMAIN
read -p "Enter www domain (e.g., www.bigheartedlabs.com) or press Enter to skip: " WWW_DOMAIN
read -p "Enter your email for SSL certificates: " EMAIL

if [ -z "$DOMAIN" ]; then
    echo -e "${RED}Error: Domain name is required${NC}"
    exit 1
fi

if [ -z "$EMAIL" ]; then
    echo -e "${RED}Error: Email is required${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}Starting server setup...${NC}"
echo ""

# Update system
echo -e "${YELLOW}[1/8] Updating system...${NC}"
sudo apt update && sudo apt upgrade -y

# Install required packages
echo -e "${YELLOW}[2/8] Installing Nginx and other tools...${NC}"
sudo apt install -y nginx certbot python3-certbot-nginx ufw rsync curl

# Configure firewall
echo -e "${YELLOW}[3/8] Configuring firewall...${NC}"
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw --force enable

# Create web directory
echo -e "${YELLOW}[4/8] Creating web directory...${NC}"
sudo mkdir -p /var/www/bigheartedlabs
sudo chown -R $DEPLOY_USER:$DEPLOY_USER /var/www/bigheartedlabs

# Create a simple placeholder page
echo -e "${YELLOW}[5/8] Creating placeholder page...${NC}"
cat > /var/www/bigheartedlabs/index.html <<EOF
<!DOCTYPE html>
<html>
<head>
    <title>BigHearted Labs - Coming Soon</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            text-align: center;
        }
        h1 { font-size: 3em; margin-bottom: 0.5em; }
        p { font-size: 1.5em; }
    </style>
</head>
<body>
    <div class="container">
        <h1>BigHearted Labs</h1>
        <p>Coming Soon</p>
        <p style="font-size: 1em; opacity: 0.8;">Expert Test Automation & CI/CD Solutions</p>
    </div>
</body>
</html>
EOF

# Configure Nginx
echo -e "${YELLOW}[6/8] Configuring Nginx...${NC}"

# Create Nginx configuration
SERVER_NAMES="$DOMAIN"
if [ -n "$WWW_DOMAIN" ]; then
    SERVER_NAMES="$DOMAIN $WWW_DOMAIN"
fi

sudo tee /etc/nginx/sites-available/bigheartedlabs > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $SERVER_NAMES;

    root /var/www/bigheartedlabs;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/rss+xml
        application/atom+xml
        image/svg+xml;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Main location block
    location / {
        try_files \$uri \$uri.html \$uri/ =404;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot|otf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Cache HTML with shorter expiry
    location ~* \.html$ {
        expires 1h;
        add_header Cache-Control "public, must-revalidate";
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Custom error pages
    error_page 404 /404.html;
    location = /404.html {
        internal;
    }

    # Logging
    access_log /var/log/nginx/bigheartedlabs_access.log;
    error_log /var/log/nginx/bigheartedlabs_error.log;
}
EOF

# Enable site
echo -e "${YELLOW}[7/8] Enabling Nginx site...${NC}"
sudo ln -sf /etc/nginx/sites-available/bigheartedlabs /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

# Setup SSL with Let's Encrypt
echo -e "${YELLOW}[8/8] Setting up SSL certificate...${NC}"
echo ""
echo -e "${BLUE}Installing SSL certificate for $SERVER_NAMES${NC}"
echo ""

CERTBOT_DOMAINS="-d $DOMAIN"
if [ -n "$WWW_DOMAIN" ]; then
    CERTBOT_DOMAINS="$CERTBOT_DOMAINS -d $WWW_DOMAIN"
fi

sudo certbot --nginx $CERTBOT_DOMAINS --non-interactive --agree-tos --email $EMAIL --redirect

# Setup automatic renewal
sudo systemctl enable certbot.timer

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Setup completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}Server Information:${NC}"
echo -e "  Domain: $DOMAIN"
if [ -n "$WWW_DOMAIN" ]; then
    echo -e "  WWW Domain: $WWW_DOMAIN"
fi
echo -e "  Web Root: /var/www/bigheartedlabs"
echo -e "  Nginx Config: /etc/nginx/sites-available/bigheartedlabs"
echo -e "  SSL Certificate: Installed and auto-renewal enabled"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo -e "  1. Visit https://$DOMAIN to verify the placeholder page"
echo -e "  2. Deploy your site using the deployment script or GitHub Actions"
echo -e "  3. Set up GitHub secrets for CI/CD:"
echo -e "     - SSH_PRIVATE_KEY: Your private SSH key"
echo -e "     - DEPLOY_HOST: $DOMAIN"
echo -e "     - DEPLOY_USER: $DEPLOY_USER"
echo -e "     - DEPLOY_PATH: /var/www/bigheartedlabs"
echo ""
echo -e "${GREEN}Your server is ready!${NC}"

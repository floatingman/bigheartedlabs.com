#!/bin/bash

################################################################################
# Deployment Script for Big Hearted Labs Website
# This script deploys the static site to your Ubuntu server via SSH
################################################################################

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration - Update these values
SERVER_USER="${DEPLOY_USER:-ubuntu}"
SERVER_HOST="${DEPLOY_HOST:-your-server.com}"
SERVER_PATH="${DEPLOY_PATH:-/var/www/bigheartedlabs}"
SSH_KEY="${SSH_KEY_PATH:-$HOME/.ssh/id_rsa}"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Big Hearted Labs - Deployment Script${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check if out directory exists
if [ ! -d "out" ]; then
    echo -e "${RED}Error: 'out' directory not found. Run 'npm run export' first.${NC}"
    exit 1
fi

# Create backup on server
echo -e "${YELLOW}Creating backup on server...${NC}"
ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_HOST" \
    "sudo mkdir -p ${SERVER_PATH}.backup && \
     sudo rm -rf ${SERVER_PATH}.backup/* && \
     sudo cp -r ${SERVER_PATH}/* ${SERVER_PATH}.backup/ 2>/dev/null || true"

# Create directory if it doesn't exist
echo -e "${YELLOW}Ensuring directory exists on server...${NC}"
ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_HOST" \
    "sudo mkdir -p $SERVER_PATH && sudo chown $SERVER_USER:$SERVER_USER $SERVER_PATH"

# Sync files to server
echo -e "${YELLOW}Syncing files to server...${NC}"
rsync -avz --delete \
    -e "ssh -i $SSH_KEY" \
    --progress \
    ./out/ \
    "$SERVER_USER@$SERVER_HOST:$SERVER_PATH/"

# Set proper permissions
echo -e "${YELLOW}Setting permissions...${NC}"
ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_HOST" \
    "sudo chown -R www-data:www-data $SERVER_PATH && \
     sudo find $SERVER_PATH -type d -exec chmod 755 {} \; && \
     sudo find $SERVER_PATH -type f -exec chmod 644 {} \;"

# Test Nginx configuration
echo -e "${YELLOW}Testing Nginx configuration...${NC}"
ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_HOST" \
    "sudo nginx -t"

# Reload Nginx
echo -e "${YELLOW}Reloading Nginx...${NC}"
ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_HOST" \
    "sudo systemctl reload nginx"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Website URL: https://$SERVER_HOST"
echo -e "Backup location: ${SERVER_PATH}.backup"

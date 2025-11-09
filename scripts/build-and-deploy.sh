#!/bin/bash

################################################################################
# Build and Deploy Script
# This script builds the site locally and deploys it to the server
################################################################################

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Building site...${NC}"
echo -e "${GREEN}========================================${NC}"

# Clean previous build
rm -rf out .next

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
fi

# Build and export
echo -e "${YELLOW}Running build...${NC}"
npm run export

echo ""
echo -e "${GREEN}Build completed! Starting deployment...${NC}"
echo ""

# Run deployment script
bash scripts/deploy.sh

echo ""
echo -e "${GREEN}All done!${NC}"

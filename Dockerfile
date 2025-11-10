# Multi-stage build for Next.js static site
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# Build arguments for environment variables
ARG COMPANY_NAME="Big Hearted Labs"
ARG TAGLINE="Expert Test Automation & CI/CD Solutions"
ARG CONTACT_EMAIL="contact@bigheartedlabs.com"
ARG FOOTER_TEXT="All rights reserved."
ARG NEXT_PUBLIC_CONTACT_WEBHOOK_URL=""

# Set environment variables for Next.js build
ENV COMPANY_NAME=$COMPANY_NAME
ENV TAGLINE=$TAGLINE
ENV CONTACT_EMAIL=$CONTACT_EMAIL
ENV FOOTER_TEXT=$FOOTER_TEXT
ENV NEXT_PUBLIC_CONTACT_WEBHOOK_URL=$NEXT_PUBLIC_CONTACT_WEBHOOK_URL

# Build and export static site
RUN npm run export

# Production stage - serve with nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY config/nginx/nginx-docker.conf /etc/nginx/conf.d/default.conf

# Copy static files from builder
COPY --from=builder /app/out /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

#!/bin/bash

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Usage function
usage() {
    echo "Usage: $0 -d DOMAIN -e EMAIL [-s]"
    echo "  -d DOMAIN    Your domain name (e.g., example.com)"
    echo "  -e EMAIL     Your email for Let's Encrypt notifications"
    echo "  -s           Use staging environment (for testing)"
    exit 1
}

# Parse command line arguments
while getopts "d:e:s" opt; do
    case $opt in
        d) DOMAIN="$OPTARG" ;;
        e) EMAIL="$OPTARG" ;;
        s) STAGING=1 ;;
        *) usage ;;
    esac
done

# Validate required arguments
if [ -z "${DOMAIN}" ] || [ -z "${EMAIL}" ]; then
    echo -e "${RED}❌ Domain and email are required${NC}"
    usage
fi

echo -e "${BLUE}🔒 Setting up SSL for $DOMAIN${NC}"

# Setup nginx configuration with domain
echo -e "${BLUE}⚙️ Configuring nginx...${NC}"
[ ! -f nginx/nginx.conf ] && echo "$(YELLOW)⚠️ nginx/nginx.conf not found. Please create it from the provided template.$(NC)";
[ ! -f nginx/site.conf ] && echo "$(YELLOW)⚠️ nginx/site.conf not found. Please create it from the provided template.$(NC)";

# Create initial nginx config for HTTP-only (for certificate challenge)
cat > nginx/conf.d/default.conf << EOF
server {
    listen 80;
    server_name $DOMAIN;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        proxy_pass http://nextjs:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Start nginx and nextjs (without certbot initially)
echo -e "${BLUE}🚀 Starting services...${NC}"
docker compose up -d nextjs nginx

# Wait for nginx to be ready
echo -e "${BLUE}⏳ Waiting for nginx to be ready...${NC}"
sleep 10

# Request SSL certificate
echo -e "${BLUE}📜 Requesting SSL certificate...${NC}"

if [ $STAGING -eq 1 ]; then
    echo -e "${YELLOW}⚠️ Using Let's Encrypt staging environment${NC}"
    CERTBOT_ARGS="--staging"
else
    CERTBOT_ARGS=""
fi

docker compose run --rm certbot-run certonly \
    -v \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email ${EMAIL} \
    --agree-tos \
    --no-eff-email \
    $CERTBOT_ARGS \
    -d $DOMAIN

# Update nginx config to use SSL
echo -e "${BLUE}🔧 Updating nginx configuration for SSL...${NC}"
sed "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" nginx/site.conf > nginx/conf.d/default.conf

# Restart nginx with SSL configuration
echo -e "${BLUE}🔄 Restarting nginx with SSL...${NC}"
docker compose restart nginx

# Start certbot for auto-renewal
echo -e "${BLUE}🔄 Starting certbot for auto-renewal...${NC}"
docker compose up -d certbot

# Test SSL certificate
echo -e "${BLUE}🧪 Testing SSL certificate...${NC}"
sleep 5

if curl -f -s -I https://$DOMAIN > /dev/null; then
    echo -e "${GREEN}✅ SSL certificate is working!${NC}"
    echo -e "${GREEN}🌐 Your site is now available at: https://$DOMAIN${NC}"
else
    echo -e "${YELLOW}⚠️ SSL test failed, but certificate may still be valid${NC}"
    echo -e "${YELLOW}Please check https://$DOMAIN manually${NC}"
fi

echo -e "${GREEN}✅ SSL setup completed!${NC}"
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

# Setup nginx configuration with domain
echo -e "${BLUE}🔧 Updating nginx configuration for SSL...${NC}"
[ ! -f nginx/nginx.conf ] && echo "$(YELLOW)⚠️ nginx/nginx.conf not found. Please create it from the provided template.$(NC)";
[ ! -f nginx/site.conf ] && echo "$(YELLOW)⚠️ nginx/site.conf not found. Please create it from the provided template.$(NC)";

sed "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" nginx/site.conf > nginx/conf.d/default.conf

echo -e "${GREEN}✅ NGINX setup completed!${NC}"
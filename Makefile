include .env
export

# ============================================================================
# CONFIGURATION VARIABLES
# ============================================================================

UID := $(shell id -u)
GID := $(shell id -g)

# Application Configuration
APP_NAME := lsd3-website
IMAGE_TAG ?= latest
DOMAIN ?= $(shell echo $DOMAIN)
EMAIL ?= $(shell echo $EMAIL)

# Directory Configuration
BACKUP_DIR := ./backups
DATA_DIR := ./data

# Server configuration (set these in .env or export them)
SERVER_USER ?= appuser
SERVER_HOST ?= lsd3
SERVER_PORT ?= 22

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
BLUE := \033[0;34m
NC := \033[0m # No Color

DOCKER_FILES_PROD := -f docker-compose.yml
DOCKER_FILES_DEV := -f docker-compose.dev.yml
DOCKER_FILES_TEST := -f docker-compose.dev.yml

# ============================================================================
# PHONY TARGETS
# ============================================================================
.PHONY: clean clean-all \
	db-create db-drop db-reset \
	dev dev-build dev-down dev-health dev-shell dev-start dev-status dev-stop dev-up \
	help \
	migration-create migration-down migration-force migration-status migration-up \
	nginx-reload nginx-setup nginx-test \
	prod-build prod-down prod-health prod-logs prod-start prod-status prod-stop prod-up \
	ssl-renew ssl-setup ssl-setup-staging ssl-status \
	sync-files \
	test

# ============================================================================
# MAIN TARGETS
# ============================================================================

# Default target
help: ## Show this help message
	@echo "$(BLUE)Next.js Docker Deployment Makefile$(NC)"
	@echo "Usage: make <target>"
	@echo ""
	@echo "$(YELLOW)Main Targets:$(NC)"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST) | grep -E "(dev|build|run|stop|restart|clean|help)"
	@echo ""
	@echo "$(YELLOW)Database Targets:$(NC)"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST) | grep -E "(db-|migration-|backup|restore)"
	@echo ""
	@echo "$(YELLOW)Deployment Targets:$(NC)"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST) | grep -E "(deploy|remote|ssl|nginx)"
	@echo ""
	@echo "$(YELLOW)Monitoring Targets:$(NC)"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST) | grep -E "(health|status|logs|shell)"


# ============================================================================
# DEVELOPMENT TARGETS
# ============================================================================
test: ## Run in test mode
	@echo "$(BLUE)Starting test environment...$(NC)"
	@docker compose $(DOCKER_FILES_TEST) build nextjs postgres
	@docker compose $(DOCKER_FILES_TEST) up -d nextjs postgres

# ============================================================================
# MAINTENANCE TARGETS
# ============================================================================

clean: ## Clean up Docker resources
	@echo "$(YELLOW)Cleaning up Docker resources...$(NC)"
	docker compose down --rmi all --volumes --remove-orphans 2>/dev/null || true
	docker system prune -f
	@echo "$(GREEN)✅ Cleanup completed$(NC)"

clean-all: ## Clean everything including volumes and images
	@echo "$(RED)⚠️  This will remove ALL Docker resources!$(NC)"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		echo ""; \
		docker system prune -a --volumes -f; \
		echo "$(GREEN)✅ Deep cleanup completed$(NC)"; \
	else \
		echo ""; \
		echo "$(YELLOW)Cleanup cancelled$(NC)"; \
	fi

# ============================================================================
# DATABASE MANAGEMENT
# ============================================================================
db-create: ## Create database
	@echo "$(BLUE)Creating database for $(ENV) environment...$(NC)"
	@docker compose -f docker-compose.yml -f docker-compose.$(ENV).yml exec postgres_$(ENV) bash -c 'PGPASSWORD="$(DATABASE_PASSWORD)" createdb -h postgres_$(ENV) -p 5432 -U $(DATABASE_USER) $(DATABASE_NAME)'
	@#docker compose $(DOCKER_FILES_PROD) exec postgres bash -c 'PGPASSWORD="$(DATABASE_PASSWORD)" createdb -h postgres -p 5432 -U $(DATABASE_USER) $(DATABASE_NAME)'
db-drop: ## Drop database
	@docker compose $(DOCKER_FILES_PROD) exec postgres bash -c 'PGPASSWORD="$(DATABASE_PASSWORD)" dropdb -h postgres -p 5432 -U $(DATABASE_USER) $(DATABASE_NAME)'
db-reset: db-drop db-create ## Reset database (drop and create)

# Migration operations
migration-create: ## Create a migration file
	@if [ -z "$(NAME)" ]; then \
		echo "Error: NAME is required. Usage: make migration-create NAME=create_users_table"; \
		exit 1; \
	fi
	@mkdir -p migrations
	@migrate create -ext sql -dir migrations -seq $(NAME)
	@echo "Migration files created for '$(NAME)'"
migration-up: ## Apply all pending migrations
	@docker run --rm -v $(shell pwd)/migrations:/migrations --network lsd3-website_app-network migrate/migrate \
		-path=/migrations \
       	-database "postgresql://$(DATABASE_USER):$(DATABASE_PASSWORD)@postgres:5432/$(DATABASE_NAME)?sslmode=disable" up
	@echo "Migrations applied successfully"
migration-down: ## Rollback migrations
	@docker run --rm -v $(shell pwd)/migrations:/migrations --network lsd3-website_app-network migrate/migrate \
		-path=/migrations \
		-database "postgresql://$(DATABASE_USER):$(DATABASE_PASSWORD)@postgres:5432/$(DATABASE_NAME)?sslmode=disable" down -all
	@echo "Last migration rolled back"
migration-force: ## Fix dirty migrations and force migration version
	@if [ -z "$(VERSION)" ]; then \
		echo "Error: VERSION is required. Usage: make migration-force VERSION=1"; \
		exit 1; \
	fi
	@docker run --rm -v $(shell pwd)/migrations:/migrations --network lsd3-website_app-network migrate/migrate \
    		-path=/migrations \
    		-database "postgresql://$(DATABASE_USER):$(DATABASE_PASSWORD)@postgres:5432/$(DATABASE_NAME)?sslmode=disable" force $(VERSION)
migration-status: ## Check migration status
	@migrate -path migrations -database "postgresql://$(DATABASE_USER):$(DATABASE_PASSWORD)@localhost:$(DATABASE_PORT)/$(DATABASE_NAME)?sslmode=disable" version

# ============================================================================
# DEPLOYMENT TARGETS
# ============================================================================
sync-files: ## Sync application files to remote server
	@if [ -z "$(SERVER_USER)" ] || [ -z "$(SERVER_HOST)" ]; then \
		echo "$(RED)❌ Please set SERVER_USER and SERVER_HOST$(NC)"; \
		exit 1; \
	fi
	@ssh $(SERVER_USER)@$(SERVER_HOST) -p $(SERVER_PORT) 'mkdir -p ~/$(APP_NAME)'
	@rsync -avz --delete \
		--exclude '*.tar' \
		--exclude '*.zip' \
		--exclude '.env*' \
		--exclude '.git' \
		--exclude '.gitignore' \
		--exclude '.idea' \
		--exclude '.next' \
		--exclude '.notes' \
		--exclude 'README.md' \
		--exclude 'backups' \
		--exclude 'certbot' \
		--exclude 'data' \
		--exclude 'docker-compose.dev.yml' \
		--exclude 'next' \
		--exclude 'node_modules' \
		--exclude 'out' \
		./ $(SERVER_USER)@$(SERVER_HOST):~/$(APP_NAME)/


# ============================================================================
# SSL/NGINX MANAGEMENT
# ============================================================================
ssl-renew: ## Manually renew SSL certificates
	@echo "$(BLUE)Renewing SSL certificates...$(NC)"
	@docker compose exec certbot certbot renew
	@docker compose restart nginx
	@echo "$(GREEN)✅ SSL certificates renewed$(NC)"
ssl-setup: ## Setup SSL certificate with Let's Encrypt
	@echo "$(BLUE)Setting up SSL for $(DOMAIN)...$(NC)"
	@chmod +x scripts/ssl-setup.sh
	@./scripts/ssl-setup.sh -d $(DOMAIN) -e $(EMAIL)
ssl-setup-staging: ## Setup SSL certificate with Let's Encrypt (staging)
	@echo "$(BLUE)Setting up SSL for $(DOMAIN) (staging)...$(NC)"
	@chmod +x scripts/ssl-setup.sh
	@./scripts/init-ssl.sh -d $(DOMAIN) -e $(EMAIL) -s
ssl-status: ## Check SSL certificate status
	@if [ -z "$(DOMAIN)" ]; then \
		echo "$(RED)❌ Please set DOMAIN: export DOMAIN=yourdomain.com$(NC)"; \
		exit 1; \
	fi
	@echo "$(BLUE)SSL Certificate Status for $(DOMAIN):$(NC)"
	@docker compose exec certbot certbot certificates
	@echo ""
	@echo "$(BLUE)Certificate expiration check:$(NC)"
	@echo | openssl s_client -servername $(DOMAIN) -connect $(DOMAIN):443 2>/dev/null | openssl x509 -noout -dates

nginx-reload: ## Reload nginx configuration
	@echo "$(BLUE)Reloading nginx configuration...$(NC)"
	@docker compose exec nginx nginx -s reload
	@echo "$(GREEN)✅ Nginx configuration reloaded$(NC)"
nginx-setup:
	@echo "${BLUE}Setting up NGINX/SSL directories...${NC}"
	@[ -d "nginx/conf.d" ] || mkdir -p nginx/conf.d
	@[ -d "certbot/conf" ] || mkdir -p certbot/conf
	@[ -d "certbot/www/.well-known" ] || sudo mkdir -p certbot/www/.well-known/acme-challenge
	@./scripts/setup-nginx.sh
nginx-test: ## Test nginx configuration
	@echo "$(BLUE)Testing nginx configuration...$(NC)"
	@docker compose exec nginx nginx -t

# ============================================================================
# NEW STUFF
# ============================================================================

PROD_FILES=-f ./docker/docker-compose.yml
PROD_DOCKER_ARGS=$(PROD_FILES) --profile prod --env-file .env
DEV_FILES=-f ./docker/docker-compose.dev.yml
DEV_DOCKER_ARGS=$(DEV_FILES) --profile dev --env-file .env

dev-build:
	@docker compose $(DEV_DOCKER_ARGS) build --build-arg TARGET=dev
dev-down:
	@docker compose $(DEV_DOCKER_ARGS) down
dev-stop:
	@docker compose $(DEV_DOCKER_ARGS) stop
dev-up:
	@docker compose $(DEV_DOCKER_ARGS) up
dev-health: ## Check dev application health
	@echo "$(BLUE)Checking application health...$(NC)"
	@if curl -f http://localhost:3000/api/health >/dev/null 2>&1; then \
		echo "$(GREEN)✅ Application is healthy$(NC)"; \
	else \
		echo "$(RED)❌ Application is not responding$(NC)"; \
	fi
dev-shell: ## Open shell in running container
	@docker compose exec nextjs sh
dev-status: ## Show container status
	@echo "$(BLUE)Container Status:$(NC)"
	@docker compose $(DEV_FILES) ps
	@echo ""
	@echo "$(BLUE)Resource Usage:$(NC)"
	@docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}"
dev-start: dev-build dev-down dev-up
dev: dev-start

prod-build:
	docker compose $(PROD_DOCKER_ARGS) build --build-arg TARGET=prod
prod-down:
	docker compose $(PROD_DOCKER_ARGS) down
prod-health: ## Check dev application health
	@echo "$(BLUE)Checking application health...$(NC)"
	@if curl -f https://lordsholtodouglas.com/ >/dev/null 2>&1; then \
		echo "$(GREEN)✅ Application is healthy$(NC)"; \
	else \
		echo "$(RED)❌ Application is not responding$(NC)"; \
	fi
prod-logs:
	docker compose $(PROD_DOCKER_ARGS) logs -f
prod-status: ## Show container status
	@echo "$(BLUE)Container Status:$(NC)"
	@docker compose $(PROD_FILES) ps
	@echo ""
	@echo "$(BLUE)Resource Usage:$(NC)"
	@docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}"
prod-stop:
	docker compose $(PROD_DOCKER_ARGS) stop
prod-up:
	docker compose $(PROD_DOCKER_ARGS) up -d --remove-orphans
prod-start: prod-build prod-stop prod-up

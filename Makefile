include .env
export

UID := $(shell id -u)
GID := $(shell id -g)

# Configuration
APP_NAME := lsd3-website
IMAGE_TAG ?= latest
BACKUP_DIR := ./backups
DATA_DIR := ./data
DATABASEPATH := $(DATA_DIR)/database.sqlite
DOMAIN ?= $(shell echo $DOMAIN)
EMAIL ?= $(shell echo $EMAIL)

# Server configuration (set these in .env or export them)
SERVER_USER ?= $(shell echo $SERVER_USER)
SERVER_HOST ?= $(shell echo $SERVER_HOST)
SERVER_PORT ?= 22

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
BLUE := \033[0;34m
NC := \033[0m # No Color

.PHONY: help build run stop clean logs backup restore deploy deploy-remote setup-vps health

# Default target
help: ## Show this help message
	@echo "$(BLUE)Next.js Docker Deployment Makefile$(NC)"
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST)

dev: ## Run in development mode with hot reload
	@echo "$(BLUE)Starting development server...$(NC)"
	@docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d nextjs postgres

run: ## Run the application locally
	@echo "$(BLUE)Starting application...$(NC)"
	docker compose up --build
	@echo "$(GREEN)✅ Application started at http://localhost:3000$(NC)"

stop: ## Stop the running containers
	@echo "$(YELLOW)Stopping containers...$(NC)"
	docker compose down
	@echo "$(GREEN)✅ Containers stopped$(NC)"

restart: stop run ## Restart the application

# Maintenance targets
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

# Database management
backup: ## Backup SQLite database
	@echo "$(BLUE)Creating database backup...$(NC)"
	@mkdir -p $(BACKUP_DIR)
	@if [ -d "$(DATA_DIR)" ]; then \
		cp -r $(DATA_DIR) $(BACKUP_DIR)/data-$(shell date +%Y%m%d-%H%M%S); \
		echo "$(GREEN)✅ Backup created in $(BACKUP_DIR)$(NC)"; \
	else \
		echo "$(YELLOW)⚠️  No data directory found$(NC)"; \
	fi

backup-remote: ## Create backup on remote server
	@if [ -z "$(SERVER_USER)" ] || [ -z "$(SERVER_HOST)" ]; then \
		echo "$(RED)❌ Please set SERVER_USER and SERVER_HOST$(NC)"; \
		exit 1; \
	fi
	@echo "$(BLUE)Creating backup on remote server...$(NC)"
	ssh $(SERVER_USER)@$(SERVER_HOST) -p $(SERVER_PORT) 'cd ~/$(APP_NAME) && make backup'
	@echo "$(GREEN)✅ Remote backup completed$(NC)"

sync-backups: ## Sync backups from remote server to local
	@if [ -z "$(SERVER_USER)" ] || [ -z "$(SERVER_HOST)" ]; then \
		echo "$(RED)❌ Please set SERVER_USER and SERVER_HOST$(NC)"; \
		exit 1; \
	fi
	@echo "$(BLUE)Syncing backups from remote server...$(NC)"
	@mkdir -p $(BACKUP_DIR)
	@rsync -avz --progress \
		$(SERVER_USER)@$(SERVER_HOST):~/$(APP_NAME)/$(BACKUP_DIR)/ \
		$(BACKUP_DIR)/
	@echo "$(GREEN)✅ Backups synced successfully$(NC)"


restore: ## Restore database from backup (usage: make restore BACKUP=backup-name)
	@if [ -z "$(BACKUP)" ]; then \
		echo "$(RED)❌ Please specify backup: make restore BACKUP=data-20240101-120000$(NC)"; \
		exit 1; \
	fi
	@if [ -d "$(BACKUP_DIR)/$(BACKUP)" ]; then \
		echo "$(YELLOW)Restoring from $(BACKUP)...$(NC)"; \
		rm -rf $(DATA_DIR); \
		cp -r $(BACKUP_DIR)/$(BACKUP) $(DATA_DIR); \
		echo "$(GREEN)✅ Database restored$(NC)"; \
	else \
		echo "$(RED)❌ Backup $(BACKUP) not found$(NC)"; \
	fi

list-backups: ## List available backups
	@echo "$(BLUE)Available backups:$(NC)"
	@ls -la $(BACKUP_DIR)/ 2>/dev/null || echo "$(YELLOW)No backups found$(NC)"

# Production deployment
deploy-remote: sync-files ## Deploy to remote server (builds on server)
	@echo "$(BLUE)Building and deploying on remote server...$(NC)"
	@ssh $(SERVER_USER)@$(SERVER_HOST) -p $(SERVER_PORT) 'cd ~/$(APP_NAME) && make restart'
	@echo "$(GREEN)✅ Remote deployment completed!$(NC)"

# VPS setup
setup-vps: ## Setup VPS with Docker and dependencies
	@if [ -z "$(SERVER_USER)" ] || [ -z "$(SERVER_HOST)" ]; then \
		echo "$(RED)❌ Please set SERVER_USER and SERVER_HOST$(NC)"; \
		exit 1; \
	fi
	@echo "$(BLUE)Transferring setup script to VPS...$(NC)"
	@scp scripts/setup-server.sh $(SERVER_USER)@$(SERVER_HOST):~/
	@echo "$(BLUE)Setting up VPS (will prompt for sudo password)...$(NC)"
	@ssh -t $(SERVER_USER)@$(SERVER_HOST) -p $(SERVER_PORT) 'bash ~/setup-vps.sh'
	@echo "$(GREEN)✅ VPS setup completed!$(NC)"

sync-files: backup-remote ## Sync application files to remote server
	@if [ -z "$(SERVER_USER)" ] || [ -z "$(SERVER_HOST)" ]; then \
		echo "$(RED)❌ Please set SERVER_USER and SERVER_HOST$(NC)"; \
		exit 1; \
	fi
	@echo "$(BLUE)Syncing files to remote server...$(NC)"
	@ssh $(SERVER_USER)@$(SERVER_HOST) -p $(SERVER_PORT) 'mkdir -p ~/$(APP_NAME)'
	@rsync -avz --delete \
		--exclude '*.tar' \
		--exclude '*.zip' \
		--exclude '.git' \
		--exclude '.gitignore' \
		--exclude '.idea' \
		--exclude '.next' \
		--exclude '.notes' \
		--exclude 'README.md' \
		--exclude 'backups' \
		--exclude 'data' \
		--exclude 'certbot' \
		--exclude 'docker-compose.dev.yml' \
		--exclude 'next' \
		--exclude 'node_modules' \
		--exclude 'out' \
		./ $(SERVER_USER)@$(SERVER_HOST):~/$(APP_NAME)/
	@echo "$(GREEN)✅ Files synced successfully$(NC)"

remote-status: ## Check status on remote server
	@if [ -z "$(SERVER_USER)" ] || [ -z "$(SERVER_HOST)" ]; then \
		echo "$(RED)❌ Please set SERVER_USER and SERVER_HOST$(NC)"; \
		exit 1; \
	fi
	ssh $(SERVER_USER)@$(SERVER_HOST) -p $(SERVER_PORT) 'cd ~/$(APP_NAME) && docker compose ps && echo "" && docker stats --no-stream'

# SSL/Nginx management
setup-nginx:
	@echo "${BLUE}Setting up NGINX/SSL directories...${NC}"
	@[ -d "nginx/conf.d" ] || mkdir -p nginx/conf.d
	@[ -d "certbot/conf" ] || mkdir -p certbot/conf
	@[ -d "certbot/www/.well-known" ] || sudo mkdir -p certbot/www/.well-known/acme-challenge
	@./scripts/setup-nginx.sh

setup-ssl: ## Setup SSL certificate with Let's Encrypt
	@echo "$(BLUE)Setting up SSL for $(DOMAIN)...$(NC)"
	@chmod +x scripts/ssl-setup.sh
	@./scripts/ssl-setup.sh -d $(DOMAIN) -e $(EMAIL)

setup-ssl-staging: ## Setup SSL certificate with Let's Encrypt (staging)
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
	echo | openssl s_client -servername $(DOMAIN) -connect $(DOMAIN):443 2>/dev/null | openssl x509 -noout -dates

ssl-renew: ## Manually renew SSL certificates
	@echo "$(BLUE)Renewing SSL certificates...$(NC)"
	@docker compose exec certbot certbot renew
	@docker compose restart nginx
	@echo "$(GREEN)✅ SSL certificates renewed$(NC)"

nginx-reload: ## Reload nginx configuration
	@echo "$(BLUE)Reloading nginx configuration...$(NC)"
	docker compose exec nginx nginx -s reload
	@echo "$(GREEN)✅ Nginx configuration reloaded$(NC)"

nginx-test: ## Test nginx configuration
	@echo "$(BLUE)Testing nginx configuration...$(NC)"
	docker compose exec nginx nginx -t

# Database targets

migration-create:
	@if [ -z "$(NAME)" ]; then \
		echo "Error: NAME is required. Usage: make migration-create NAME=create_users_table"; \
		exit 1; \
	fi
	@mkdir -p db/migrations
	@migrate create -ext sql -dir db/migrations -seq $(NAME)
	@echo "Migration files created for '$(NAME)'"

# Apply all pending migrations
migration-up:
	@migrate -path db/migrations -database "postgresql://$(DATABASE_USER):$(DATABASE_PASSWORD)@localhost:5432/$(DATABASE_NAME)?sslmode=disable" up
	@echo "Migrations applied successfully"

# Rollback the last migration
migration-down:
	@migrate -path db/migrations -database "postgresql://$(DATABASE_USER):$(DATABASE_PASSWORD)@localhost:5432/$(DATABASE_NAME)?sslmode=disable" down
	@echo "Last migration rolled back"

# Check migration status
migration-status:
	@migrate -path db/migrations -database "postgresql://$(DATABASE_USER):$(DATABASE_PASSWORD)@localhost:5432/$(DATABASE_NAME)?sslmode=disable" version

# Create database
db-create:
	@echo "Creating database $(DATABASE_NAME)..."
	@docker compose -f docker-compose.yml -f docker-compose.dev.yml exec postgres createdb -h $(DATABASE_HOST) -p $(DATABASE_PORT) -U $(DATABASE_USER) $(DATABASE_NAME)
	@echo "Database $(DATABASE_NAME) created successfully"

# Drop database
db-drop:
	@echo "Dropping database $(DATABASE_NAME)..."
	@docker compose -f docker-compose.yml -f docker-compose.dev.yml exec postgres dropdb -h $(DATABASE_HOST) -p $(DATABASE_PORT) -U $(DATABASE_USER) $(DATABASE_NAME)
	@echo "Database $(DATABASE_NAME) dropped successfully"

# Reset database (drop and create)
db-reset: db-drop db-create
	@echo "Database $(DATABASE_NAME) reset successfully"

# Run migrations
db-migrate:
	@echo "Running migrations..."
	@docker compose -f docker-compose.yml -f docker-compose.dev.yml exec postgres dropdb -h $(DATABASE_HOST) -p $(DATABASE_PORT) -U $(DATABASE_USER) $(DATABASE_NAME)
	psql -h $(DATABASE_HOST) -p $(DATABASE_PORT) -U $(DATABASE_USER) -d $(DATABASE_NAME) -f db/000001_calendar_events.up.sql

# Seed database
db-seed:
	@echo "Seeding database..."
	@PGPASSWORD=$(DATABASE_PASSWORD) psql -h $(DATABASE_HOST) -p $(DATABASE_PORT) -U $(DATABASE_USER) -d $(DATABASE_NAME) -f seed.sql

# Setup database (create, migrate, and seed)
db-setup: db-create db-migrate db-seed
	@echo "Database setup complete"

.PHONY: db-create db-drop db-reset db-migrate db-seed db-setup

# Health checks
health: ## Check application health
	@echo "$(BLUE)Checking application health...$(NC)"
	@if curl -f http://localhost:3000/api/health >/dev/null 2>&1; then \
		echo "$(GREEN)✅ Application is healthy$(NC)"; \
	else \
		echo "$(RED)❌ Application is not responding$(NC)"; \
	fi

status: ## Show container status
	@echo "$(BLUE)Container Status:$(NC)"
	@docker compose ps
	@echo ""
	@echo "$(BLUE)Resource Usage:$(NC)"
	@docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}"

# Development helpers
shell: ## Open shell in running container
	docker compose exec nextjs sh

# Monitoring
logs: ## Show application logs
	@docker compose logs -f

logs-remote: ## View logs from remote server
	@if [ -z "$(SERVER_USER)" ] || [ -z "$(SERVER_HOST)" ]; then \
		echo "$(RED)❌ Please set SERVER_USER and SERVER_HOST$(NC)"; \
		exit 1; \
	fi
	@ssh $(SERVER_USER)@$(SERVER_HOST) -p $(SERVER_PORT) 'cd ~/$(APP_NAME) && make logs'
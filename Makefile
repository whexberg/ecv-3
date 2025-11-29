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
SERVER_USER := appuser
SERVER_HOST := lsd3
SERVER_PORT := 22

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
BLUE := \033[0;34m
NC := \033[0m # No Color

DOCKER_FILES_PROD := -f docker-compose.yml
DOCKER_FILES_DEV := -f docker-compose.dev.yml
DOCKER_FILES_TEST := -f docker-compose.dev.yml


COMPOSE_FILES:= -f docker/frontend/$(ENVIRONMENT).docker-compose.yml\
	-f docker/traefik/$(ENVIRONMENT).docker-compose.yml
# 	-f docker/wp/$(ENVIRONMENT).docker-compose.yml

_SUCCESS := "\033[32m[%s]\033[0m %s\n" # Green text for "printf"
_ERROR := "\033[31m[%s]\033[0m %s\n" # Red text for "printf"

NETWORK_NAME=app-network

# Check if environment variable is set, otherwise throw an error
ifndef ENVIRONMENT
$(error ENVIRONMENT is not set)
endif

default: down build up

# ============================================================================
# DOCKER MANAGEMENT
# ============================================================================
network-create:
	@if ! docker network inspect $(NETWORK_NAME) >/dev/null 2>&1; then \
		echo "Creating network: $(NETWORK_NAME)"; \
		docker network create $(NETWORK_NAME); \
	fi

# ============================================================================
# DATABASE MANAGEMENT
# ============================================================================
.PHONY: db-create
db-create: ## Create database
	@docker compose -f docker-compose.yml -f docker-compose.$(ENV).yml exec postgres_$(ENV) bash -c 'PGPASSWORD="$(DATABASE_PASSWORD)" createdb -h postgres_$(ENV) -p 5432 -U $(DATABASE_USER) $(DATABASE_NAME)'
	@#docker compose $(DOCKER_FILES_PROD) exec postgres bash -c 'PGPASSWORD="$(DATABASE_PASSWORD)" createdb -h postgres -p 5432 -U $(DATABASE_USER) $(DATABASE_NAME)'

.PHONY: db-drop
db-drop: ## Drop database
	@docker compose $(DOCKER_FILES_PROD) exec postgres bash -c 'PGPASSWORD="$(DATABASE_PASSWORD)" dropdb -h postgres -p 5432 -U $(DATABASE_USER) $(DATABASE_NAME)'

.PHONY: db-reset
db-reset: db-drop db-create ## Reset database (drop and create)
# Migration operations
.PHONY: migration-create
migration-create: ## Create a migration file
	@if [ -z "$(NAME)" ]; then \
		echo "Error: NAME is required. Usage: make migration-create NAME=create_users_table"; \
		exit 1; \
	fi
	@mkdir -p migrations
	@migrate create -ext sql -dir migrations -seq $(NAME)
	@echo "Migration files created for '$(NAME)'"

.PHONY: migration-up
migration-up: ## Apply all pending migrations
	@docker run --rm -v $(shell pwd)/migrations:/migrations --network app-network migrate/migrate \
		-path=/migrations \
       	-database "postgresql://$(DATABASE_USER):$(DATABASE_PASSWORD)@postgres:5432/$(DATABASE_NAME)?sslmode=disable" up
	@echo "Migrations applied successfully"

.PHONY: migration-down
migration-down: ## Rollback migrations
	@docker run --rm -v $(shell pwd)/migrations:/migrations --network app-network migrate/migrate \
		-path=/migrations \
		-database "postgresql://$(DATABASE_USER):$(DATABASE_PASSWORD)@postgres:5432/$(DATABASE_NAME)?sslmode=disable" down -all
	@echo "Last migration rolled back"

.PHONY: migration-force
migration-force: ## Fix dirty migrations and force migration version
	@if [ -z "$(VERSION)" ]; then \
		echo "Error: VERSION is required. Usage: make migration-force VERSION=1"; \
		exit 1; \
	fi
	@docker run --rm -v \
			$(shell pwd)/migrations:/migrations \
			--network app-network migrate/migrate \
    		-path=/migrations \
    		-database "postgresql://$(DATABASE_USER):$(DATABASE_PASSWORD)@postgres:5432/$(DATABASE_NAME)?sslmode=disable" force $(VERSION)

.PHONY: migration-status
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
		--exclude 'backups' \
		--exclude 'certbot' \
		--exclude 'data' \
		--exclude 'docker-compose.dev.yml' \
		--exclude 'docker/traefik/acme.json' \
		--exclude 'next' \
		--exclude 'node_modules' \
		--exclude 'out' \
		--exclude 'README.md' \
		./ $(SERVER_USER)@$(SERVER_HOST):~/$(APP_NAME)/

# ============================================================================
# APP TARGETS
# ============================================================================
.PHONY: build
build:
	@docker compose $(COMPOSE_FILES) build

.PHONY: up
up: network-create
	@docker compose $(COMPOSE_FILES) up -d

.PHONY: down
down:
	@docker compose $(COMPOSE_FILES) down

.PHONY: stop
stop:
	@docker compose $(COMPOSE_FILES) stop

.PHONY: logs
logs:
	@docker compose $(COMPOSE_FILES) logs -f

.PHONY: clean
clean:
	@docker compose $(COMPOSE_FILES) down -v --remove-orphans
	@rm -rf build dist node_modules/.cache

.PHONY: clean-docker
clean-docker: clean
	@docker system prune -af --volumes

.PHONY: clean-all
clean-all: clean-docker
	@rm -rf node_modules
	@rm -rf .next
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
setup:
	@if ! docker network inspect $(NETWORK_NAME) >/dev/null 2>&1; then \
		echo "Creating network: $(NETWORK_NAME)"; \
		docker network create $(NETWORK_NAME); \
	fi

# ============================================================================
# SQLITE TARGETS
# ============================================================================

db-reset:
	@rm -rf ./db/events.db prisma/migrations
	@npx prisma migrate dev --name init
	@npx prisma generate
	@DATABASE_URL=$(DATABASE_URL) npx prisma db seed

# ============================================================================
# APP TARGETS
# ============================================================================
build:
	@docker compose $(COMPOSE_FILES) build

build-fresh:
	@docker compose $(COMPOSE_FILES) build --no-cache

up: setup
	@docker compose $(COMPOSE_FILES) up -d

down:
	@docker compose $(COMPOSE_FILES) down

stop:
	@docker compose $(COMPOSE_FILES) stop

logs:
	@docker compose $(COMPOSE_FILES) logs -f

clean:
	@docker compose $(COMPOSE_FILES) down -v --remove-orphans
	@rm -rf build dist node_modules/.cache

clean-docker: clean
	@docker system prune -af --volumes

clean-all: clean-docker
	@rm -rf node_modules
	@rm -rf .next

# ============================================================================
# DEPLOYMENT TARGETS
# ============================================================================
sync: ## Sync application files to remote server
	@if [ -z "$(SERVER_USER)" ] || [ -z "$(SERVER_HOST)" ]; then \
		echo "$(RED)❌ Please set SERVER_USER and SERVER_HOST$(NC)"; \
		exit 1; \
	fi
	@ssh $(SERVER_USER)@$(SERVER_HOST) -p $(SERVER_PORT) "mkdir -p ~/$(APP_NAME)"
	@rsync -avz --delete --exclude-from=.rsyncignore ./ $(SERVER_USER)@$(SERVER_HOST):~/$(APP_NAME)/


#!/bin/bash
set -e

# Wait for WordPress files to be ready
echo "Waiting for WordPress to be ready..."
sleep 30

# Check if WordPress is already installed
if ! wp core is-installed --path=/var/www/html --allow-root 2>/dev/null; then
	echo "Installing WordPress..."

	# Download WordPress core (if not already present)
	wp core download --path=/var/www/html --allow-root --skip-content || true

	# Create wp-config.php
	wp config create \
		--dbname="$WORDPRESS_DB_NAME" \
		--dbuser="$WORDPRESS_DB_USER" \
		--dbpass="$WORDPRESS_DB_PASSWORD" \
		--dbhost="$WORDPRESS_DB_HOST" \
		--path=/var/www/html \
		--allow-root \
		--force

	# Install WordPress
	wp core install \
		--url="$WP_URL" \
		--title="$WP_TITLE" \
		--admin_user="$WP_ADMIN_USER" \
		--admin_password="$WP_ADMIN_PASSWORD" \
		--admin_email="$WP_ADMIN_EMAIL" \
		--path=/var/www/html \
		--allow-root

	# Install and activate themes/plugins
	echo "Installing themes and plugins..."

	# Example: Install a popular theme
	wp theme install twentytwentyfive --activate --path=/var/www/html --allow-root

	# Example: Install essential plugins
	# wp plugin install wordpress-seo --activate --path=/var/www/html --allow-root
	# wp plugin install contact-form-7 --activate --path=/var/www/html --allow-root
	# wp plugin install wordfence --activate --path=/var/www/html --allow-root

	# Set proper file permissions
	chown -R www-data:www-data /var/www/html
	find /var/www/html -type d -exec chmod 755 {} \;
	find /var/www/html -type f -exec chmod 644 {} \;

	echo "WordPress installation completed!"
else
	echo "WordPress is already installed."
fi

# Start Apache
exec apache2-foreground

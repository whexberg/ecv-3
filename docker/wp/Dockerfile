FROM wordpress:php8.2-apache

# Install system dependencies
RUN apt-get update
RUN apt-get install -y curl less mariadb-client unzip
RUN rm -rf /var/lib/apt/lists/*

# Install WP-CLI
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
RUN chmod +x wp-cli.phar
RUN mv wp-cli.phar /usr/local/bin/wp

# Copy initialization script
COPY docker/wp/calendar-events /var/www/html/wp-content/plugins
COPY docker/wp/wp-init.sh /usr/local/bin/wp-init.sh
RUN chmod +x /usr/local/bin/wp-init.sh
RUN chown -R www-data:www-data /var/www/html

# Use custom entrypoint
ENTRYPOINT ["/usr/local/bin/wp-init.sh"]
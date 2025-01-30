# Base on offical NGINX Alpine image
FROM nginx:alpine

# Create necessary directories for SSL certs and DH params
RUN mkdir -p /etc/nginx
RUN mkdir -p /etc/letsencrypt/live/lordsholtodouglas.com \

# Copy the generated certificates from your local machine to the container
COPY ./conf/certbot/live/lordsholtodouglas.com/fullchain.pem /etc/letsencrypt/live/lordsholtodouglas.com/fullchain.pem
COPY ./conf/certbot/live/lordsholtodouglas.com/privkey.pem /etc/letsencrypt/live/lordsholtodouglas.com/privkey.pem
COPY ./conf/certbot/live/lordsholtodouglas.com/chain.pem /etc/letsencrypt/live/lordsholtodouglas.com/chain.pem
COPY ./conf/certbot/dhparam.pem /etc/nginx/dhparam.pem

# Copy your custom Nginx configuration
#COPY ./conf/nginx /etc/nginx

# Expose port 80 and 443
EXPOSE 80
EXPOSE 443

# Start Nginx when the container runs
#CMD ["nginx", "-g", "daemon off;"]
CMD cat /etc/letsencrypt/live/lordsholtodouglas.com/fullchain.pem
CMD cat /etc/letsencrypt/live/lordsholtodouglas.com/privkey.pem
CMD cat /etc/letsencrypt/live/lordsholtodouglas.com/chain.pem
CMD cat /etc/nginx/dhparam.pem
# Use the official PHP image with Apache
FROM php:8.1-apache

# Copy project files to the container's web directory
COPY . /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port 80 for HTTP
EXPOSE 80

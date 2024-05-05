#!/bin/bash

set -e

if [ -f /docker-entrypoint-initdb.d/create.sql ]; then
    echo "Running creation script..."
    cd /usr/local/bin
    echo "$(ls)"
    mysql -u mysql -p"$MYSQL_ROOT_PASSWORD" < ./create.sql
fi

if [ -f /docker-entrypoint-initdb.d/init.sql ]; then
    echo "Running initialization script..."
    cd /usr/local/bin
    echo "$(ls)"
    mysql -u mysql -p"$MYSQL_ROOT_PASSWORD" < ./init.sql
fi

# Run MySQL entrypoint script
/docker-entrypoint.sh "$@"
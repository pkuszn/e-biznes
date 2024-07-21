#!/bin/bash

CREATE_SCRIPT="/usr/src/app/create_mssql.sql"
INIT_SCRIPT="/usr/src/app/init_mssql.sql"

echo "Waiting for SQL Server to start..."
sleep 30s

echo "Creating the database..."
/opt/mssql-tools/bin/sqlcmd -S tea-shop-db -U sa -P "$SA_PASSWORD" -i "$CREATE_SCRIPT"
echo "Populating database with random data..."
echo "Please wait a moment to ensure that the tables have been created..."
sleep 15s
/opt/mssql-tools/bin/sqlcmd -S tea-shop-db -U sa -P "$SA_PASSWORD" -i "$INIT_SCRIPT"

exec /opt/mssql/bin/sqlservr
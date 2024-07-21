#!/bin/bash

chmod +x /usr/src/app/*.sh
chmod +x /usr/src/app/*.sql
chown mssql /usr/src/app/*.sh
chown mssql /usr/src/app/*.sql

/usr/src/app/run-initialization.sh &

/opt/mssql/bin/sqlservr
FROM mysql:latest

COPY entrypoint.sh /usr/local/bin/

COPY init.sql /usr/local/bin/

COPY create.sql /usr/local/bin/

RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
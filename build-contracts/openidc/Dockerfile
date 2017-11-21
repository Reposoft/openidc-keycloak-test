FROM localhost:5000/reposoft/httpd-openidc

COPY 000-default.conf sites-enabled/

RUN a2enmod \
  headers \
  cgid \
  proxy \
  proxy_http

COPY printenv /usr/lib/cgi-bin

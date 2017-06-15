FROM localhost:5000/reposoft/httpd-openidc

COPY 000-default.conf conf/
RUN echo "Include conf/000-default.conf" >> conf/httpd.conf

RUN sed -i 's/#LoadModule cgid_module/LoadModule cgid_module/' conf/httpd.conf \
  && sed -i 's/#LoadModule proxy_module/LoadModule proxy_module/' conf/httpd.conf \
  && sed -i 's/#LoadModule proxy_http_module/LoadModule proxy_http_module/' conf/httpd.conf \
  && sed -i '1s;^#;#!/usr/bin/perl;' cgi-bin/printenv \
  && chmod a+x cgi-bin/printenv cgi-bin/printenv

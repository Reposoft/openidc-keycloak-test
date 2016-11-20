FROM httpd:2.4

RUN sed -i 's|#LoadModule proxy_module|LoadModule proxy_module|' conf/httpd.conf \
  && sed -i 's|#LoadModule proxy_http_module|LoadModule proxy_http_module|' conf/httpd.conf \
  && sed -i 's|#LoadModule proxy_balancer_module|LoadModule proxy_balancer_module|' conf/httpd.conf \
  && sed -i 's|#LoadModule slotmem_shm_module|LoadModule slotmem_shm_module|' conf/httpd.conf \
  && sed -i 's|#LoadModule lbmethod_byrequests_module|LoadModule lbmethod_byrequests_module|' conf/httpd.conf

RUN echo "Include conf/proxy.conf" >> conf/httpd.conf

COPY proxy.conf conf/

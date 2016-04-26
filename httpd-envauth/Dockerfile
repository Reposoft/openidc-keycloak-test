FROM httpd

ADD mod_auth_env src/mod_auth_env

RUN buildDeps=' \
		gcc \
	' \
	set -x \
	&& apt-get update \
	&& apt-get install -y --no-install-recommends $buildDeps \
	&& rm -r /var/lib/apt/lists/* \
  && cd src/mod_auth_env/ \
  && apxs -c -i mod_auth_env.c \
	&& apt-get purge -y --auto-remove $buildDeps

RUN echo "Include conf/proxied/*.conf" >> conf/httpd.conf

ADD proxied conf/proxied

# To set env from request headers we need mod_rewrite
RUN sed -i 's|^#LoadModule rewrite_module|LoadModule rewrite_module|' conf/httpd.conf

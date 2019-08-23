# debian:buster-slim@sha256:6571c4636d0bb4e4eb0f14f557f8ba9b104fd194dc19241a564d3c3661ea5c30
FROM httpd:2.4.41@sha256:98caed3e3a90ed9db8d25dcbb98eebe0ce56358a9dbbc940d7eb66a8e2b88252

ENV OPENIDC_VERSION 2.4.0
ENV OPENIDC_VERSION_DEB_URL https://github.com/zmartzone/mod_auth_openidc/releases/download/v${OPENIDC_VERSION}/libapache2-mod-auth-openidc_${OPENIDC_VERSION}-1.buster+1_amd64.deb
ENV OPENIDC_VERSION_DEB_SHA1 3a337eed5c902b18249d55a18a970720159edeab

ENV CJOSE_VERSION 0.6.1.5
ENV CJOSE_DEB_URL https://github.com/zmartzone/mod_auth_openidc/releases/download/v2.4.0/libcjose0_${CJOSE_VERSION}-1.buster+1_amd64.deb
ENV CJOSE_DEB_SHA1 d6ca5569bed04a1450e054b3280702f1edfe2ae7

ENV DEBIAN_FRONTEND noninteractive

RUN depsRuntime=" \
    libcurl4 ca-certificates \
    libpcre3 \
    libjansson4 \
    libhiredis0.14 \
    apache2-api-20120211 \
  " \
  && depsBuild=" \
    curl \
  " \
  set -x \
  && apt-get update \
  && apt-get install -y --no-install-recommends $depsRuntime $depsBuild \
  && rm -r /var/lib/apt/lists/* \
  && curl -sLSf "$CJOSE_DEB_URL" -o libcjose.deb \
  && echo "$CJOSE_DEB_SHA1 libcjose.deb" | sha1sum -c - \
  && dpkg -i libcjose.deb \
  && rm libcjose.deb \
  && curl -sLSf "$OPENIDC_VERSION_DEB_URL" -o mod_auth_openidc-$OPENIDC_VERSION.deb \
  && echo "$OPENIDC_VERSION_DEB_SHA1 mod_auth_openidc-$OPENIDC_VERSION.deb" | sha1sum -c - \
  && dpkg -i mod_auth_openidc-$OPENIDC_VERSION.deb \
  && rm mod_auth_openidc-$OPENIDC_VERSION.deb \
  && ln -s /usr/lib/apache2/modules/mod_auth_openidc.so /usr/local/apache2/modules/mod_auth_openidc.so \
  && apt-get purge -y --auto-remove $depsBuild \
  && rm -rf /var/log/dpkg.log /var/log/alternatives.log /var/log/apt

RUN sed -i 's|LoadModule rewrite_module modules/mod_rewrite.so|LoadModule rewrite_module modules/mod_rewrite.so\nLoadModule auth_openidc_module modules/mod_auth_openidc.so|' conf/httpd.conf

ENTRYPOINT ["httpd-foreground"]
RUN set -e; \
  set -x; \
  sed -i 's|^LogLevel warn|Include conf/loglevels.conf|' conf/httpd.conf; \
       for L in warn info debug; do echo "<IfDefine LOGLEVEL=$L>\n  LogLevel $L\n</IfDefine>" >> conf/loglevels.conf; done
CMD [ "-DLOGLEVEL=info" ]

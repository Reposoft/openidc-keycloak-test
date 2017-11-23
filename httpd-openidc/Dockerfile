FROM solsson/httpd-stretch@sha256:bc26155ed0747ab1fc2af6a85e78cd2ffa801ba20488eaa87ad748e1197d0d29

ENV OPENIDC_VERSION 2.3.3
ENV OPENIDC_VERSION_DEB_URL https://github.com/pingidentity/mod_auth_openidc/releases/download/v$OPENIDC_VERSION/libapache2-mod-auth-openidc_$OPENIDC_VERSION-1.jessie.1_amd64.deb
ENV OPENIDC_VERSION_DEB_SHA1 6470b08257f2c7483cdabed343fb2f715194627c

ENV CJOSE_VERSION 0.5.1
ENV CJOSE_DEB_URL https://github.com/pingidentity/mod_auth_openidc/releases/download/v2.3.0/libcjose0_$CJOSE_VERSION-1.jessie.1_amd64.deb
ENV CJOSE_DEB_SHA1 cad77328cf33319e85267a1e9f804912aed3bb5d

ENV DEBIAN_FRONTEND noninteractive

RUN depsRuntime=" \
    libcurl3 ca-certificates \
    libpcre3 \
    libjansson4 \
    libhiredis0.10 \
    apache2-api-20120211 \
  " \
  && depsBuild=" \
    curl \
  " \
  set -x \
  && apt-get update \
  && apt-get install -y --no-install-recommends $depsRuntime \
  && apt-get install -y --no-install-recommends $depsBuild \
  && rm -r /var/lib/apt/lists/* \
  && curl -SL "$CJOSE_DEB_URL" -o libcjose.deb \
  && echo "$CJOSE_DEB_SHA1 libcjose.deb" | sha1sum -c - \
  && dpkg -i libcjose.deb \
  && rm libcjose.deb \
  && curl -SL "$OPENIDC_VERSION_DEB_URL" -o mod_auth_openidc-$OPENIDC_VERSION.deb \
  && echo "$OPENIDC_VERSION_DEB_SHA1 mod_auth_openidc-$OPENIDC_VERSION.deb" | sha1sum -c - \
  && dpkg -i mod_auth_openidc-$OPENIDC_VERSION.deb \
  && rm mod_auth_openidc-$OPENIDC_VERSION.deb \
  && ln -s /usr/lib/apache2/modules/mod_auth_openidc.so /usr/local/apache2/modules/mod_auth_openidc.so \
  && apt-get purge -y --auto-remove $depsBuild

RUN sed -i 's|LoadModule rewrite_module modules/mod_rewrite.so|LoadModule rewrite_module modules/mod_rewrite.so\nLoadModule auth_openidc_module modules/mod_auth_openidc.so|' conf/httpd.conf

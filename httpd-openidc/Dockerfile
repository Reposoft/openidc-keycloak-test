FROM solsson/httpd-stretch@sha256:bc26155ed0747ab1fc2af6a85e78cd2ffa801ba20488eaa87ad748e1197d0d29

ENV OPENIDC_VERSION 2.3.3
ENV OPENIDC_VERSION_DEB_URL https://github.com/zmartzone/mod_auth_openidc/releases/download/v$OPENIDC_VERSION/libapache2-mod-auth-openidc_$OPENIDC_VERSION-1.stretch.1_amd64.deb
ENV OPENIDC_VERSION_DEB_SHA1 453f04d38c90cbb60c914abbaf9a775ab8470a2a

ENV CJOSE_VERSION 0.5.1
ENV CJOSE_DEB_URL https://github.com/zmartzone/mod_auth_openidc/releases/download/v2.3.0/libcjose0_$CJOSE_VERSION-1.stretch.1_amd64.deb
ENV CJOSE_DEB_SHA1 bffa341882615a24df357d8659d1d553afa46abe

ENV DEBIAN_FRONTEND noninteractive

RUN depsRuntime=" \
    libcurl3 ca-certificates \
    libpcre3 \
    libjansson4 \
    libhiredis0.13 \
    apache2-api-20120211 \
  " \
  && depsBuild=" \
    curl \
  " \
  set -x \
  && apt-get update \
  && apt-get install -y --no-install-recommends $depsRuntime $depsBuild \
  && rm -r /var/lib/apt/lists/* \
  && curl -sLS "$CJOSE_DEB_URL" -o libcjose.deb \
  && echo "$CJOSE_DEB_SHA1 libcjose.deb" | sha1sum -c - \
  && dpkg -i libcjose.deb \
  && rm libcjose.deb \
  && curl -sLS "$OPENIDC_VERSION_DEB_URL" -o mod_auth_openidc-$OPENIDC_VERSION.deb \
  && echo "$OPENIDC_VERSION_DEB_SHA1 mod_auth_openidc-$OPENIDC_VERSION.deb" | sha1sum -c - \
  && dpkg -i mod_auth_openidc-$OPENIDC_VERSION.deb \
  && rm mod_auth_openidc-$OPENIDC_VERSION.deb \
  && ln -s /usr/lib/apache2/modules/mod_auth_openidc.so /usr/local/apache2/modules/mod_auth_openidc.so \
  && apt-get purge -y --auto-remove $depsBuild \
  && rm -rf /var/log/dpkg.log /var/log/alternatives.log /var/log/apt

RUN sed -i 's|LoadModule rewrite_module modules/mod_rewrite.so|LoadModule rewrite_module modules/mod_rewrite.so\nLoadModule auth_openidc_module modules/mod_auth_openidc.so|' conf/httpd.conf

RUN set -e; \
  set -x; \
  sed -i 's|^LogLevel warn|Include conf/loglevels.conf|' conf/httpd.conf; \
       for L in warn info debug; do echo "<IfDefine LOGLEVEL=$L>\n  LogLevel $L\n</IfDefine>" >> conf/loglevels.conf; done
CMD ["-DLOGLEVEL=info"]

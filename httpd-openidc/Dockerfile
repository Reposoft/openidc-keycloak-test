FROM debian:stretch-slim@sha256:ea42520331a55094b90f6f6663211d4f5a62c5781673935fe17a4dfced777029

ENV OPENIDC_VERSION 2.3.3
ENV OPENIDC_VERSION_DEB_URL https://github.com/pingidentity/mod_auth_openidc/releases/download/v$OPENIDC_VERSION/libapache2-mod-auth-openidc_$OPENIDC_VERSION-1.stretch.1_amd64.deb
ENV OPENIDC_VERSION_DEB_SHA1 453f04d38c90cbb60c914abbaf9a775ab8470a2a

ENV CJOSE_VERSION 0.5.1
ENV CJOSE_DEB_URL https://github.com/pingidentity/mod_auth_openidc/releases/download/v2.3.0/libcjose0_$CJOSE_VERSION-1.stretch.1_amd64.deb
ENV CJOSE_DEB_SHA1 bffa341882615a24df357d8659d1d553afa46abe

ENV DEBIAN_FRONTEND noninteractive

RUN depsRuntime=" \
    libcurl3 ca-certificates \
    libpcre3 \
    libjansson4 \
    libhiredis0.13 \
    apache2 \
  " \
  && depsBuild=" \
    curl \
  " \
  set -x \
  && apt-get update \
  && apt-get install -y --no-install-recommends $depsRuntime \
  && apt-get install -y --no-install-recommends $depsBuild \
  && curl -sLS "$CJOSE_DEB_URL" -o libcjose.deb \
  && echo "$CJOSE_DEB_SHA1 libcjose.deb" | sha1sum -c - \
  && dpkg -i libcjose.deb \
  && rm libcjose.deb \
  && curl -sLS "$OPENIDC_VERSION_DEB_URL" -o mod_auth_openidc-$OPENIDC_VERSION.deb \
  && echo "$OPENIDC_VERSION_DEB_SHA1 mod_auth_openidc-$OPENIDC_VERSION.deb" | sha1sum -c - \
  && dpkg -i mod_auth_openidc-$OPENIDC_VERSION.deb \
  && a2enmod auth_openidc \
  && rm mod_auth_openidc-$OPENIDC_VERSION.deb \
  && apt-get purge -y --auto-remove $depsBuild \
  && rm -rf /usr/share/man/man1 \
  && rm -r /var/lib/apt/lists/* \
  && rm -rf /var/log/dpkg.log /var/log/alternatives.log /var/log/apt

EXPOSE 80

ENTRYPOINT ["apache2ctl", "-DFOREGROUND"]

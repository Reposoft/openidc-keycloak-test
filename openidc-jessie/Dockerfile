FROM debian:jessie
MAINTAINER hzandbelt@pingidentity.com

RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates libjansson4 apache2 libhiredis0.10

ENV CJOSE_VERSION 0.5.1
ENV CJOSE_PKG libcjose0_${CJOSE_VERSION}-1.jessie.1_amd64.deb
RUN curl -s -L -o ~/${CJOSE_PKG} https://github.com/zmartzone/mod_auth_openidc/releases/download/v2.3.0/${CJOSE_PKG}
RUN dpkg -i ~/${CJOSE_PKG} && echo ok || echo ko

ENV MOD_AUTH_OPENIDC_VERSION 2.3.0
ENV MOD_AUTH_OPENIDC_PKG libapache2-mod-auth-openidc_${MOD_AUTH_OPENIDC_VERSION}-1.jessie.1_amd64.deb
RUN curl -s -L -o ~/${MOD_AUTH_OPENIDC_PKG} https://github.com/zmartzone/mod_auth_openidc/releases/download/v${MOD_AUTH_OPENIDC_VERSION}/${MOD_AUTH_OPENIDC_PKG}
RUN dpkg -i ~/${MOD_AUTH_OPENIDC_PKG} && echo ok || echo ko

ADD 000-default.conf /etc/apache2/sites-available/
RUN a2enmod auth_openidc
#RUN service apache2 start && curl -v http://localhost/protected/index.php 2>&1 | grep "Location:" | grep "accounts.google.com/o/oauth2/auth"

# Above is from pingdentity Dockerfile's content, below is not
EXPOSE 80
ADD httpd-foreground /usr/local/bin/
ENTRYPOINT ["httpd-foreground"]

# Invalid Mutex directory in argument file:/var/lock/apache2
RUN mkdir -p /var/lock/apache2
# AH00100: apache2: could not log pid to file /var/run/apache2/apache2.pid
RUN mkdir -p /var/run/apache2

RUN a2enmod headers

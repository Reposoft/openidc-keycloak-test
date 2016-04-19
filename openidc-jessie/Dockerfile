FROM debian:jessie
MAINTAINER hzandbelt@pingidentity.com

ENV VERSION 1.8.8
ENV PATCHLEVEL 1
ENV PKG libapache2-mod-auth-openidc_${VERSION}-${PATCHLEVEL}_amd64.deb

RUN apt-get update && apt-get install -y curl apache2 libjansson4 libhiredis0.10
RUN curl -s -L -o ~/${PKG} https://mod-auth-openidc.org/download/${PKG}
RUN dpkg -i ~/${PKG} && echo ok || echo ko

RUN apt-get install -y -f
ADD 000-default.conf /etc/apache2/sites-available/

RUN a2enmod auth_openidc
RUN service apache2 start && curl -v http://localhost/protected/index.php 2>&1 | grep "Location:" | grep "accounts.google.com/o/oauth2/auth"

# Above is from pingdentity Dockerfile's content, below is not
EXPOSE 80
ADD httpd-foreground /usr/local/bin/
ENTRYPOINT ["httpd-foreground"]

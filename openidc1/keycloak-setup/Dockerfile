
FROM debian:jessie

RUN apt-get update \
  && apt-get install -y --no-install-recommends curl

ADD import.sh /usr/local/bin/

VOLUME /export

ENTRYPOINT ["import.sh"]

FROM jboss/keycloak-mysql:2.3.0.Final

CMD ["-b", "0.0.0.0", "--server-config", "standalone-ha.xml"]

RUN rm keycloak/standalone/configuration/standalone.xml

ADD standalone-ha.xml keycloak/standalone/configuration/standalone-ha.xml

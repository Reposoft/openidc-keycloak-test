# openidc-keycloak-test

Demonstrates [Keycloak](http://keycloak.jboss.org/) and [mod_auth_openidc](https://github.com/pingidentity/mod_auth_openidc/) working together. See also https://github.com/pingidentity/mod_auth_openidc/wiki/Keycloak.

Requirements:
 * Docker Compose >=1.7.0

See [docker-compose.yml](https://github.com/Reposoft/openidc-keycloak-test/blob/master/openidc1/docker-compose.yml) in the [openidc1](https://github.com/Reposoft/openidc-keycloak-test/tree/master/openidc1) folder.

Might be run like this:
```
docker-compose up --build -d postgres keycloak openidc keycloak-setup
docker-compose up --build -d testclient
docker-compose logs -f
```

If you can access `ports` locally, access the example site at http://openidc/, with something like this in `/etc/hosts` (IP being you docker machine's):
```
192.168.99.100 keycloak
192.168.99.100 openidc
```

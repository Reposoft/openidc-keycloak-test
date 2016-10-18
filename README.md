# openidc-keycloak-test

Demonstrates [Keycloak](http://keycloak.jboss.org/) and [mod_auth_openidc](https://github.com/pingidentity/mod_auth_openidc/) working together. See also https://github.com/pingidentity/mod_auth_openidc/wiki/Keycloak.

Requirements:
 * Docker Compose >=1.7.0

See [docker-compose.yml](https://github.com/Reposoft/openidc-keycloak-test/blob/master/build-contracts/docker-compose.yml) in the [openidc1](https://github.com/Reposoft/openidc-keycloak-test/tree/master/build-contracts) folder.

Might be run like this:
```
docker-compose up --build -d postgres keycloak openidc
docker-compose up --build keycloak-setup #TODO
docker-compose up --build -d testclient
docker-compose logs -f
```

Until setup is fully automated see echo:s in [testclient1/keycloak-setup/import.sh](https://github.com/Reposoft/openidc-keycloak-test/blob/keycloak-setup-import/build-contracts/keycloak-setup/import.sh).

If you can access `ports` locally, access the example site at http://openidc/, with something like this in `/etc/hosts` (IP being you docker machine's):
```
127.0.0.1 keycloak
127.0.0.1 openidc
```

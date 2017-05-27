const expect = require('chai').expect;

// see https://github.com/keycloak/keycloak-nodejs-auth-utils/blob/master/test/integration/grant-manager-spec.js
const KeycloakAuth = require('keycloak-auth-utils');



describe("Admin access", function() {

  describe("Authenticate as admin:openidctest", function() {

  });


});

describe("Testrealm access (if import passed)", function() {

  describe("Authenticate as test1:test1", function() {

    var grant;

    it("Gets a token", function() {
      const config = new KeycloakAuth.Config('./keycloak-test1.json');
      const manager = new KeycloakAuth.GrantManager(config);

      return manager.obtainDirectly('test1', 'test1').then((g) => grant = g);
    });

    it("Contains interesting stuff", function() {
      expect(grant).to.be.an('object').and.have.a.property('access_token');
      console.log(JSON.stringify(grant.access_token.content, null, '  '));
    });

    it("Contains more interesting stuff", function() {
      expect(grant).to.have.a.property('id_token');
      expect(grant).to.have.a.property('refresh_token');
    });

  });

});

const expect = require('chai').expect;

// see https://github.com/keycloak/keycloak-nodejs-auth-utils/blob/master/test/integration/grant-manager-spec.js
const KeycloakAuth = require('keycloak-auth-utils');



describe("Admin access", function() {

  describe("Authenticate as admin:openidctest", function() {

  });


});

describe("Testrealm access (if import passed)", function() {

  describe("Authenticate as test1:test1", function() {

    var token;

    it("Gets a token", function(done) {
      const config = new KeycloakAuth.Config('./keycloak-test1.json');
      const manager = new KeycloakAuth.GrantManager(config);

      var auth = manager.obtainDirectly('test1', 'test1')
        .then((grant) => expect(grant).to.be.an('object').and.have.a.property('access_token'))
        .then((access) => token = access);
    });

    it("Contains interesting stuff", function() {
      console.log(JSON.stringify(token, null, '  '));
    });

  });

});

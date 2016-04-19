
var rp = require('request-promise');

describe("Apache with mod_auth_openidc to Keycloak", function() {

  it("The test should be able to access keycloak", function() {
    return rp('http://keycloak:8080/');
  });

  it("The test should be able to access apache", function() {
    return rp('http://openidc/');
  });

});

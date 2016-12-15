
var ajaxtestGET = function(log, withXRequestedWith) {
  $.ajax({
    url: '/protected/?crossDomain=' + !withXRequestedWith,
    crossDomain: !withXRequestedWith
  }).fail(function( jqXHR, textStatus, errorThrown ) {
    console.log('Fail', jqXHR, textStatus, errorThrown);
    log('AJAX failed');
  }).done(function( data, textStatus, jqXHR ) {
    var h = jqXHR.getAllResponseHeaders();
    if (h['Set-Cookie']) {
      log('HEAD request got cookie change: ' + h['Set-Cookie']);
    }
    log('AJAX ok');
  });
};

var ajaxtestHEADthenGET = function(log) {
  $.ajax({
    method: 'HEAD',
    url: '/protected/',
    crossDomain: true
  }).fail(function( jqXHR, textStatus, errorThrown ) {
    console.log('Fail', jqXHR, textStatus, errorThrown);
    log('AJAX HEAD request failed, status ' + jqXHR.status + ' ' + textStatus);
    // try the GET request, expect redirect
    ajaxtestGET(log);
  }).done(function( data, textStatus, jqXHR ) {
    if (jqXHR.status !== 200) {
      log('HEAD request got status ' + jqXHR.status);
    }
    var h = jqXHR.getAllResponseHeaders();
    if (h['Set-Cookie']) {
      log('HEAD request got cookie change: ' + h['Set-Cookie']);
    }
    ajaxtestGET(log);
  });
};

var ajaxtest = ajaxtestGET;
var ajaxinterval = 60000;

$(document).ready(function() {

  var log = function(msg) {
    $e = $('#log');
    $e.find('.old4').addClass('old5');
    $e.find('.old3').addClass('old4');
    $e.find('.old2').addClass('old3');
    $e.find('.old').addClass('old2');
    $e.find('> *').addClass('old');
    var $li = $('<li/>').text(msg).appendTo($e);
    $('<span/>').addClass('timestamp').text(new Date().toISOString()).prependTo($li);
  }

  log('Running an AJAX test every ' + ajaxinterval + 'ms');
  ajaxtest(log);
  setInterval(ajaxtest.bind(null, log, false), ajaxinterval);
  setTimeout(ajaxtest.bind(null, log, true), ajaxinterval / 2);

});

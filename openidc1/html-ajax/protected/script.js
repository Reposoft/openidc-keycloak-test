
var ajaxinterval = 5000;

var ajaxtest = function(log) {
  $.ajax({
    url: '/protected/'
  }).fail(function( jqXHR, textStatus, errorThrown ) {
    console.log('Fail', jqXHR, textStatus, errorThrown);
    log('AJAX failed');
  }).done(function( data, textStatus, jqXHR ) {
    var h = jqXHR.getAllResponseHeaders();
    var setcookie = h['Set-Cookie'];
    console.log('Ok', jqXHR, textStatus);
    log('AJAX ok' + (setcookie ? '. Got cookie: ' + setcookie : ''));
  });
};

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
  setInterval(ajaxtest.bind(null, log), ajaxinterval);

});

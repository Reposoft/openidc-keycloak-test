
var ajaxtest = function(log) {
  $.ajax({
    url: '/protected/'
  }).fail(function( jqXHR, textStatus, errorThrown ) {
    console.log('Fail', jqXHR, textStatus, errorThrown);
    log('AJAX failed');
  }).done(function( data, textStatus, jqXHR ) {
    var h = jqXHR.getAllResponseHeaders();
    console.log('Ok', jqXHR, textStatus, h);
    log('AJAX ok');
  });
};

$(document).ready(function() {

  var log = function(msg) {
    $e = $('#log');
    $e.find('.old').addClass('older');
    $e.find('> *').addClass('old');
    var $li = $('<li/>').text(msg).appendTo($e);
    $('<span/>').addClass('timestamp').text(new Date().toISOString()).prependTo($li);
  }

  var t = 0;
  for (; t <= 5000; t += 1000) {
    setTimeout(ajaxtest.bind(null, log), t);
  }
  setTimeout(function() {
    log('test completed');
  }, t+1);

});

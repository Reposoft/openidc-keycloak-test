
var ajaxtest = function(log) {
  $.ajax({
    url: '/protected/'
  }).fail(function( jqXHR, textStatus, errorThrown ) {
    console.log('Fail', jqXHR, textStatus, errorThrown);
    log.append('<li>AJAX failed</li>');
  }).done(function( data, textStatus, jqXHR ) {
    var h = jqXHR.getAllResponseHeaders();
    console.log('Ok', jqXHR, textStatus, h);
    log.append('<li>AJAX ok</li>');
  });
};

$(document).ready(function() {

  var log = $('#log');

  var t = 0;
  for (; t <= 5000; t += 1000) {
    setTimeout(ajaxtest.bind(null, log), t);
  }
  setTimeout(function() {
    log.append('<li>test completed</li>');
  }, t+1);

});

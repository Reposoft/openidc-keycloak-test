

var ajaxtest = function () {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function () {
    console.log(this.responseText);
  });
  oReq.open('GET', '/protected');
  oReq.send();
};

var ajaxinterval = 0;
var ajaxtimer = 1000;

$(document).ready(function() {

  $.ajaxSetup({
    beforeSend: function(jqXHR, settings) {
        jqXHR.setRequestHeader('X-Requested-With', '');
    }
  });

  var log = function(msg) {
    $e = $('#log');
    $e.find('.old4').addClass('old5');
    $e.find('.old3').addClass('old4');
    $e.find('.old2').addClass('old3');
    $e.find('.old').addClass('old2');
    $e.find('> *').addClass('old');
    var $li = $('<li/>').text(msg).appendTo($e);
    $('<span/>').addClass('timestamp').text(new Date().toISOString()).prependTo($li);
    console.log(msg);
  };

  log('Running an AJAX test every ' + ajaxinterval + 'ms');
  ajaxtest(log);
  var id = setInterval(ajaxtest.bind(null, log), ajaxinterval);
  setTimeout(clearInterval.bind(null, id), ajaxtimer);

});

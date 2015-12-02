$(document).ready(function() {
  setTimeout(function(){
    var width = 820;
    function newPos(w) {
      var rand = Math.floor(Math.random() * width + 1);

      return (rand + 150) > width ? (rand - 150) : rand;
    }

    var i = 1;
    function newMeteor(n) {
      var a = $('body').append('<div id="meteor-' + n + '" style="left:' + newPos(width) + 'px" class="meteor"><svg height="100" width="100"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:rgb(248,182,45);stop-opacity:0.7" /><stop offset="30%" style="stop-color:rgb(248,182,45);stop-opacity:0.2" /><stop offset="100%" style="stop-color:rgb(248,182,45);stop-opacity:0" /></linearGradient></defs><line stroke-linecap="round" x1="10" y1="90" x2="90" y2="10" style="stroke:url(#grad1);stroke-width:10;" /></svg></div>');
      setTimeout(function() {
        $('#meteor-' + n).remove();
      }, 1500);
    }

    setInterval(function() {
      newMeteor(i);
      i++;
    }, 1000);
  }, 1000);
});

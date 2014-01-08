var dots = $('.dot');
var TIMEFRAME = 1;
var MAX_HEIGHT = 11;
var MIN_HEIGHT = 1;
var MAX_COLOR = 8;
var MIN_COLOR = 1;
var COLOR = '189,195,199'; // RGB
dots.each(function (i) {
  $(this).css({ 'margin-left': (i * 1) + 'em'});
});
setInterval(function () {
  dots.each(function () {
    var height = Math.floor((Math.random() * MAX_HEIGHT) + MIN_HEIGHT);
    $(this).css({ 
      height: height + 'em', 
      top: '-' + height/2 + 'em',
      background: 'rgba('+ COLOR +',.' + Math.floor((Math.random() * MAX_COLOR) + MIN_COLOR) + ')'
    });
  });
}, 1000 * TIMEFRAME);    
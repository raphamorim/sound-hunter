var screenStatus = 0;

function sayThis(speech)
{
    //Start a animation of loading search

    var query = speech
      , url = 'http://gdata.youtube.com/feeds/api/videos?q=' + query + '&alt=json&max-results=15';

    $.getJSON(url, function (data) {

        var feed = data.feed;
        var entries = feed.entry || [];
        var results = [];

        console.log(query);

        results = '<a id="reSearch">Try another music</a><br><br><br>';

        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            var title = entry.title.$t;
            var thumb = entry.media$group.media$thumbnail[0].url;
            var file = entry.media$group.media$content[0].url;

            if (entry.category[1].term === "Music")
                results += '<p videoid="' + file + '" ><img src="' + thumb + '"/>' +
                    '<br>' + title.substring(0,60); + '</p>';

            if (screenStatus === 1 && i >= 3)
                break;
        }

        $('footer').hide();
        $('.search').fadeOut(300, function(){
            $('#results').fadeIn(2000).css('margin-top', '40px').html(results);
        });

    });

}

$("#results").on('click', 'p', function() {
    this.file = $(this).attr("videoid");
    $(this).html('<embed width="250" height="230" src="' + this.file +
        '&autoplay=1&showsearch=0&iv_load_policy=3&fs=0&rel=0&loop=1"' +
         ' type="application/x-shockwave-flash"></embed>');
});

$("#results").on('click', '#reSearch', function() {
    $('#results').fadeOut(300, function(){
        $('footer').show();
        $('.search').fadeIn(600);
    });
});

function launchFullScreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }

  screenStatus = 1;
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }

  screenStatus = 0;
}

$('#screen').click(function(){
    if (screenStatus === 0) {
        launchFullScreen(document.querySelector('body'));
        $(this).html('<a href="#" title="Exit Full Screen"><img src="img/icon-fullscreen_exit-128.png" height="35"></a>');
    }
    else {
        exitFullscreen();
        $(this).html('<a href="#" title="Set Full Screen"><img src="img/icon-fullscreen-128.png" height="35"></a>');
    }
});
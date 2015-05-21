// If browser is chrome
var is_chrome = window.chrome;

// How to obtain the api key
// https://developers.google.com/youtube/v3/getting-started
var api_key = 'my-api-key';

window.onload = function(){
    if(!is_chrome) {
        $('h3').text('This is an experiment for chrome, please use the chrome as browser');
        $('.search').hide();
    }
}

// Speech Functions
var recognition = new webkitSpeechRecognition();
recognition.onstart = function() {
    $('.search').fadeOut(300, function() {
        $('.recording').fadeIn(300);
    });
};
recognition.onend = function() {
    $('.recording').fadeOut(300);
};
recognition.onresult = function(event) {
    sayThis(event.results[0][0].transcript, api_key);
};

// Btn to start get audio function
$('.main').on('click', '.sound', function() {
    recognition.start();
});

// Where magic happens :)
function sayThis(speech, api_key) {
    var url = 'https://www.googleapis.com/youtube/v3/search?key='+api_key+
                '&part=snippet&q='+speech+'&maxResults=20&type=video&videoCategoryId=10';

    $.getJSON(url, function(data) {
        var items = data.items || [];
        var results = [];

        results.push('<a id="reSearch">Try another music</a><br><br><br>');

        var i;
        for (i in items) {
            var item    = items[i];
            var snippet = item.snippet;
            var thumb   = snippet.thumbnails.default.url;
            var file    = 'http://youtube.com/v/'+item.id.videoId;
            results.push('<p videoid="' + file + '" ><img src="' + thumb + '"/>' + '<br>' + snippet.title.substring(0, 60) + '</p>');
        }

        $('footer').hide();
        $('.search').fadeOut(300, function() {
            $('#results').fadeIn(2000).css('margin-top', '40px').html(results.join(''));
        });
    });
}

// Btn to play video
$("#results").on('click', 'p', function() {
    this.file = $(this).attr("videoid");
    $(this).html('<embed width="250" height="230" src="' + this.file +
        '&autoplay=1&showsearch=0&iv_load_policy=3&fs=0&rel=0&loop=1"' +
        ' type="application/x-shockwave-flash"></embed>');
});

// Btn to return to begin
$("#results").on('click', '#reSearch', function() {
    $('#results').fadeOut(300, function() {
        $('footer').show();
        $('.search').fadeIn(600);
    });
});

// Launch Full Screen function
function launchFullScreen() {
    var el = document.querySelector('html');

    if (el.requestFullscreen) {
        el.requestFullscreen();
    } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
    } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
    } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
    }
}

// Exit Full Screen function
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

// Set or exit Full Screen
$('#screen').click(function() {
    var fullscreenStatus = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

    if (fullscreenStatus === null) {
        launchFullScreen();
        $(this).prop('title', 'Exit full screen');
        $(this).html('<img src="img/icon-fullscreen_exit-128.png" height="35">');
    } else {
        exitFullscreen();
        $(this).prop('title', 'Set full screen');
        $(this).html('<img src="img/icon-fullscreen-128.png" height="35">');
    }
});

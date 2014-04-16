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
    sayThis(event.results[0][0].transcript);
};

// Btn to start get audio function
$('.main').on('click', '.sound', function() {
    recognition.start();
});

// Where magic happens :)
function sayThis(speech) {

    var query = speech,
        url = 'http://gdata.youtube.com/feeds/api/videos?q=' + query + '&alt=json&max-results=20';

    $.getJSON(url, function(data) {

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
                    '<br>' + title.substring(0, 60); + '</p>';

        }

        $('footer').hide();
        $('.search').fadeOut(300, function() {
            $('#results').fadeIn(2000).css('margin-top', '40px').html(results);
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

// Full Screen status
var screenStatus = 0;

// Launch Full Screen function
function launchFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }

    screenStatus = 1;
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

    screenStatus = 0;
}

// Set or exit Full Screen
$('#screen').click(function() {
    if (screenStatus === 0) {
        launchFullScreen(document.querySelector('html'));
        $(this).prop('title', 'Exit full screen');
        $(this).html('<img src="img/icon-fullscreen_exit-128.png" height="35">');
    } else {
        exitFullscreen();
        $(this).prop('title', 'Set full screen');
        $(this).html('<img src="img/icon-fullscreen-128.png" height="35">');
    }
});
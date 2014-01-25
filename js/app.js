


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

        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            var title = entry.title.$t;
            var link = entry.link[0].href;
            var thumb = entry.media$group.media$thumbnail[0].url;

            if (entry.category[1].term === "Music")
                results += '<p><img src="' + thumb + '"/><br><a href="' + link + '" target="_blank">' + title.substring(0,60); + '</a></p>';
        }

        if (results.length > 0) {

            $('footer').hide();
            $('.search').fadeOut(300, function(){
                $('#results').fadeIn(2000).css('margin-top', '40px').html(results);
            });

        }
        else {
            $('#results').fadeIn(2000).html('<br>No results found, please try again');
        }

    });

}
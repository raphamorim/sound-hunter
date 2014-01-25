function sayThis(speech)
{
    alert("Beginning the hunt for: " + speech);

    url = 'musics.json';

    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function ( response ) {
            cont = 0;

            json = response.musics;

            $.each(json, function(index, music){
                if(speech.toUpperCase() == music.Name.toUpperCase()){
                    alert(music.Name + " - by " + music.Artist);
                    cont++;
                }
         });

         if(cont == 0)
            alert("No music found, may not exist in the database.")

         cont = 0;
      }

     });
}
$(document).on('click', '.search', function() {
    var search = 'django';
    $.ajax({
        url: "/api/youtube/videos?query=" + search
    })
        .done(function( data ) {
            console.log(data);
            buildVideoAccordion(data);
            $('#search-term').text(search);
        });
});

function buildVideoAccordion(videos){
    var items = videos['items'];
    var i;

    var videosAccordion = $('#videos-accordion');
    videosAccordion.empty();

    for (i = 0; i < items.length; i++) {
        item = items[i];

        //Build accordion button
        var button = $("<button>");
        button.addClass("accordion");
        var table = $("<table>");
        var row = $("<tr>");
        var title = $("<td>");
        title.text(item['snippet']['title']);
        var channel = $("<td>");
        channel.text(item['snippet']['channelTitle']);
        var published = $("<td>");
        published.addClass("date");
        var publishedAt = new Date(item['snippet']['publishedAt']);
        console.log(publishedAt);
        publishedAt = publishedAt.toLocaleString("en-US",  { year: 'numeric', month: 'long', day: 'numeric' });
        console.log(publishedAt);
        console.log(publishedAt.toString());
        published.text(publishedAt);
        row.append(title);
        row.append(channel);
        row.append(published);
        table.append(row);
        button.append(table);

        //Build accordion foldout
        var panel = $("<div>");
        panel.addClass('panel');
        var panel = $("<div>");
        var panelText = $("<p>");
        panelText.text(item['snippet']['description']);
        panel.append(panelText);

        videosAccordion.append(button);
        videosAccordion.append(panel);
    }

}
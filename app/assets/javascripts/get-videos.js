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
        publishedAt = publishedAt.toLocaleString("en-US",  { year: 'numeric', month: 'long', day: 'numeric' });
        published.text(publishedAt);
        row.append(title);
        row.append(channel);
        row.append(published);
        table.append(row);
        button.append(table);

        //Build accordion foldout
        var panel = $("<div>");
        panel.addClass('panel');
        var panelTop = $("<div>");
        panelTop.addClass('panel-top');
        var thumbnail = $("<img>");
        thumbnail.attr('src', item['snippet']['thumbnails']['standard']['url']);
        var panelText = $("<div>");
        panelText.addClass('panel-text');
        var descriptionLabel = $("<p>");
        descriptionLabel.addClass('label');
        descriptionLabel.text('DESCRIPTION');
        var description = $("<p>");
        description.text(item['snippet']['description']);
        panelText.append(descriptionLabel);
        panelText.append(description);
        panelTop.append(thumbnail);
        panelTop.append(panelText);
        panel.append(panelTop);

        var statsTable = $("<table>");
        var statsLabelsRow = $("<tr>");
        var viewsLabel = $("<th>");
        viewsLabel.addClass('label');
        viewsLabel.text("VIEW COUNT");
        var likesLabel = $("<th>");
        likesLabel.addClass('label');
        likesLabel.text("LIKE COUNT");
        var tagsLabel = $("<th>");
        tagsLabel.addClass('label');
        tagsLabel.text("TAGS");
        statsLabelsRow.append(viewsLabel);
        statsLabelsRow.append(likesLabel);
        statsLabelsRow.append(tagsLabel);
        statsTable.append(statsLabelsRow);
        var statsRow = $("<tr>");
        var views = $("<td>");
        views.text(item['statistics']['viewCount']);
        var likes = $("<td>");
        likes.text(item['statistics']['likeCount']);
        var tags = $("<td>");
        var tagList = item['snippet']['tags'];
        if(tagList) {
            tags.text(tagList.join(', '));
        }
        statsRow.append(views);
        statsRow.append(likes);
        statsRow.append(tags);
        statsTable.append(statsRow);
        panel.append(statsTable);

        videosAccordion.append(button);
        videosAccordion.append(panel);
    }

}
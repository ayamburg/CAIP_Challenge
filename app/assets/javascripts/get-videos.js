$(window).on('load', function () {
    Search("Ruby on Rails");
});

$(document).on('click', '.search', function () {
    var query = $("#search").val();
    Search(query);
});

$(document).on('click', '.reset', function () {
    Search("Ruby on Rails");
});

function Search(query) {
    $.ajax({
        url: "/api/youtube/videos?query=" + query
    })
        .done(function (data) {
            var barGraph = $('#bar-graph');
            var videosAccordion = $('#videos-accordion');
            barGraph.empty();
            videosAccordion.empty();
            buildVideoAccordion(data);
            buildBarGraph(data);
            $('#search-term').text(query);
        });
}

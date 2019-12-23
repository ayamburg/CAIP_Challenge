$(window).on('load', function() {
    Search("Ruby on Rails");
});

$(document).on('click', '.search', function() {
    var query = $("#search").val();
    Search(query);
});

$(document).on('click', '.reset', function() {
    Search("Ruby on Rails");
});

function Search(query){
    $.ajax({
        url: "/api/youtube/videos?query=" + query
    })
        .done(function( data ) {
            console.log(data);
            buildVideoAccordion(data);
            buildBarGraph(data);
            $('#search-term').text(query);
        });
}

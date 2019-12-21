$(document).on('click', '.search', function() {
    $.ajax({
        url: "/api/youtube/videos?query=roils"
    })
        .done(function( data ) {
            console.log(data);
            videoAccordion = buildVideoAccordion(data);
        });
});

function buildVideoAccordion(videos){


}
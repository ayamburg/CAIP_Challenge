$(document).on('click', '.accordion', function() {
    var acc = document.getElementsByClassName("accordion");

    var j;
    for (j = 0; j < acc.length; j++) {
        if (acc[j] === this){
            this.classList.toggle("active");
            panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        }else{
            acc[j].className = acc[j].className.replace(" active", "");
            var panel = acc[j].nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            }
        }
    }
});
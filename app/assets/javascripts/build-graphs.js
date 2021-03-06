function buildBarGraph(videos) {

    //margins
    var margin = {top: 20, right: 20, bottom: 50, left: 40},
        width = 900 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);

    // append the svg to the body of the page
    var svg = d3.select(".bar-graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    //get the data
    items = videos['items'];
    var i;
    var data = [];
    for (i = 0; i < items.length; i++) {
        var item = items[i];
        var title = item['snippet']['title'];
        if (title.length > 25) {
            title = title.substr(0, 25) + "...";
        }
        var views = parseInt(item['statistics']['viewCount']);
        var likes = parseInt(item['statistics']['likeCount']);
        data.push({title: title, stat: views, color: "#AED5FF", tooltip: "views: " + views + " likes: " + likes});
        data.push({title: title, stat: likes, color: "#64AEFF", tooltip: "views: " + views + " likes: " + likes});
    }

    // scale the range and domain
    x.domain(data.map(function (d) {
        return d.title;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.stat;
    })]);

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .attr("class", "x-axis");

    // gridlines in y axis function
    function make_y_gridlines() {
        return d3.axisLeft(y)
            .ticks(10)
    }

    //add y gridlines
    svg.append("g")
        .attr("class", "grid")
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
        );

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y))
        .attr("class", "y-axis");

    // add the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.title) + 40;
        })
        .attr("width", 80)
        .attr("y", function (d) {
            return y(d.stat);
        })
        .attr("height", function (d) {
            return height - y(d.stat);
        })
        .style("fill", function (d) {
            return (d.color);
        })
        .on("mouseover", function () {
            tooltip.style("display", null);
        })
        .on("mouseout", function () {
            tooltip.style("display", "none");
        })
        .on("mousemove", function (d) {
            var xPosition = d3.mouse(this)[0] - 15;
            var yPosition = d3.mouse(this)[1] - 25;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text(d.tooltip);
        });

    //legend
    svg.append("rect")
        .attr("x", 320)
        .attr("y", 465)
        .attr("width", 12)
        .attr("height", 12)
        .style("fill", "#64AEFF");
    svg.append("rect")
        .attr("x", 480)
        .attr("y", 465)
        .attr("width", 12)
        .attr("height", 12)
        .style("fill", "#AED5FF");
    svg.append("text")
        .attr("x", 340)
        .attr("y", 471)
        .text("View Count")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle");
    svg.append("text")
        .attr("x", 500)
        .attr("y", 471)
        .text("Like Count")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle");


    // tooltip
    var tooltip = svg.append("g")
        .attr("class", "tooltip")
        .style("display", "none");

    tooltip.append("text")
        .attr("x", 15)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");
}
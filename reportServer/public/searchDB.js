// var elasticSearch = require('elasticSearch');

// var client = new elasticSearch.Client({
//     host: 'search-candidates-cjppiuv3s4xsksv4prai7gcohm.us-west-2.es.amazonaws.com',
//     log: 'trace'
// });
var client = elasticsearch.Client({
    host: 'search-candidates-cjppiuv3s4xsksv4prai7gcohm.us-west-2.es.amazonaws.com',
});

index = 'routes10';

var options = {
    responsive: true,
    maintainAspectRatio: false
}

var ctx = document.getElementById("myChart");
var ctx = document.getElementById("myChart").getContext("2d");
ctx.canvas.width = 1000;
ctx.canvas.height = 400;
var ctx = $("#myChart");

var ctx2 = document.getElementById("myChart2");
var ctx2 = document.getElementById("myChart2").getContext("2d");
ctx2.canvas.width = 1000;
ctx2.canvas.height = 400;
var ctx2 = $("#myChart2");

var ctx3 = document.getElementById("myChart3");
var ctx3 = document.getElementById("myChart3").getContext("2d");
ctx3.canvas.width = 1000;
ctx3.canvas.height = 400;
var ctx3 = $("#myChart3");

var ctx4 = document.getElementById("myChart4");
var ctx4 = document.getElementById("myChart4").getContext("2d");
ctx4.canvas.width = 1000;
ctx4.canvas.height = 400;
var ctx4 = $("#myChart4");

var results = {};
client.search({
    index: index,
    size: 10000,
    query: {
        "match_all" : {}
    }

// include tag to get ALL responses
}, function(error, response) {
    var DBdata = response.hits.hits;
    var route;
    var cloud;
    var hour;
    var time;

    for(var i=0; i < DBdata.length; i++){
        route = DBdata[i]._source.route;
        cloud = DBdata[i]._source.cloud;
        hour = DBdata[i]._source.time_of_day;
        time = DBdata[i]._source.response_time;
        if(!results[route]) {
            results[route] = {};
        }
        if(!results[route][cloud]) {
            results[route][cloud] = {};
        }
        if(!results[route][cloud][hour]) {
            results[route][cloud][hour] = [];
            results[route][cloud][hour].push(time)
        } else {
            results[route][cloud][hour].push(time);
        }
    }
    if(error) console.log(error);

    var times;
    var sum;
    var avg;
    var list_of_avgs = [];
    var list_of_clouds = [];
    var list_of_hours = [];
    var list_of_routes = [];
    var cloud_and_time = {};
    var counter = 0;
    var present = false;
    var cloud_counter = 0;

    var colors = ["rgba(255,205,86,1)", "rgba(255,99,132,1)", "rgba(75,192,192,1)", "rgb(204, 51, 255)", "rgb(63, 63, 191)"];

    for (var route in results) {
        if (results.hasOwnProperty(route)) {

            var data = {
                labels: list_of_hours,
                datasets: []
            }

            // add child to root
            if(list_of_routes.indexOf(route) < 0) {
                list_of_routes.push(route);
            }
            // console.log("");
            // console.log(route);
            // console.log(list_of_hours);
            // cloud_counter = 0;
            for (var cloud in results[route]) {
                // console.log(cloud);
                if(list_of_clouds.indexOf(cloud) < 0) {
                    list_of_clouds.push(cloud);
                }
                list_of_avgs = [];
                for (var hour in results[route][cloud]) {
                    console.log(hour);
                    if(list_of_hours.indexOf(hour) < 0 && hour < 19) {
                        list_of_hours.push(hour);
                    }
                    // console.log(hour);
                    times = results[route][cloud][hour];
                    sum = 0;
                    for(var i=0; i < times.length; i++) {
                        //   if(times[i] < 1000)
                        sum += times[i];
                    }
                    avg = sum / times.length;
                    list_of_avgs.push(avg);
                    // if(counter == 0) {
                        present = false;
                        for(var i = 0; i < data.datasets.length; i++) {
                            if(data.datasets[i].label == cloud) {
                                present = true;
                            }
                        }

                        if(present == false) {
                            data.datasets.push({
                                label: cloud,
                                fill: false,
                                backgroundColor: colors[cloud_counter%5],
                                borderColor: colors[cloud_counter%5],
                                pointBorderColor: colors[cloud_counter%5],
                                // pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: colors[cloud_counter%5],
                                pointHoverBorderColor: colors[cloud_counter%5],
                                pointHoverBorderWidth: 2,
                                data: list_of_avgs
                            });
                        }
                    // }




                }
                // console.log(cloud);
                console.log(list_of_hours);
                cloud_counter = cloud_counter+1;
            }
            if (counter == 0) {
                console.log(data.datasets);
                var myLineChart = new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: options
                });
            }
            if (counter == 1) {
                var myLineChart2 = new Chart(ctx2, {
                    type: 'line',
                    data: data,
                    options: options
                });
            }
            if (counter == 2) {
                var myLineChart3 = new Chart(ctx3, {
                    type: 'line',
                    data: data,
                    options: options
                });
            }
            if (counter == 3) {
                var myLineChart4 = new Chart(ctx4, {
                    type: 'line',
                    data: data,
                    options: options
                });

            }
            counter = counter+1;
        }
    }



});

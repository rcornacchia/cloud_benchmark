var request = require('request');
var elasticSearch = require('elasticSearch');
// var sleep = require('sleep');

var cloudDB;
var clouds = []; // clouds array to hold endpoints for all instances to test
var routes = []; // routes array to hold routes to test
var interval;
var number_of_trials;
var block = 0;
var global_arr = [];
var interval_hrs;
var time_elapsed_hrs = 0;
var number_of_intervals = 0;
var intervals_counter = 0;

exports.clouds = clouds;
exports.routes = routes;
exports.number_of_intervals = number_of_intervals;

var client = new elasticSearch.Client({
    host: 'search-candidates-cjppiuv3s4xsksv4prai7gcohm.us-west-2.es.amazonaws.com',
    log: 'trace'
});

index = 'routes11';
client.indices.create({ // create index
    index: index,
    body: {
    }
});

// all data
// hour 4 + time
// hour 4 + time
// hour 4 + time
// hour 4 + time
// hour 6 + time
// hour 6 + time
// hour 6 + time
// hour 6 + time
// Create a dictionary for the time and host if one doesn't already exist,
//          Then increment counter, add time
// When finished, iterate through the dictionary and calculate average time.
// graph dictionary

// clouds setter method to add endpoints
// url is only the route after initial /
exports.insertCloud = function(url) {
    clouds.push(url);
    // insert to MongoDB
    // Connect to the db
}

exports.removeCloud = function(url) {
    var index = clouds.indexOf(url);
    clouds.splice(index, 1);

    // remove from MongoDB
}

exports.printClouds = function() {
    console.log(clouds);
}

exports.addRoute = function testRoute(method, url, parameters) {
    var new_route;
    if(parameters){
        new_route = [method, url, parameters];
    } else {
        new_route = [method, url]
    }
    routes.push(new_route);
    // insert new_route into MongoDB
}

exports.removeRoute = function(url) {
    var index = routes.indexOf(url);
    routes.splice(index, 1);
}

exports.printRoutes = function() {
    console.log(routes);
}

exports.number_of_trials = function(numTrials) {
    console.log("Number of trials per interval: " + numTrials);
    number_of_trials = numTrials;
}
exports.interval = function(interval_in_hrs, numIntervals) {
    interval_hrs = interval_in_hrs;
    // convert new_interval from hours to seconds
    interval = interval_in_hrs * 60 * 60;
    // convert from seconds to ms
    interval = interval * 1000;
    console.log(interval);
    number_of_intervals = numIntervals;
    console.log("Number of intervals " + numIntervals);
}

function createArray() {
    // var local_arr = new Array();
// TODO try for loop here to replicate array for each trial

    for(var i = 0; i < routes.length; i++) {
        var method = routes[i][0];
        console.log(method);
        for(var j = 0; j < clouds.length; j++) {
            global_arr.push([routes[i], clouds[j]]);
        }
    }

    // global_arr = local_arr;

    // for (var i = 0; i < number_of_trials-1; i++) {
    //     var temp = global_arr.slice(0);
    //     global_arr.push(temp);
    // }
    // for (var i = 0; i < number_of_trials; i++) {
    //     console.log(global_arr[i]);
    // }
    // console.log("Local array");
    // console.log(local_arr);
    // console.log("====");
}

// assume array holds all pairs
function benchmark(arr, hour) {
    if(arr.length == 0) {
        console.log("INTERVAL: " + intervals_counter + " out of: " + number_of_intervals);
    }
    else {
        var timeNow = new Date();
        var hour = timeNow.getHours();
        // send request and start timer
        var pair = arr.pop();
        // console.log(pair);
        var method = pair[0][0];
        var plain_url = pair[1];
        var route = pair[0][1];
        var url = plain_url + route;
        if(method == "GET") {
            var start = Date.now();   //start timer
            request(url, function (error, response, body) {
                var end = Date.now();
                var response_time = end-start;
                client.create({
                    index: index,
                    type: 'route',
                    body: {
                        route: route,
                        cloud: plain_url,
                        time_of_day: hour,
                        response_time: response_time
                    }
                }, function (error, response) {
                    if(error) console.log("error: " + error);
                    // console.log("response: " + response);
                });
                // console.log(method + " Response Time: " + response_time + " msec");
                benchmark(arr);
            });
        }
        else if(method == "POST") {
            var parameters = pair[0][2];
            var start = Date.now();   //start timer
            request({
                url: url,
                method: 'POST',
                form: parameters
            }, function(error, response, body){
                end = Date.now();
                var response_time = end-start;
                client.create({
                    index: index,
                    type: 'route',
                    body: {
                        route: route,
                        cloud: plain_url,
                        time_of_day: hour,
                        response_time: response_time
                    }
                }, function (error, response) {
                    if(error) console.log("error: " + error);
                    // console.log("response: " + response);
                });
                // console.log(method + " Response Time: " + response_time + " msec");
                benchmark(arr);
            });
        }
    }
}

function doBenchmark() {
    for(var i=0; i < number_of_trials; i++) {
        createArray();
    }
    console.log(global_arr.length);
    //increment interval counter
    intervals_counter = intervals_counter+1;
    if(intervals_counter <= number_of_intervals) {
        var timeNow = new Date();
        var hour = timeNow.getHours();
        var arr = global_arr.splice(0);
        benchmark(arr, hour);
    } else {
        console.log("Benchmark complete!");
    }
    console.log("INTERVAL: " + intervals_counter + " out of: " + number_of_intervals);

}

exports.startBenchmark = function() {
    console.log("GLOBAL ARRAY: ");
    console.log(global_arr);
    console.log("========================");
    // interval = 10000;

    console.log(number_of_trials);
    // doBenchmark();
    // number_of_intervals = number_of_intervals-1;

    // might need to do benchmark for first run
    // set interval waits interval before doing anything
    // would also need to decrement intervals
    setInterval(doBenchmark, interval);
}

// method to test routes
// exports.testRoute = function testRoute(method, url, parameters) {
//     console.log("test");
//
//     for(var i = 0; i < clouds.length; i++) {
//         console.log(clouds[i]);
//         //start timer
//         var start = Date.now();
//         // console.time("cloud-request");
//         //send request to instance
//         if(method == "GET") {
//             request
//                 .get(clouds[i])
//                 .on('response', function(response) {
//                     //stop timer
//                     var end = Date.now();
//                     var time = end-start;
//                     console.log(time + " msec");
//
//                     // store time in MongoDB
//
//                     console.log("Response");
//             });
//         }
//         // TODO
//         if(method == "POST") {
//
//         }
//     }
// }

var cb = require('cloud-benchmark');
var request = require('request');
var express = require('express');
var app = express();
var path = require('path');

// add aws instance
cb.insertCloud("http://ec2-54-186-73-1.us-west-2.compute.amazonaws.com");
cb.insertCloud("https://sleepy-shelf-49558.herokuapp.com/");
cb.printClouds();

var todo = {
    'todo' : 'Finish TSE Project'
}

cb.addRoute("GET", "/");
cb.addRoute("POST", "/addTodo", todo);
cb.addRoute("POST", "/deleteTodo", todo);
cb.addRoute("GET", "/getTodos");

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    console.log(cb.routes);
    // cb.testRoute("GET", "/");
    // cb.testRoute("POST", "/addTodo", )

    res.sendFile(path.join(__dirname + '/index.html'));
});

// set interval for testing in hours, and how many intervals to run
// this represents 6 hour intervals, 4 times
cb.interval(1, 4);

cb.number_of_trials(10);

cb.startBenchmark();

app.listen(8000);
console.log("Server started on port 80.");

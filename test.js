var cb = require('cloud-benchmark');
var request = require('request');
var express = require('express');
var app = express();
var path = require('path');

// add aws instance
cb.insertCloud("http://ec2-54-191-23-14.us-west-2.compute.amazonaws.com/");
// cb.insertCloud("http://ec2-54-186-10-38.us-west-2.compute.amazonaws.com");
cb.printClouds();


// cb.addRoute("GET", "/", "parameters");
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    console.log(cb.routes);
    cb.testRoute("GET", "/", "parameters");

    res.sendFile(path.join(__dirname + '/index.html'));
});
cb.number_of_trials(100);

// set interval for testing in hours
cb.interval(6);

app.listen(8000);
console.log("Server started on port 80.");

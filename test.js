var cb = require('cloud-benchmark');
var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);
console.log("Server started on port 8080.");













//
// console.log(cb.clouds);
//
// // cb.clouds = ["test"];
// cb.insertCloud("x");
//
// console.log(cb.clouds);
//
// cb.remove("x");
//
// cb.printClouds();
//
//
//
// // testing routes
// cb.addRoute("GET", "Google.com", "parameters");
// console.log(cb.routes);

var request = require('request');
var express = require('express');
var app = express();
var path = require('path');

var todo = {
    'todo' : 'Finish TSE Project'
}

url = "https://simple-server-1302.appspot.com/"
// Add todo
request({
    url: 'https://simple-server-1302.appspot.com/addTodo', //URL to hit
    method: 'POST',
    form: todo
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});

// get todos
request('https://simple-server-1302.appspot.com/getTodos', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the Google homepage.
    }
});
// var z = url + '/removeTodo'

// remove todo
request({
    url: 'https://simple-server-1302.appspot.com/removeTodo', //URL to hit
    method: 'POST',
    form: todo
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});

// console.log("Inside get");
request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the Google homepage.
    }
});

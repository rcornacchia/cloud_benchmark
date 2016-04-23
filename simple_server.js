var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('');
});

app.post('/addTodo', function(req, res) {
    res.send("Todo successfully added!");
});

app.listen(80, function () {
    console.log('Example app listening on port 80!');
});

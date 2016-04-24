var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var todos = new Array();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function (req, res) {
    res.send('');
});

app.post('/addTodo', function(req, res) {
    console.log(req.body.todo);
    todos.push(req.body.todo);
    console.log("Todos list: " + todos);
    res.send("Todo successfully added!");
});

app.post('/removeTodo', function(req, res) {
    console.log(req.body.todo);
    var index = todos.indexOf(5);
    todos.splice(index, 1);
    console.log("Todos list: " + todos);
    res.send("Todo successfully removed.");
});

app.listen(80, function () {
    console.log('Example app listening on port 80!');
});

var express = require('express');
var app = express();
var bodyParser = require('body-parser')


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function (req, res) {
    res.send('');
});

app.post('/addTodo', function(req, res) {
    console.log(req.body('todo'));
    res.send("Todo successfully added!");
});

app.listen(80, function () {
    console.log('Example app listening on port 80!');
});

var express = require('express'),
    app = express();


app.use(express.static(__dirname + '/public'));
var server = app.listen(process.env.PORT || 8000);
console.log("Report server started on 8000");

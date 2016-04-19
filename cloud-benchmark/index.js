// clouds array to hold endpoints for all instances to test
var clouds = [];

function appendCloud(url) {
    clouds.push(url);
}

// clouds setter method to add endpoints
exports.appendCloud(url);


exports.clouds = clouds;

exports.printMsg = function() {
  console.log("This is a message from the demo package");
}

var elasticSearch = require('elasticSearch');

var client = new elasticSearch.Client({
    host: 'search-candidates-cjppiuv3s4xsksv4prai7gcohm.us-west-2.es.amazonaws.com',
    log: 'trace'
});

index = 'routes6';

var results = [];
client.search({
    index: index,
    size: 10000,
    query: {
        "match_all" : {}
    }

// include tag to get ALL responses
}, function(error, response) {
    var data = response.hits.hits;
    for(var i=0; i < data.length; i++){
        console.log(data[i]._source.route);


        // route
        // cloud
        // response time
    }
    console.log(data.length);
    // console.log(response.hits.hits[0]._source);
    if(error) console.log(error);

// list of routes
//     list of clouds
//         list of times
});

# cloud_benchmark

TODO:

package:
    -initialize array to hold instances
    -initialize routes array
    -export function to add/remove instance to array
    -export function to see what's in the array
    -export function to add routes

application Side:
    -add instances to arrays
    -configure times of day to test and number of tests per time of day
    -configure routes to transfer same type of requests
        GET requests --> GET page from each instance
        POST requests --> copy parameters and send new POST request to each instance
        Callback stops timer on response and then sends response to client

Report:
    -The report will print out each request, and graph the RTT response times for each instance
    -The report can then be opened in a web browser
    -Segregate static and dynamic routes


clouds = [AWS, Google, Azure];


GET(Index.html){
    test_clouds() --> send request to each instance in clouds array
    send index.html
}

//inside package
test_clouds() {
    foreach cloud in clouds {
        start timer
        send request
    }, callback() {
        stop timer
        store result in Mongod
    }
}

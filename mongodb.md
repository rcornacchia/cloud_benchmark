Clouds = Collection of cloud urls
{
    Routes = [route, counter] = collection of routes + counter for number of requests
}

Does cloudA have routeX?
    if yes --> increase count + update average with new time
    if no  --> insert time + set count to 1



Better to use Routes Collection and nest each cloud in routes

Route :
    GET request :
        AWS: [hour_tested, result]
        Google: [hour_test, result]

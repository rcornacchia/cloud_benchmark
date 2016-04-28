# cloud-benchmark
## An npm package to easily benchmark cloud host providers.
Every day, more and more cloud hosts clutter the web.  
Which one is right for you?  
Usually this answer falls heavily on which cloud host offers the best performance.  
Testing takes time and precious development hours.  
Cloud-benchmark is a simple to use npm package to help developers determine which cloud
host is the fastest for their specific application.
General benchmarks are helpful, but with cloud-benchmark, developers can quickly
customize their very own benchmarks to test their node.js apps and all its quirks.

### After all, nobody know yours app better than you.

Follow the steps below to learn how to use cloud-benchmark.

# 1 Installation
Add cloud benchmark to your package.json file to maintain most uptodate version.
```javascript
"cloud-benchmark" : "*"
```

# 2 Import package
```javascript
var cb = require('cloud-benchmark');
```

# 3 Add clouds to test
After deploying your application on different cloud hosts, add the url of each host.
```javascript
cb.insertCloud("http://ec2-54-186-73-1.us-west-2.compute.amazonaws.com");
cb.insertCloud("https://sleepy-shelf-49558.herokuapp.com/");
```

# 4 Add routes
Add the routes of your nodejs application that you'd like to test.
For POST requests, add the parameters.
```javascript
cb.addRoute("GET", "/");
cb.addRoute("POST", "/addTodo", todo);
cb.addRoute("POST", "/deleteTodo", todo);
cb.addRoute("GET", "/getTodos");
```

# 5 Specify interval of time to run tests
The test will run every x number of hours.
x = the interval you set here.
```javascript
cb.interval(6);
```

# 6 Specify number of intervals to run
```javascript
cb.number_of_intervals = 4;
```

# 7 Start benchmark
```javascript
cb.startBenchmark();
```

# 8 Generate Report
Cloud-benchmark will automatically generate this for you once the benchmark is complete.

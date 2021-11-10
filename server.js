var express = require('express');
var http = require('http');
var app = express();
var count = 0; 
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});


app.get('/sensors/temperature/:histValue/avg', function (req, res) {
    http.get("http://192.168.2.29:8080/sensors/temperature/" + req.params['histValue'] + '/avg', (response) => {
        let data = '';
        // Examine the text in the response
        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            res.send(data)
        });
    }
    ).on("error", (err) => {
        res.status(500).send("Error: " + err.message);
    });
});

app.get('/sensors/temperature/:histValue', function (req, res) {
    http.get("http://192.168.2.29:8080/sensors/temperature/" + req.params['histValue'], (response) => {
        let data = '';
        // Examine the text in the response
        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            
            res.send(data)
        });
    }
    ).on("error", (err) => {
        res.status(500).send("Error: " + err.message);
    });
});

app.get('/sensors/temperature', function (req, res) {
    http.get("http://192.168.2.29:8080/sensors/temperature", (response) => {
        let data = '';
        // Examine the text in the response
        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            res.send(data)
        });
    }
    ).on("error", (err) => {
        res.status(500).send("Error: " + err.message);
    });
});

app.get('/sensors/humidity/:histValue/avg', function (req, res) {
    http.get("http://192.168.2.29:8080/sensors/humidity/" + req.params['histValue'] + '/avg', (response) => {
        let data = '';
        // Examine the text in the response
        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            res.send(data)
        });
    }
    ).on("error", (err) => {
        res.status(500).send("Error: " + err.message);
    });
});

app.get('/sensors/humidity/:histValue', function (req, res) {
    http.get("http://192.168.2.29:8080/sensors/humidity/" + req.params['histValue'], (response) => {
        let data = '';
        // Examine the text in the response
        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            
            res.send(data)
        });
    }
    ).on("error", (err) => {
        res.status(500).send("Error: " + err.message);
    });
});

app.get('/sensors/humidity', function (req, res) {
    http.get("http://192.168.2.29:8080/sensors/humidity", (response) => {
        let data = '';
        // Examine the text in the response
        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            res.send(data)
        });
    }
    ).on("error", (err) => {
        res.status(500).send("Error: " + err.message);
    });
});

app.get('/meteo', function (req, res) {
    res.sendfile('index.html');
});

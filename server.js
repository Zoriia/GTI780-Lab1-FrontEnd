var express = require('express');
var app = express();
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});

app.get('/sensors/temperature', function (req, res) {
    var temp = {"temperature" : 21.5};
    res.send(JSON.stringify(temp));
});

app.get('/sensors/humidity', function (req, res) {
    var humid = {"humidity": "75.4%"};
    res.send(JSON.stringify(humid));
});

app.get('/sensors/humidity/:histValue', function (req, res) {
    var humidHist = [[Date(), "75.4%"],[Date(), "75.2%"],[Date(), "75.7%"],[Date(), "75.8%"],[Date(), "75.1%"]]
    // La variable envoyer peut etre acceder via req.params.histValue
    res.send(JSON.stringify(humidHist));
});

app.get('/sensors/temperature/:histValue', function (req, res) {
    
    var tempHist = [[Date(), 21.4],[Date(), 21.2],[Date(), 21.7],[Date(), 21.8],[Date(), 21.1], [Date(), 21.5]]
    res.send(JSON.stringify(tempHist));
});

app.get('/meteo', function (req, res) {
    res.sendfile('index.html');
});
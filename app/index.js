var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
    

var app = express();
app.use(express.static(__dirname)); //__dir and not _dir
var port = 8080; // you can use any port
app.listen(port);
console.log('Server running on port: ' + port);

app.use(express.json());

app.post('/guardaJSONAudio', function(req, res){
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    fs.writeFile('js/app.json', JSON.stringify(req.body), function(err){
        if(err) throw err;
        else console.log('Completado');
    });
    res.send(req.body);
});

app.post('/guardaJSONVideos', function(req, res){
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    fs.writeFile('js/video.json', JSON.stringify(req.body), function(err){
        if(err) throw err;
        else console.log('Completado');
    });
    res.send(req.body);
});





    
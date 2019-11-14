var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var moment = require('moment');
var crypto = require('crypto');
var site = express();
var port = 3000;

site.use(bodyParser.urlencoded({extended: true}));

site.use(express.static(__dirname + '/public'));

site.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

site.get('/makelink', function(req, res){
    res.sendFile(__dirname + '/public/makelink.html');
});

site.post('/addrecord', function(req, res){
    var date = moment().format('YYYY-MM-DD:hh:mm:ss');
    var data = req.body;
    data['date'] = date;
    var filename = data.name+data.email+data.date;
    filename = crypto.createHash('md5').update(filename).digest('hex');
    fs.writeFile("links/"+filename+".txt", JSON.stringify(data), function(err) {
        if (err) console.log(err);
        console.log("File written!");
    });
    res.sendFile(__dirname + '/public/addrecord.html');
});

site.get('/link', function(req, res){
    fs.readFile("links/foo.txt", "utf-8", function(err, data) {
        if(err) { console.log(err) }
        data = JSON.parse(data);
    });
    res.sendFile(__dirname + '/public/link.html');
});

site.listen(port, () => console.log(`App listening on port ${port}`));
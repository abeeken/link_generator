var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var crypto = require('crypto');
var site = express();

var port = 3000;

/**
 * Bodyparser puts post data into body
 */
site.use(bodyParser.urlencoded({extended: true}));

/**
 * Define render engine
 */
site.set('view engine', 'pug');

/**
 * Set views directory
 */
site.set('views', path.join(__dirname, '/src/views'));

// CRUD

/**
 * /
 */
site.get('/', function(req, res){
    res.render('index');
});

/**
 * /makelink
 */
site.get('/makelink', function(req, res){
    res.render('makelink');
});

/**
 * /addrecord
 */
site.post('/addrecord', function(req, res){
    var date = moment().format('YYYY-MM-DD:hh:mm:ss');
    var data = req.body;
    data['date'] = date;
    var filename = data.name+data.email+data.date;
    filename = crypto.createHash('md5').update(filename).digest('hex');
    fs.writeFile(path.join(__dirname, 'links/'+filename+'.txt'), JSON.stringify(data), function(err) {
        if (err) console.log(err);
        console.log("File written!");
    });
    url = req.protocol+'://'+req.headers.host+'/link?linkid='+filename;
    res.render('addrecord', {url: url} );
});

/**
 * /link
 */
site.get('/link', function(req, res){
    var linkid = req.query.linkid;
    console.log(linkid);
    var filename = (path.join(__dirname, 'links/'+linkid+'.txt'));
    fs.readFile(filename, "utf-8", function(err, data) {
        if(err) {
            console.log(err);
            res.render('link', { error: "This file doesn't exist!" });
        } else {
            data = JSON.parse(data);
            if(checkDate(data.date,"24")){
                console.log(data);
                res.render('link', { data: data } );
            } else {
                fs.unlink(filename, function(err) {
                    if(err){
                        console.log(err)
                    } else {
                        console.log("Date invalid - file deleted.");
                    }
                });
                res.render('link', { error: "The date was invalid, so I deleted the file!" });
            }
        }
    });
});

/**
 * App
 */
site.listen(port, () => console.log(`App listening on port ${port}`));


// Fns

/**
 * 
 * @param {Date} date 
 * @param {Number} timeout
 * @returns Boolean
 */
function checkDate(date,timeout){
    // Checks a date against a timeout in hours - returns true if the date is valid, false if not
    var currentdate = new Date(moment().format('YYYY-MM-DD:kk:mm:ss'));
    var date = new Date(date);
    var datediff = Math.abs(currentdate - date) / 36e5;
    console.log(date);
    console.log(currentdate);
    console.log(datediff);
    if(datediff >= timeout){
        return false;
    } else {
        return true;
    }
}
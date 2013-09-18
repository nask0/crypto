var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    Grid = require('gridfs-stream');
var conn = mongoose.createConnection('mongodb://localhost/crypto');
var gfs;
conn.once('open', function() {
    gfs = Grid(conn.db, mongoose.mongo);
});
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.bodyParser({
    uploadDir: './tmp',
    keepExtensions: true,
    limit: '100mb'
}));
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.post('/file', function(req, res) {
    var key = req.body.key;
    var writestream = gfs.createWriteStream({
        filename: req.files.file.name
    });
    fs.createReadStream(req.files.file.path).pipe(writestream.on('close', function(file) {
        fs.unlink(req.files.file.path);
        res.send(file._id.toString())
    }));
});
app.get('/file/:id', function(req, res) {
    var readstream = gfs.createReadStream({
        _id: req.params.id
    });
    res.set({
        'Content-Type': 'application/octet-stream'
    })
    res.attachment();
    readstream.pipe(res);
});
app.get('/', function(req, res) {
    res.render('index');
});
app.get('*', function(req, res) {
    res.redirect('/');
});
app.listen(3000);
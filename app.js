var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    encryptor = require('file-encryptor');

var options = {
    algorithm: 'aes-256-cbc'
};

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.bodyParser({
    uploadDir: './tmp',
    keepExtensions: true,
    limit: '100mb'
}));
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: 31536000000
}));

app.post('/api/file', function(req, res) {
    console.log(typeof req.body.key);
    var key = req.body.key;
    encryptor.encryptFile(req.files.file.path, 'uploads/' + req.files.file.path.slice(4) + '.aes', key, options, function(err) {
        fs.unlink(req.files.file.path, function() {
            if (err) throw err;
            res.send(200, 'uploads/' + req.files.file.path.slice(4) + '.aes');
        });
    });
});

app.get('/uploads/:file', function(req, res) {
    res.download('./uploads/' + req.params.file);
});

app.get('/', function(req, res) {
    res.render('index');
});

app.get('*', function(req, res) {
    res.send(404, 'wtf? not found');
});

app.listen(3000);
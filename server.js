var express = require('express');
var app = express();
var fs = require('fs');
resolve = require('path').resolve;

app.set('view engine', 'pug'); // puga nie trzeba "require'owac", tutaj deklarujemy ze bedzie kreatorem widoków
app.set('views', './views'); // widoki bedziemy trzymac w folderze /views


app.get('/', function (req, res) {
    console.log('Received GET request at "/".');
    res.render('home', {
        name: "Log With Google",
        url: "/auth/google"
    });
});

app.get('/auth/google', function(req, res) {
    console.log('Received GET request at "/auth/google".');
    res.render('auth', {
        name: "Log With Google"
    });
});

app.get('/css/style.css', function(req, res) {

    console.log('Received GET request at "/css/style.css".');
    
    fs.readFile('./css/style.css', 'utf-8', function(err, data) {
        
        if (err) throw err;
        var absolutePath = resolve('./css/style.css');
        res.sendFile(absolutePath);
    });
});     

var server = app.listen(3000, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log('App is listening at http://' + host + ':' + port); 
    //tutaj sami definiujemy port i adres, ale w prawdziwej aplikacji moglibyśmy tych wartości nie znać, dlatego wpisujemy zmiennymi
});

app.use(function(req, res, next) {
    console.log('404 Error!');
    res.status(404).send('Couldn\'t find what you\'re after. Sorry.');
});
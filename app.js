/**
 * Module dependencies.
 */

var express = require('express'),
        routes = require('./routes'),
        api = require('./routes/api');

var app = module.exports = express();

// Configuration

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(__dirname + '/public'));
app.use(app.router);

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});


// Routes

app.get('/', routes.index);
app.get('/partial/:name', routes.partial);


// JSON API

app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


// Start server

app.listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});

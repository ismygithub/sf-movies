var connect = require('connect')
  , http = require('http')
  , MovieProvider = require('./movieprovider')
  , app
  ;
// connect server
var oneDay = 86400000;
var movieProvider = new MovieProvider();

app = connect()
	.use(connect.static('app', { maxAge: oneDay }))
	.use('/js/lib/', connect.static('node_modules/requirejs/', { maxAge: oneDay }))
	.use('/node_modules', connect.static('node_modules'))
	.use('/test', connect.static('test/'))
	.use('/test', connect.static('app'))
	.use('/movies', function (req, resp) {
		resp.writeHead(200, { 'Content-Type': 'application/json' });
		resp.end(movieProvider.getMovies(), 'utf-8');
	});
  ;

http.createServer(app).listen(process.env.PORT || 8080, function() {
  console.log('Running on http://localhost:8080');
});
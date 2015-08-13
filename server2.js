var http = require('http');
var fs = require('fs');
var port = '3000';
var host = 'localhost';

http.createServer(function(req, res) {
	var filepath = req.url === '/' ? './index.html' : '.' + req.url;

	fs.exists(filepath, function(fileexist) {
		if (fileexist) {
			fs.readFile(filepath, function(error, content) {
				if (error) {
					res.writeHead('500', {'Content-Type': 'text/html'});
					res.end('Internal server error');
				} else {
					res.writeHead('200', {'Content-Type': 'text/html'});
					res.end(content, 'utf8');
				}
			});
		} else {
			res.writeHead('404', {'Content-Type': 'text/html'});
			res.end('The page you requested is not damn found!');
		}
	});

	// res.writeHead('200', {'Content-Type': 'text/html'});
	// res.end('hello world');
}).listen(port, host, function() {
	console.log('The application is running on http://' + host + ':' + port);
});
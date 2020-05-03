var http = require('http');
var dt = require('./moduletest1');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(req.url + "\n ");
  res.write('The date and time are currently: ' + dt.myDateTime());
  res.end();
}).listen(8080); 

/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var url = require('url');
var fs = require('fs');
var path = require('path');


var data = {body: {results: []},
            options: ['GET', 'POST', 'OPTIONS'],
          };
var id = 0;

var requestHandler = function(request, response) {

  var filePath = '.client/client' + request.url;
  if (request.url === '/') {
    filePath = '.client/client/index.html';
  }

  var extname = path.extname(filePath);
  var contentType = 'text/html';
  if (extname === '.js') {
    contentType = 'application/json';
  } else if (extname === '.css') {
    contentTYpe = 'text/css';
  }

  // console.log('REQUEST URL: ',request.url);
  // console.log(filePath);
  // console.log('CONTENT TYPE: ', contentType);

  var read = function(cb, file) {
    // console.log('IN READ: ', file);
    fs.readFile(file, function(error, content) {
      if (error) {
        console.log(error);
        response.writeHead(500);
        response.write('ERROR CODE: 500');
        response.end();
      } else {
        cb(content);
        // response.writeHead(200, {'Content-Type': contentType});
        // response.write(content);
        // console.log(content);
        // response.end();
      }
    });
  };
  readIt = function(content) {
    // console.log('REQUEST URL: ', request.url);
    // console.log(filePath);
    // console.log('CONTENT TYPE: ', contentType);
    response.writeHead(200, {'Content-Type': contentType});
    response.write(content);
    // response.end();
  };

  var readDir = function(cb) {
    fs.readdir('./client/client', function (err, files) {
      if (err) {
        // console.log(err);
      }
      files.map(function (file) {
        return path.join('./client/client', file);
      }).filter(function (file) {
        return fs.statSync(file).isFile();
      }).forEach(function (file) {
        // console.log(file, path.extname(file));
        cb(readIt, file);
        // response.end();
      });
    });
  };
  readDir(read);
  console.log('hello');
  setTimeout(function() {
    response.end();
  }, 5000)
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.

  // console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = 400;
  // See the note below about CORS headers.
  var headers = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept, X-Parse-Application-Id, X-Parse-REST-API-Key',
    'access-control-max-age': 10 // Seconds.
  };

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json';

  var method = request.method;
  // var url = request.url;
  // var headers = request.headers;

  var parsedURL = url.parse(request.url);
  // console.log(parsedURL);

  // if (parsedURL.pathname === '/classes/messages') {
  //   if (method === 'GET') {
  //     if (parsedURL.query.split('=')[0] === 'roomSwitch') {
  //       var room = parsedURL.query.split('=')[1];
  //       var roomData = {results: data.body.results.filter(function(item) {
  //         return item.roomname === room;
  //       })};
  //       console.log(roomData);
  //       response.writeHead(200, headers);
  //       response.end(JSON.stringify(roomData));
  //     }
  //     response.writeHead(200, headers);
  //     response.end(JSON.stringify(data.body));
  //     // console.log('GET REQUEST: ', data.body);
  //   }
  //   if (method === 'POST') {
  //     body = '';
  //     request.on('data', function(chunk) {
  //       body += chunk;
  //     });
  //     request.on('end', function() {
  //       if (body.length) {
  //         body = JSON.parse(body);
  //         body.objectId = id;
  //         id++;
  //         body.createdAt = new Date();
  //         data.body.results.push(body);
  //       }
  //       // console.log('POST REQUEST: ', data.body);
  //       response.writeHead(201, headers);
  //       response.end(JSON.stringify(data.body));
  //     });
  //   }
  //   if (method === 'OPTIONS') {
  //     response.writeHead(200, headers);
  //     response.end(JSON.stringify(data.options));
  //   }
  // } else if (parsedURL.pathname === '/send') {
  //   if (method === 'GET') {
  //     response.writeHead(200, headers);
  //     response.end(JSON.stringify(data.body));
  //     // console.log('GET REQUEST: ', data.body);
  //   }
  //   if (method === 'POST') {
  //     body = '';
  //     request.on('data', function(chunk) {
  //       body += chunk;
  //     });
  //     request.on('end', function() {
  //       if (body.length) {
  //         data.body.results.push(JSON.parse(body));
  //       }
  //       response.writeHead(201, headers);
  //       response.end(JSON.stringify(data.body));
  //     });
  //   }
  //   if (method === 'OPTIONS') {
  //     response.writeHead(200, headers);
  //     response.end(JSON.stringify(data.options));
  //   }
  // } else if (parsedURL.pathname === '/log') {
  //   if (method === 'GET') {
  //     response.writeHead(200, headers);
  //     response.end(JSON.stringify(data.body));
  //     // console.log('GET REQUEST: ', data.body);
  //   }
  //   if (method === 'POST') {
  //     body = '';
  //     request.on('data', function(chunk) {
  //       body += chunk;
  //     }).on('end', function() {
  //       if (body.length) {
  //         data.body.results.push(JSON.parse(body));
  //       }
  //       response.writeHead(201, headers);
  //       response.end(JSON.stringify(data.body));
  //     });
  //   }
  //   if (method === 'OPTIONS') {
  //     response.writeHead(200, headers);
  //     response.end(JSON.stringify(data.options));
  //   }
  // } else {
  //   response.writeHead(404, headers);
  //   response.end(JSON.stringify(data.body));
  // }

  // response.writeHead(statusCode, headers);
  // response.end(JSON.stringify(data[url]));

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  // response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // response.end('Ended.');
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports.requestHandler = requestHandler;
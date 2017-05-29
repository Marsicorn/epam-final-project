const http = require('http');
const https = require('https');
const fs = require('fs');
const {REMOTE_SERVER, LOCAL_SERVER} = require('./constants.js');


const server = new http.Server();
server.listen(LOCAL_SERVER.PORT, LOCAL_SERVER.HOST);
console.log('Run mirror server on', LOCAL_SERVER.HOST, ':', LOCAL_SERVER.PORT);



server.on('request', (request, response) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	let path = '/anapi/' + request.url.substring(1);
	console.log(request.url);

	const options = {
		host: REMOTE_SERVER.HOST,
		port: REMOTE_SERVER.PORT,
		path: path,
		method: 'GET'
	};
	let data = '';

	let getData = https.request(options, function (res) {
		res.on('data', function (dataFragment) {
			data += dataFragment;
		});
		res.on('end', function () {
			response.end(data);
		});
	});

	getData.end();
	getData.on('error', function (err) {
		console.error('error:', err.code);
		response.end('');
	});
});

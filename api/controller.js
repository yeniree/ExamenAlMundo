var express = require('express');
var http = require('http');
var fs = require('fs');
var filter = require('content-filter');
var config = require("./config")();

var app = express();

var data = fs.readFileSync('./data/data.json');
var jsonData = JSON.parse(data);

// Add headers
app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.get('/hoteles', (req, res) => {
	let name = req.query.name;
	let stars = req.query.stars;

	let filterData = jsonData;
	let validName = name != undefined && name != '';
	let validStars = stars != undefined && stars != '[]';

	if (validName || validStars) {
		filterData = jsonData.filter(hotel => {
			let retorno;
			let hotelname = hotel.name.toLowerCase();
			let hotelstars = hotel.stars;
			name = name.toLowerCase();			

			if (validName && validStars) {
				retorno = hotelname.indexOf(name) > -1 && stars.indexOf(hotelstars) > -1;
			} 
			if (!validName && validStars) {
				retorno = stars.indexOf(hotelstars) > -1;
			} 
			if (validName && !validStars){
				retorno = hotelname.indexOf(name) > -1;
			}
			return retorno;
		});

	}
	res.send(filterData);
});

app.get('/', (req, res) => {
	res.status(200).send('Welcome to API REST');
});

http.createServer(app).listen(config.port, () => {
	console.log('Server started at http://localhost:' + config.port);
});


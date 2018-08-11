var express = require('express');
var http = require('http');
var fs = require('fs');
var filter = require('content-filter');

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
	let validStars = stars != undefined && stars != '';

	if (validName || validStars) {
		filterData = jsonData.filter(hotel => {
			let retorno;
			let hotelname = String(hotel.name);
			let hotelstars = String(hotel.stars);

			if (validName && validStars) {
				retorno = hotelname.indexOf(name) > -1 && stars.includes(hotelstars);
			} else {
				retorno = hotelname.indexOf(name) > -1 || stars.includes(hotelstars);
			}
			return retorno;
		});

	}
	res.send(filterData);
});

app.get('/', (req, res) => {
	res.status(200).send('Welcome to API REST');
});

http.createServer(app).listen(3000, () => {
	console.log('Server started at http://localhost:3000');
});


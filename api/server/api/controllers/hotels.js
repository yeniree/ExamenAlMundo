"use strict";

const fs = require('fs');
const filter = require('content-filter');

const data = fs.readFileSync('data/data.json');
const jsonData = JSON.parse(data);

exports.all = (req, res, next) => {
	res.json(jsonData);
};

exports.post = (req, res, next) => {
	let hotels = req.body;

	res.json(hotels);
};

exports.get = (req, res, next) => {
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
			name = name != undefined ? name.toLowerCase() : name;

			if (validName && validStars) {
				retorno = hotelname.indexOf(name) > -1 && stars.indexOf(hotelstars) > -1;
			}
			if (!validName && validStars) {
				retorno = stars.indexOf(hotelstars) > -1;
			}
			if (validName && !validStars) {
				retorno = hotelname.indexOf(name) > -1;
			}
			return retorno;
		});

	}
	res.send(filterData);
};

exports.put = (req, res, next) => {
	let id = req.params.id;
	let update = req.body;

	res.json(update);
};

exports.delete = (req, res, next) => {
	let id = req.params.id;

	res.json({ "id": id });
};
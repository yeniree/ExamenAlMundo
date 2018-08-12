"use strict";

const express = require("express");
const bodyParser = require('body-parser');

const api = require("./api");

const app = express();
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json 
app.use(bodyParser.json());

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

// Setup router and routes
app.use("/api", api);

app.use( (req, res, next) => {
  res.status(404);
  res.json({
    "error": "Error. Route not found"
  });
});

app.use( (err, req, res, next) => {
  res.status(500);
  res.json({
    "error": `${err}`
  });
});

module.exports = app;
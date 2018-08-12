"use strict";

const global = require("./config")();

const config = {
    hostname: global.host,
    port: global.port,
    db: {
        url: global.urlDb
    }
};

module.exports = config;
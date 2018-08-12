"use strict";

const router = require("express").Router();

const hotelsRoutes = require("./routes/hotels");

router.use("/hotels", hotelsRoutes);

module.exports = router;
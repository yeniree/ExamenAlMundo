"use strict";

const router = require("express").Router();

const controller = require("./../controllers/hotels");

/*
 * /api/hotels/     GET    - READ ALL
 * /api/hotels/     POST   - CREATE
 * /api/hotels/:id  GET    - READ ONE
 * /api/hotels/:id  PUT    - UPDATE
 * /api/hotels/:id  DELETE - DELETE
 */

router.route("/")
    .get(controller.get)
    .get(controller.all)
    .post(controller.post);

router.route("/:id")
    .put(controller.put)
    .delete(controller.delete);

module.exports = router;
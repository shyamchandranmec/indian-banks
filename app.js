"use strict";
let express = require("express");
let consign = require("consign");
let logger = require("winston");
let app = express();

consign()
    .include("./helpers")
    .then("./models/connection.js")
    .then("./models/")
    .then("./middlewares/basicSettings.js")
    .then("./middlewares/staticResources.js")
    .then("./middlewares/staticResources.js")
    .then("./services/")
    .then("./controllers/")
    .then("./routes")
    .then("./middlewares/routes.js")
    .then("./middlewares/errorHandler.js")
    .then("./middlewares/server.js")
    .into(app);




module.exports = app;
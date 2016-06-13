/**
 * Created by shyam on 13/06/16.
 */

"use strict";



let express = require('express');
let router = express.Router();


module.exports = (app) => {

    let logger = app.helpers.logger;
    let bankController = app.controllers.banksController;

    router.route("/").get((req, res, next) => {
        bankController.getDistinctBanks(req, res, next)
    });

    router.route("/:id/branches").get((req, res, next) => {
        bankController.getBranches(req, res, next)
    });

    router.route("/:id/cities").get((req, res, next) => {
        bankController.getDistinctCities(req, res, next)
    });

    return router;

};
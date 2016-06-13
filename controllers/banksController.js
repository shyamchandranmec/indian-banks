/**
 * Created by shyam on 28/05/16.
 */

"use strict";

module.exports = (app) => {
    let logger = app.helpers.logger;
    let bankService = app.services.bankService;

    function getDistinctBanks (req, res, next) {
        return bankService.getDistinctBanks().then((banks) => {
            res.send(banks);
        }).catch((err) => {
            next(err);
        })
    }

    function getBranches (req, res, next) {
        let city = req.param("city");
        return bankService.getBranches(req.params.id, city).then((branches) => {
            res.send(branches);
        }).catch((err) => {
            next(err);
        })
    }
    function getDistinctCities (req, res, next) {
        return bankService.getDistinctCities(req.params.id).then((cities) => {
            res.send(cities);
        }).catch((err) => {
            next(err);
        })
    }

    return {
        getDistinctBanks,
        getBranches,
        getDistinctCities
    }
}

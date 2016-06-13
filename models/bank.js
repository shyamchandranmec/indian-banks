/**
 * Created by shyam on 08/06/16.
 */

"use strict";

module.exports = (app) => {
    let mongoose = require("mongoose");
    let logger = app.helpers.logger;
    let errorFormatter = app.helpers.errorFormatter;


    let bankSchema = mongoose.Schema({
        ifsc: String,
        bank_id: Number,
        branch: String,
        address: String,
        city: String,
        district: String,
        state: String,
        bank_name: String
    }, {
        collection: "banks"
    });

    let BankModel = mongoose.model("bank", bankSchema);

 
    BankModel.getDistinctBanks = () => {
        logger.info("Finding distinct banks");
        return new Promise((resolve, reject) => {
            BankModel.aggregate([
                {
                    "$group": {
                        _id: {bank_name: "$bank_name", bank_id: "$bank_id"},
                    }
                }, {
                    "$project": {
                        _id: 0,
                        bankName: "$_id.bank_name",
                        bankId: "$_id.bank_id"
                    }
                }
            ]).exec().then((banks) => {
                logger.info("banks found - " + banks.length);
                return resolve(banks);
            }).catch((err) => {
                logger.error("Unable to find banks");
                logger.error(err);
                let errorObject = errorFormatter.createErrorObject({
                    status: 404,
                    message: "Unable to find bank",
                    details: err.message
                });
                return reject(errorObject);
            })
        })
    }

    BankModel.getDistinctCities = (bankId) => {
        logger.info("Finding distinct cities");
        return new Promise((resolve, reject) => {
            BankModel.find({bank_id: bankId}).distinct("city").then((cities) => {
                logger.info("cities found - " + cities.length);
                return resolve(cities);
            }).catch((err) => {
                logger.error("Unable to find cities");
                logger.error(err);
                let errorObject = errorFormatter.createErrorObject({
                    status: 404,
                    message: "Unable to find cities",
                    details: err.message
                });
                return reject(errorObject);
            })
        })
    }

    BankModel.getBranches = (bankId, city) => {
        logger.info("Finding all branches of  ", bankId);
        return new Promise((resolve, reject) => {
            BankModel.find({'bank_id': bankId, city: city}).then((banks) => {
                logger.info("Branches found - " + banks.length);
                return resolve(banks);
            }).catch((err) => {
                logger.error("Unable to find bank branches");
                logger.error(err);
                let errorObject = errorFormatter.createErrorObject({
                    status: 404,
                    message: "Unable to find bank branches",
                    details: err.message
                });
                return reject(errorObject);
            })
        })
    };

    return BankModel;
};
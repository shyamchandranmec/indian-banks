/**
 * Created by shyam on 08/06/16.
 */

"use strict";

module.exports = (app) => {

    let bankModel = app.models.bank;

    function getDistinctBanks() {
        return bankModel.getDistinctBanks();
    }

    function getBranches(id,city) {
        return bankModel.getBranches(id,city);
    }

    function getDistinctCities(id) {
        return bankModel.getDistinctCities(id);
    }

    return {
        getDistinctBanks,
        getBranches,
        getDistinctCities
    }
};
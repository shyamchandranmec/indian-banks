/**
 * Created by shyam on 28/05/16.
 */

"use strict";

module.exports = (app) => {
    let logger = app.helpers.logger;

    function fetchHomePageData (req, res, next) {
        res.render('index', {title: 'Indian banks', data: []});
    }

    return {
        fetchHomePageData: fetchHomePageData
    }
}

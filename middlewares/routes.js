"use strict";

module.exports = app => {
    app.use("/", app.routes.index);
    app.use("/banks", app.routes.banks);
};
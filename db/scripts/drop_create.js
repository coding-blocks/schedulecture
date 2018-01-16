const models = require('./../models');

models.DATABASE.sync({
    force: true,
}).then(function() {
    console.log("Database Recreated")
}).catch(function (err) {
    console.log(err);
})
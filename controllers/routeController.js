var db = require('../app');

/*
var promise = require('bluebird');
var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/puppies';
var db = pgp(connectionString);
*/

// const Intersections = require('../models').Intersections;

exports.add = function(req, res, next) {
    res.send("Unimplemented: Routes Controller, add function");
};

exports.delete = function(req, res) {
    res.send("Unimplemented: Routes Controller, delete function");
};

exports.get = function(req, res) {
    // this doesn't work
    db.any('select * from routes')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL routes'
                });
        })
        .catch(function (err) {
            console.error(err);
            return next(err);
        });
    // res.send("Unimplemented: Routes Controller, get function");
};
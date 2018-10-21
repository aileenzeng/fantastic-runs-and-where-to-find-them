var express = require('express');
var router = express.Router();

const routesController = require('../controllers').routes;

/* Home page */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* Routes */
router.post('/api/routes', routesController.add);

module.exports = router;
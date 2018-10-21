var express = require('express');
var router = express.Router();
var path = require('path');

const routesController = require('../controllers').routes;

/* Home page */
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'), { title: 'Express' });
});

/* Routes */
router.post('/api/routes', routesController.add);

module.exports = router;
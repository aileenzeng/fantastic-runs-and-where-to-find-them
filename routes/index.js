var express = require('express');
var router = express.Router();

/* Add controllers here */
const indexController = require('../controllers/indexController');
const routesController = require('../controllers/routeController');
const intersectionController = require('../controllers/intersectionController');

/* Home page */
router.get('/', indexController.index);

/* Routes */
router.get('/api/routes/add', routesController.add);
router.get('/api/routes/get', routesController.get);
router.get('/api/routes/delete', routesController.delete);

module.exports = router;
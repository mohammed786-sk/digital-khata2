const advice = require('../controllers/weatherController');
const wRouter = require('express').Router();

wRouter.get('/', advice);

module.exports = wRouter;
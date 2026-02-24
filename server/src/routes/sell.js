const sRouter = require('express').Router();
const newsales = require('../controllers/salesController')

sRouter.post('/sell', newsales);

module.exports = sRouter;
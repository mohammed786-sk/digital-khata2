const summary = require('express').Router();
const report = require('../controllers/summaryController');

summary.get('/', report);

module.exports = summary;
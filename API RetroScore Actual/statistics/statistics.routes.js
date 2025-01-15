const express = require('express');
const { createStatistic, getStatistics, getLastStatistics } = require('./statistics.controllers.js');

const router = express.Router();

router.post('/', createStatistic);
router.get('/', getStatistics);
router.get('/last', getLastStatistics);

module.exports = { statisticsRouter: router };
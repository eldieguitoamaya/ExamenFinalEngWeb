const { StatisticsModel } = require('./statistics.model.js');

const createStatistic = async (req, res) => {
  try {
    const statistic = new StatisticsModel(req.body);
    await statistic.save();
    res.status(201).json(statistic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStatistics = async (req, res) => {
  const { dataInici, dataFinal, llocEvent, tipusEvent } = req.query;
  const filters = {};

  if (dataInici) filters.createdAt = { $gte: new Date(dataInici) };
  if (dataFinal) filters.createdAt = { ...filters.createdAt, $lte: new Date(dataFinal) };
  if (llocEvent) filters.llocEvent = llocEvent;
  if (tipusEvent) filters.tipusEvent = tipusEvent;

  try {
    const statistics = await StatisticsModel.find(filters);
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLastStatistics = async (req, res) => {
  const { dataInici, dataFinal, llocEvent, tipusEvent } = req.query;
  const filters = {};

  if (dataInici) filters.createdAt = { $gte: new Date(dataInici) };
  if (dataFinal) filters.createdAt = { ...filters.createdAt, $lte: new Date(dataFinal) };
  if (llocEvent) filters.llocEvent = llocEvent;
  if (tipusEvent) filters.tipusEvent = tipusEvent;

  try {
    const statistics = await StatisticsModel.find(filters).sort({ createdAt: -1 }).limit(10);
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStatistic,
  getStatistics,
  getLastStatistics
};
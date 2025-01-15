const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  userId: { type: String, default: null },
  llocEvent: { type: String, required: true },
  tipusEvent: { type: String, enum: ['visita', 'click'], required: true },
  createdAt: { type: Date, default: Date.now }
});

const StatisticsModel = mongoose.model('Statistics', statisticsSchema);

module.exports = { StatisticsModel };
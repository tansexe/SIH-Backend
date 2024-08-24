const mongoose = require('mongoose');

const TrafficDataSchema = new mongoose.Schema({
    stopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stop' },
    congestionLevel: Number,
    timestamp: Date,
});

module.exports = mongoose.model('TrafficData', TrafficDataSchema);
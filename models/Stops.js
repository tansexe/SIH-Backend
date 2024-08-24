const mongoose = require('mongoose');

const StopSchema = new mongoose.Schema({
    stopId: String,
    name: String,
    location: { lat: Number, lng: Number },
    neighbors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stop' }],
});

module.exports = mongoose.model('Stop', StopSchema);
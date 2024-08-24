const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
    routeId: String,
    stops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stop' }],
});

module.exports = mongoose.model('Route', RouteSchema);
const express = require("express");
const router = express.Router();
const Stop = require("../models/Stops");
const { dijkstra, getShortestPath } = require("../utils/dijkstra");
const { constructGraph } = require("../controllers/routeController");

router.get("/optimize-route", async (req, res) => {
  try {
    const { startStopId, endStopId } = req.query;
    const graph = await constructGraph();

    // Run Dijkstra’s algorithm
    const { distances, previousNodes } = dijkstra(graph, startStopId);
    const shortestPath = getShortestPath(previousNodes, endStopId);

    // Fetch details of the stops in the shortest path
    const pathDetails = await Stop.find({ _id: { $in: shortestPath } });

    res.json({
      path: shortestPath,
      pathDetails,
      distance: distances[endStopId],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

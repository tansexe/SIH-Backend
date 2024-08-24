const Stop = require("../models/Stops");
const TrafficData = require("../models/TrafficData");
const { dijkstra, getShortestPath } = require("../utils/dijkstra");

async function constructGraph() {
  const stops = await Stop.find();
  const graph = {};

  stops.forEach((stop) => {
    graph[stop._id] = {};
    stop.neighbors.forEach((neighbor) => {
      graph[stop._id][neighbor.stopId] = neighbor.distance;
    });
  });

  return graph;
}


const calculateDistance = (loc1, loc2) => {
  //Haversine formula to calculate distance between two coordinates
  const R = 6371; // Radius of Earth in km
  const dLat = ((loc2.lat - loc1.lat) * Math.PI) / 180;
  const dLng = ((loc2.lng - loc1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((loc1.lat * Math.PI) / 180) *
      Math.cos((loc2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

module.exports = {
  constructGraph,
  calculateDistance,
};

const dijkstra = (graph, startNode) => {
  const distances = {};
  const visited = new Set();
  const previousNodes = {};
  const queue = [];

  for (const node in graph) {
    distances[node] = Infinity;
    previousNodes[node] = null;
  }
  distances[startNode] = 0;
  queue.push({ node: startNode, distance: 0 });

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance);
    const { node } = queue.shift();

    // Skip nodes that have been visited
    if (visited.has(node)) continue;
    visited.add(node);

    // Update distances to neighboring nodes
    for (const neighbor in graph[node]) {
      const distance = graph[node][neighbor];
      const totalDistance = distances[node] + distance;

      if (totalDistance < distances[neighbor]) {
        distances[neighbor] = totalDistance;
        previousNodes[neighbor] = node;
        queue.push({ node: neighbor, distance: totalDistance });
      }
    }
  }

  return { distances, previousNodes };
};

const getShortestPath = (previousNodes, endNode) => {
  const path = [];
  let currentNode = endNode;

  while (currentNode) {
    path.unshift(currentNode);
    currentNode = previousNodes[currentNode];
  }

  return path;
};

module.exports = { dijkstra, getShortestPath };

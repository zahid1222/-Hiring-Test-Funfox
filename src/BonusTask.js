
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Keep track of connected clients and their groups
const clients = new Map();

// WebSocket server event handling
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'join_group') {
      // Store the WebSocket connection with the user's group
      clients.set(data.group, ws);
    }
  });

  ws.on('close', () => {
    // Remove the WebSocket connection when a client disconnects
    clients.forEach((client, group) => {
      if (client === ws) {
        clients.delete(group);
      }
    });
  });
});

// Function to send notifications to clients in a group
const sendNotificationToGroup = (group, notification) => {
  const ws = clients.get(group);
  if (ws) {
    ws.send(JSON.stringify(notification));
  }
};

module.exports = { sendNotificationToGroup };

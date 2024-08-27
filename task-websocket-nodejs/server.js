const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

const clients = new Map();

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.type === 'connection') {
      email = parsedMessage.sender;
      const logger = `Client ${email} is online`;
      console.log(logger);
      ws.send(JSON.stringify({ content: 'Hello client', sender: 'server' }));
      const targetClients = clients.get(email);
      if (targetClients) {
        targetClients.push(ws);
        clients.set(email, targetClients);
      } else {
        clients.set(email, [ws]);
      }
    }
    if (parsedMessage.type === 'new_message') {
      console.log('Forwarded message');
      const recipientClients = clients.get(parsedMessage.target);
      recipientClients &&
        recipientClients.map((recipientClient) => {
          recipientClient.send(message);
        });
    }
  });
  ws.on('close', () => {
    for (let [key, value] of clients.entries()) {
      if (value.includes(ws)) {
        if (value.length === 1) {
          clients.delete(key);
        }
        if (value.length > 1) {
          const newValue = value.filter((socket) => socket !== ws);
          clients.set(key, newValue);
        }
        const logger = `Client ${key} left`;
        console.log(logger);
      }
    }
  });
});

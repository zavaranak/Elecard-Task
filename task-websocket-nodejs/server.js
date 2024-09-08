const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

const NEW_MES = 'new_message';
const NEW_REQ = 'new_chat_request';
const DEL_MES = 'deleted_message';
const UPD_MES = 'edited_message';
const READ_MES = 'read_message';
const READ_ALL = 'read_all';

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
    if (parsedMessage.type === NEW_MES || parsedMessage.type === NEW_REQ) {
      console.log('Forwarded message');
      const recipientClients = clients.get(parsedMessage.target);
      recipientClients &&
        recipientClients.map((recipientClient) => {
          recipientClient.send(message);
        });
    }
    if (parsedMessage.type === DEL_MES) {
      console.log('Deleting message');
      const recipientClients = clients.get(parsedMessage.target);
      recipientClients &&
        recipientClients.map((recipientClient) => {
          recipientClient.send(message);
        });
    }
    if (parsedMessage.type === UPD_MES) {
      console.log('Update message');
      const recipientClients = clients.get(parsedMessage.target);
      recipientClients &&
        recipientClients.map((recipientClient) => {
          recipientClient.send(message);
        });
    }
    if (parsedMessage.type === READ_MES) {
      console.log('Read message');
      const recipientClients = clients.get(parsedMessage.target);
      recipientClients &&
        recipientClients.map((recipientClient) => {
          recipientClient.send(message);
        });
    }
    if (parsedMessage.type === READ_ALL) {
      console.log('Read all messages');
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

const WebSocket = require('ws');

const email = 'test@test.com';

const ws = new WebSocket(`ws://localhost:3000`);
ws.onopen = () => {
  console.log('Connected to server');
  ws.send(JSON.stringify({ type: 'connection', sender: email }));
  ws.send(
    JSON.stringify({
      sender: email,
      target: 'dangnam@test.com',
      content: 'Hi from test@test.com',
      type: 'new_message',
      timestamp: 123123123123,
    })
  );
};

ws.onmessage = (event) => {
  parsedMessage = JSON.parse(event.data);
  console.log(parsedMessage);
};

ws.onclose = () => {
  console.log('Disconnected from server');
};

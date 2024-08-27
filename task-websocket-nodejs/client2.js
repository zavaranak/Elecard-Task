const WebSocket = require('ws');

const email = 'dangnam@test.com';

const ws = new WebSocket(`ws://localhost:3000`);
ws.onopen = () => {
  console.log('Connected to server');
  ws.send(JSON.stringify({ type: 'connection', sender: email }));
  ws.send(
    JSON.stringify({
      sender: email,
      target: 'test@test.com',
      content: 'Hi from dangnam@tets.com',
      type: 'new_message',
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

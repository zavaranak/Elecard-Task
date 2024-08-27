let socket;

export const initWebSocket = (url, user) => {
  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('WebSocket connected');
    const messageConnection = JSON.stringify({
      type: 'connection',
      sender: user,
    });
    socket &&
      socket.readyState === WebSocket.OPEN &&
      socket.send(messageConnection);
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected');
  };
};

export const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const formatedMessage = JSON.stringify(message);
    socket.send(formatedMessage);
  } else {
    console.error('WebSocket is not connected');
  }
};

export const closeWebSocket = () => {
  if (socket) {
    socket.close();
  }
};

export const getSocket = () => socket;
// const ws = new WebSocket(`ws://localhost:3000`);
// ws.onopen = () => {
//   console.log('Connected to server');
//   ws.send(JSON.stringify({ type: 'connection', sender: email }));
//   ws.send(
//     JSON.stringify({
//       sender: email,
//       target: 'dangnam@test.com',
//       content: 'Hi from test@tets.com',
//       type: 'new_message',
//     })
//   );
// };

// ws.onmessage = (event) => {
//   parsedMessage = JSON.parse(event.data);
//   console.log(parsedMessage);
// };

// ws.onclose = () => {
//   console.log('Disconnected from server');
// };

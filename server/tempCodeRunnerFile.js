const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for development. Adjust this for production.
    methods: ['GET', 'POST'],
  },
});

const PORT = 3001;

// Store users looking for a match and active rooms
let waitingUsers = [];
let activeRooms = new Map();

// Configure the proxy middleware
const API_KEY = '6fcbf27b-903e-458f-b355-c4f2a25b5522'; // Your Tracker Network API key
const API_URL = 'https://public-api.tracker.gg/v2/csgo/standard/profile/steam'; // Base URL for the API

app.use(cors()); // Enable CORS for the Express server

app.use('/api/csgo', createProxyMiddleware({
  target: API_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/csgo': '', // Remove the /api/csgo prefix when forwarding to the Tracker API
  },
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('TRN-Api-Key', API_KEY); // Add the API key to the request header
    proxyReq.setHeader('Accept', 'application/json');
  }
}));

// Socket.io logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('find match', ({ userId, username, game, genre }) => {
    console.log(`${username} is looking for a match in ${game} (${genre})`);

    // Add user to the waiting list
    waitingUsers.push({ socketId: socket.id, userId, username, game, genre });

    // Check if there is another user waiting for a match in the same game and genre
    const match = waitingUsers.find(
      (user) => user.socketId !== socket.id && user.game === game && user.genre === genre
    );

    if (match) {
      // Create a room ID
      const roomId = `room-${Date.now()}`;

      // Create room data
      const roomData = {
        id: roomId,
        game,
        genre,
        users: [
          { socketId: socket.id, userId, username },
          { socketId: match.socketId, userId: match.userId, username: match.username }
        ]
      };

      // Store room data
      activeRooms.set(roomId, roomData);

      // Notify both users about the match
      io.to(socket.id).emit('match found', { roomId, users: roomData.users });
      io.to(match.socketId).emit('match found', { roomId, users: roomData.users });

      // Join the room
      socket.join(roomId);
      io.sockets.sockets.get(match.socketId).join(roomId);

      // Remove both users from the waiting list
      waitingUsers = waitingUsers.filter((user) => user.socketId !== socket.id && user.socketId !== match.socketId);
    }
  });

  socket.on('join room', ({ roomId, userId, username }) => {
    const room = activeRooms.get(roomId);
    if (room) {
      const newUser = { socketId: socket.id, userId, username };
      room.users.push(newUser);
      socket.join(roomId);
      io.to(roomId).emit('user joined', { user: newUser });
      socket.emit('match found', { roomId, users: room.users });
    } else {
      socket.emit('error', { message: 'Room not found' });
    }
  });

  socket.on('leave room', ({ roomId, userId }) => {
    const room = activeRooms.get(roomId);
    if (room) {
      room.users = room.users.filter(user => user.userId !== userId);
      if (room.users.length === 0) {
        activeRooms.delete(roomId);
      } else {
        activeRooms.set(roomId, room);
      }
      socket.leave(roomId);
      io.to(roomId).emit('user left', { userId });
    }
  });

  socket.on('chat message', ({ roomId, message }) => {
    io.to(roomId).emit('chat message', message);
  });

  socket.on('offer', ({ roomId, offer }) => {
    socket.to(roomId).emit('offer', offer);
  });

  socket.on('answer', ({ roomId, answer }) => {
    socket.to(roomId).emit('answer', answer);
  });

  socket.on('ice-candidate', ({ roomId, candidate }) => {
    socket.to(roomId).emit('ice-candidate', candidate);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Remove disconnected user from the waiting list
    waitingUsers = waitingUsers.filter((user) => user.socketId !== socket.id);

    // Remove user from any active rooms
    activeRooms.forEach((room, roomId) => {
      const userIndex = room.users.findIndex(user => user.socketId === socket.id);
      if (userIndex !== -1) {
        const userId = room.users[userIndex].userId;
        room.users.splice(userIndex, 1);
        if (room.users.length === 0) {
          activeRooms.delete(roomId);
        } else {
          activeRooms.set(roomId, room);
          io.to(roomId).emit('user left', { userId });
        }
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

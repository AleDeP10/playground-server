import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
dotenv.config();
import { corsOptions, socketCorsOptions } from './config/corsConfig.js';
//import { authenticateTokenSocket } from './middleware/socketAuthMiddleware';
import knexMiddleware from './middleware/dbMiddleware.js';


const app = express();

//https server ====================================================================
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const httpServer = http.createServer(app);

import homeRoutes from './routes/home.js';
// const authRoutes = require('./routes/authRoutes');
//import userRoutes from './routes/userRoutes';
//import usersRoutes from './routes/usersRoutes';

//import chatController from './controllers/chatController';
app.use(knexMiddleware);

app.use('/', homeRoutes);
// app.use('/myopenchat/api/auth', authRoutes);
//app.use('/myopenchat/api/user', userRoutes);
//app.use('/myopenchat/api/users', usersRoutes);

//socket ==========================================================================
import http from 'http';
import { Server } from "socket.io";
import jwt from 'jsonwebtoken';

const server = http.createServer(app);

const router = express.Router();
app.use('/', router);

const io = new Server(httpServer, {
    // Opzioni di configurazione
    server, socketCorsOptions
  });

//const utentiConnessi = require('./dataStore');

// function logUtentiConnessi(){
//   console.log("utentiConnessi:")
//   for (const key in utentiConnessi) {
//     if (Object.hasOwnProperty.call(utentiConnessi, key)) {
//       const value = utentiConnessi[key];
//       console.log(`connected user ${key} -> `,JSON.stringify(value));
//     }
//   }
// }

// io.use((socket, next) => {
//   console.log('Using authentication middleware'); // Log di debug
//   authenticateTokenSocket(socket, next);
// });

// io.on('connection', (socket) => {

//   socket.broadcast.emit('userJoined', socket.userId);
//   utentiConnessi[socket.userId] = socket.id;
//   logUtentiConnessi()

//   socket.on('sendMessage', (msgData) => {
//     msgData["userId"] = socket.userId
//     console.log('Received message:', msgData)

//     try {
//       chatController.inserChatMessage(msgData);
//       const targetSocket = utentiConnessi[msgData.recUserId] 
//       io.to(targetSocket).emit('receiveMessage', { msgData });
//     } catch (error) {
//         console.log('Errore durante l\'inserimento del messaggio:', error);
//     } 

//   });

//   socket.on('isUserTyping', (msgData) => {
//     msgData["userId"] = socket.userId
//     console.log('Received isUserTyping message:', msgData)
//     try {
//       const targetSocket = utentiConnessi[msgData.recUserId] 
//       io.to(targetSocket).emit('isUserTyping', { msgData });
//     } catch (error) {
//         console.log('Errore durante l\'invio del messaggio:', error);
//     }

//   });

//   socket.on('disconnect', () => {
//     socket.broadcast.emit('userLeft', socket.userId);
//     console.log('User disconnected: '+socket.userId);
//     delete utentiConnessi[socket.userId];
//     logUtentiConnessi()
//   });

// });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

//console.log('index.js', { utentiConnessi })
//logUtentiConnessi();
console.log('Operativo.');
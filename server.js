import express from 'express'; 

const server = express();
server.use(express.json());

server.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 3000;
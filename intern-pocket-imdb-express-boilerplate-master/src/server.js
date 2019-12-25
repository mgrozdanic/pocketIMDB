const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const expressJwt = require('express-jwt');

const http = require("http");
const WebSocket = require("ws");

const envPath = path.resolve(process.cwd(), 'src', '.env');
require('dotenv').config({
  path: envPath,
});

const { authRoutes, movieRoutes } = require('./routes');
const db = require('./database');

const app = express();
const port = 3000 || process.env.APP_PORT;

app.use(morgan('combined'));

//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const jwtAuth = expressJwt({
  secret: process.env.JWT_SECRET,
}).unless({ path: ['/auth/register', '/auth/login', '/auth/unique', '/auth/verify'] });

app.use(jwtAuth);

app.use(authRoutes);
app.use(movieRoutes);

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: ', message);
    wss.clients
      .forEach(client => {
        if (client != ws) {
          client.send(message);
        }    
      });
  });

  //send immediatly a feedback to the incoming connection    
  ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

db.connect()
  // eslint-disable-next-line no-console
  .then(() => console.log('Connected to MongoDB!'))
  // eslint-disable-next-line no-console
  .catch(err => console.error('Error while connecting to MongoDB.', err));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App started successfully! Try it at http://localhost:${port}`));

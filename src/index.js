import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import http from 'http';
import { WebSocketServer } from "ws"


import routes from './routes/index.js';

const app = express();

app.use(bodyParser.json());
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(routes);
app.use(function (_, response) {
    response.render('index');
});

const PORT = 9091;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

const httpServer = http.createServer(app);
httpServer.listen(9090, err => {
    if (err) {
        console.log('Well, this didn\'t work...');
        process.exit();
    }
    console.log('Web Socket Server is listening on port 9090');
});

const wss = new WebSocketServer({ server: httpServer });

const channels = {};

wss.on('connection', (ws) => {
    // Join a specific channel
    const channel = 'general';
    if (!channels[channel]) {
        channels[channel] = [];
    }
    channels[channel].push(ws);

    // Handle incoming messages
    ws.on('message', (message) => {
        // Broadcast message to all clients in the channel
        channels[channel].forEach((client) => {
            client.send(message);
        });
    });

    // Handle disconnections
    ws.on('close', () => {
        // Remove client from the channel
        channels[channel] = channels[channel].filter((client) => client !== ws);
    });
});



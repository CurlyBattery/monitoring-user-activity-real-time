import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import http  from "http";
import websocket from 'websocket';

import routes from './routes/index.js';

async function main() {
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

    const httpServer = http.createServer();
    httpServer.listen(9090, () => console.log(`Listening on port 9090`));
    const websocketServer = websocket.server;

    const wsServer = new websocketServer({
        "httpServer": httpServer,
    });

    wsServer.on('request', request => {
        const connection = request.accept(null, request.origin);
        connection.on('open', () => console.log('opened!'));
        connection.on('close', () => console.log('closed!'));
        connection.on('message', message => {});
    })
}

main();
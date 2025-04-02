import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import path from 'path';
import ejs from 'ejs';


async function main() {
    const app = express();

    app.use(bodyParser.json());
    app.engine('html', ejs.renderFile);
    app.set('view engine', 'html');

    app.use(routes);
    app.use(function (_, response) {
        response.render('index');
    });

    const PORT = 3000;

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}

main();
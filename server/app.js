import * as fs from 'fs';
import * as restify from 'restify';
import { PORT, APP_NAME } from './config/constants';
import logger from './tools/logger';

export const api = restify.createServer({ name: APP_NAME });

restify.CORS.ALLOW_HEADERS.push('authorization');
api.use(restify.CORS());
api.pre(restify.pre.sanitizePath());
api.use(restify.acceptParser(api.acceptable));
api.use(restify.bodyParser());
api.use(restify.queryParser());
api.use(restify.authorizationParser());
api.use(restify.fullResponse());


fs.readdirSync(__dirname + '/routes').forEach((routeConfig) => {
    if (routeConfig.substr(-3) === '.js') {
        let route = require(__dirname + '/routes/' + routeConfig);
        route.routes(api);
    }
});

api.listen(PORT, function () {
    logger.log(`INFO: ${APP_NAME} is running at ${api.url}`);
});

import logger from '../tools/logger';

export default class ResponseHandler {
    errorHandler(e, res, next) {
        logger.error(e);
        res.json(500, e);
        return next();
    }

    successHandler(response, res, next) {
        logger.success(response);
        res.json(200, response);
        return next();
    }
}
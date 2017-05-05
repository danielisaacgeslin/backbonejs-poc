import { MongoClient } from 'mongodb';
import { DB_URI } from '../config/constants';
import logger from '../tools/logger';

let connection;

export default class DbHelper {
    connect() {
        if (connection) return Promise.resolve(connection);

        logger.log('connecting to database');
        connection = MongoClient.connect(DB_URI);
        return connection;
    }
}
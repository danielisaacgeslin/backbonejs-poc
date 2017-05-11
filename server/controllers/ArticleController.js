import logger from '../tools/logger';
import DbHelper from '../services/DbHelper';
import ResponseHandler from '../services/ResponseHandler';
import { ObjectID } from 'mongodb';

export default class ArticleController {

    constructor() {
        this.collectionName = 'articles';
        this.rh = new ResponseHandler();
        this.db = new DbHelper();

        this.post = this.post.bind(this);
        this.get = this.get.bind(this);
        this.put = this.put.bind(this);
        this.del = this.del.bind(this);
    }

    get(req, res, next) {
        this.db.connect()
            .then(logger.chainLog(`geting ${this.collectionName}`), e => Promise.reject(e))
            .then(db => db.collection(this.collectionName).find(req.query).toArray(), e => Promise.reject(e))
            .then(r => this.rh.successHandler(r, res, next), e => Promise.reject(e))
            .catch(e => this.rh.errorHandler(e, res, next));
    }

    post(req, res, next) {
        this.db.connect()
            .then(logger.chainLog(`posting ${this.collectionName}`), e => Promise.reject(e))
            .then(db => db.collection(this.collectionName).insert(req.params), e => Promise.reject(e))
            .then(r => this.rh.successHandler(req.params, res, next), e => Promise.reject(e))
            .catch(e => this.rh.errorHandler(e, res, next));
    }

    put(req, res, next) {
        const params = { ...req.params };
        delete params.id;
        delete params._id;
        this.db.connect()
            .then(logger.chainLog(`puting ${this.collectionName}`), e => Promise.reject(e))
            .then(db => db.collection(this.collectionName).update(
                { _id: ObjectID(req.params._id) }, { $set: params }, false, true
            ), e => Promise.reject(e))
            .then(r => this.rh.successHandler(r, res, next), e => Promise.reject(e))
            .catch(e => this.rh.errorHandler(e, res, next));
    }

    del(req, res, next) {
        this.db.connect()
            .then(logger.chainLog(`deleting ${this.collectionName}`), e => Promise.reject(e))
            .then(db => db.collection(this.collectionName).deleteOne(req.query), e => Promise.reject(e))
            .then(r => this.rh.successHandler(r, res, next), e => Promise.reject(e))
            .catch(e => this.rh.errorHandler(e, res, next));
    }

}
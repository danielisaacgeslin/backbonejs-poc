import { Model } from 'backbone';

export default class Article extends Model {
    initialize() {
        this.idAttribute = "id";
        this.urlRoot = './server';
    }

    defaults() {
        return {
            id: '',
            title: '',
            description: '',
            body: '',
            owner: ''
        };
    }

    validate(attrs) {

    }
}
import { Model } from 'backbone';

export default class Article extends Model {
    constructor(params) {
        super(params);
    }

    initialize() {
        this.idAttribute = "id";
        this.urlRoot = 'http://localhost';
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
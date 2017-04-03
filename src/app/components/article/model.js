import { Model } from 'backbone';

export default class Article extends Model {
    constructor() { }

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
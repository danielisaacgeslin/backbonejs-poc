import { Model } from 'backbone';

export default class Article extends Model {
    constructor() {
        super();
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
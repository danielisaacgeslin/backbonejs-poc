import { Model } from 'backbone';

export default class Article extends Model {
    initialize() {
        this.idAttribute = "_id";
        this.urlRoot = 'http://localhost:4000/article';
    }

    defaults() {
        return {
            _id: null,
            title: '',
            description: '',
            body: '',
            owner: ''
        };
    }

    validate(attrs) {
        if (!attrs.title) return 'title is required';
        if (!attrs.owner) return 'owner is required';
    }
}
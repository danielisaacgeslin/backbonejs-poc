import { Model } from 'backbone';

export default class HeaderModel extends Model {
    initialize() {
        
    }

    defaults() {
        return {
            todo: ''
        };
    }

    validate(attrs) {

    }
}
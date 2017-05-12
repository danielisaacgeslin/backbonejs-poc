import { Model } from 'backbone';

export default class DummyModel extends Model {
    initialize() {

    }

    defaults() {
        return {
            title: '',
            toast: '',
            status: ''
        };
    }

    validate(attrs) {

    }
}
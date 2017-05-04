import _template from 'lodash/template';
import { View } from 'backbone';
import DummyModel from './model';

export default class DummyView extends View {
    initialize() {
        this.model = new DummyModel();
        this.tagName = 'div';
        this.className = 'dummy'
        this.template = require('./template.html');
        this.render();
    }

    events() {
        return {};
    }

    render() {
        this.$el.html(_template(this.template)(this.model.toJSON()));
    }
}
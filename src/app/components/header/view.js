import _template from 'lodash/template';
import { View, history } from 'backbone';
import HeaderModel from './model';

export default class HeaderView extends View {
    initialize() {
        this.model = new HeaderModel();
        this.tagName = 'header';
        this.className = 'header'
        this.template = require('./template.html');
        this.listenTo(this.model, 'change', this.render.bind(this));
        this.listenTo(this.model, 'destroy', this.remove.bind(this));
        this.render();
    }

    events() {
        return {
            'click .goToArticleList': () => this.goTo(''),
            'click .goToDummy': () => this.goTo('dummy')
        };
    }

    goTo(path) {
        history.navigate(path, true);
    }

    render() {
        this.$el.html(_template(this.template)(this.model.toJSON()));
    }
}
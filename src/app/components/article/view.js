import _template from 'lodash/template';
import { View } from 'backbone';
import ArticleModel from './model';

export default class ArticleView extends View {
    constructor(options) {
        super(options);
    }

    initialize() {
        this.model = new ArticleModel();
        this.tagName = 'div';
        this.className = 'article'
        this.template = require('./template.html');

        this.listenTo(this.model, 'change', this.render.bind(this));
        this.listenTo(this.model, 'destroy', this.remove.bind(this));
        this.render();
    }

    events() {
        return {
            'change input': 'updateModelFromInputs'
        };
    }

    updateModelFromInputs() {
        let data = {};
        this.$el.find('input').each((i, input) => {
            data[input.getAttribute('name')] = input.value;
        });
        this.model.set(data);
    }

    render() {
        this.$el.html(_template(this.template)(this.model.toJSON()));
        return this;
    }
}
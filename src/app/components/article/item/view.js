import _template from 'lodash/template';
import { View } from 'backbone';
import ArticleModel from './model';

export default class ArticleView extends View {

    initialize(model) {
        this.model = model;
        this.tagName = 'article';
        this.className = 'article'
        this.template = require('./template.html');
        this.config = {};

        this.listenTo(this.model, 'change', this.render.bind(this));
        this.listenTo(this.model, 'destroy', this.remove.bind(this));
        this.render();
    }

    set loading(value) {
        this.config.disabled = value ? 'disabled' : '';
    }

    events() {
        return {
            'change input': 'updateModelFromInputs',
            'click .reset': 'reset',
            'click .delete': 'delete',
            'click .save': 'save'
        };
    }

    updateModelFromInputs() {
        let data = {};
        this.$el.find('input').each((i, input) => {
            data[input.getAttribute('name')] = input.value;
        });
        this.model.set(data);
    }

    reset() {
        const _id = this.model.get('_id');
        this.model.set(Object.assign({}, this.model.defaults(), { _id }));
    }

    delete() {
        this.model.destroy();
    }

    save() {
        this.loading = true;
        this.model.save().then(() => {
            this.loading = false;
            this.render();
        }, () => {
            this.loading = false;
            this.render();
        });
    }

    render() {
        const options = { ...this.model.toJSON(), config: this.config };
        this.$el.html(_template(this.template)(options));
    }
}
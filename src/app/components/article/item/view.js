import _template from 'lodash/template';
import { View } from 'backbone';
import ArticleModel from './model';
import ToasterView from '../../toaster/view';

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
        if (value) {
            this.config.disabled = 'disabled';
            this.$el.find('button, input').attr('disabled', true);
        } else {
            this.config.disabled = '';
            this.$el.find('button, input').removeAttr('disabled');
        }
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
        const save = this.model.save();
        if (save) save.then(() => {
            this.loading = false;
            new ToasterView({ status: 'success', title: 'Success', toast: 'saving is complete' });

        });
        else {
            this.loading = false;
            new ToasterView({ status: 'danger', title: 'Error', toast: 'error while saving' });
        }
    }

    render() {
        const options = { ...this.model.toJSON(), config: this.config };
        this.$el.html(_template(this.template)(options));
    }
}
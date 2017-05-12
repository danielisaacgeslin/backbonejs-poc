import $ from 'jquery';
import _template from 'lodash/template';
import { View } from 'backbone';
import ArticleCollection from './collection';
import ArticleView from '../item/view';

export default class ArticleList extends View {
    initialize() {
        this.collection = new ArticleCollection();
        this.tagName = 'div';
        this.className = 'article-list';
        this.template = require('./template.html');
        this.render();
        this.fetch();
    }

    events() {
        return {
            'click .add': 'add'
        };
    }

    fetch() {
        this.collection.fetch().then(data => {
            this.collection.reset(data);
            this.render();
        }, error => console.error(error));
    }

    add() {
        this.collection.add({});
        this.render();
    }

    render() {
        this.$el.html(_template(this.template)({ lastUpdated: this.collection.models.length ? new Date() : 'fetching...' }));
        this.collection.each((model, index) => {
            let item = new ArticleView(model);
            this.$el.find('.article-list-content').append(item.el);
        });
    }
}

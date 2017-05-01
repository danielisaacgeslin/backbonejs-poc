import $ from 'jquery';
import _template from 'lodash/template';
import { View } from 'backbone';
import ArticleCollection from './collection';
import ArticleView from './view';

export default class ArticleList extends View {
    constructor(options) {
        super(options);
    }

    initialize() {
        this.collection = new ArticleCollection();
        this.tagName = 'div';
        this.className = 'article-list'
        this.template = require('./list-template.html');
        this.render();
        this.fetch();
    }

    fetch() {
        this.collection.fetch().then(data => {
            setTimeout(()=>{ // just to simulate async behaviour
                this.collection.reset(data);
                this.render();
            }, 500);
        }, error => console.error(error));
    }

    render() {
        this.$el.html(_template(this.template)({ lastUpdated: this.collection.models.length ? new Date() : 'fetching...' }));
        this.collection.each((model, index) => {
            let item = new ArticleView(model);
            const itemTemplate = $(_template(require('./list-item-template.html'))({ itemNumber: index + 1 }))
                .addClass('col-md-4 col-sm-6 col-xs-12').find('.article-list-item-content').html(item.el).end();
            this.$el.find('.article-list-content').append(itemTemplate);
        });
    }
}
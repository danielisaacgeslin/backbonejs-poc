import { View } from 'backbone';

export default class ArticleView extends View {
    constructor(options) {
        this.tagName = 'div';
        this.className = 'article'
        this.template = require('./template.html');
        super(options);

        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    }

    initialize() {
        render();
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
}
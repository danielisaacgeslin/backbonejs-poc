import $ from 'jquery';
import { Router, history } from 'backbone';
import ArticleView from './components/article/view';

export default class AppRouter extends Router {
    constructor() {
        super();
    }

    initialize() {
        history.start({ pushState: true });
    }

    routes() {
        return {
            '': 'article'
        };
    }

    article() {
        this.currentView = new ArticleView();
        $('#app').html(this.currentView.el);
    }
}

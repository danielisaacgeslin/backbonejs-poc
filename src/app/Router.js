import $ from 'jquery';
import { Router, history } from 'backbone';
import ArticleList from './components/article/list';

const viewClasses = { ArticleList };

export default class AppRouter extends Router {
    constructor() {
        super();
    }

    initialize() {
        history.start({ pushState: true });
    }

    routes() {
        return {
            '': () => this.renderView('ArticleList')
        };
    }

    renderView(viewClassName) {
        this.currentView = new viewClasses[viewClassName]();
        $('#app').html(this.currentView.el);
    }
}

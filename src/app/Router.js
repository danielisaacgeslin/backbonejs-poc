import $ from 'jquery';
import { Router, history } from 'backbone';
import HeaderView from './components/header/view';
import ArticleList from './components/article/list/view';
import DummyView from './components/dummy/view';

const viewClasses = { ArticleList, DummyView };

export default class AppRouter extends Router {
    initialize() {
        this.app = $('#app');
        history.start({ pushState: true });
        this.app.prepend(new HeaderView().el);
    }

    routes() {
        return {
            '': () => this.renderView('ArticleList'),
            'dummy': () => this.renderView('DummyView')
        };
    }

    renderView(viewClassName) {
        this.currentView = new viewClasses[viewClassName]();
        this.app.find('#outlet').html(this.currentView.el);
    }
}

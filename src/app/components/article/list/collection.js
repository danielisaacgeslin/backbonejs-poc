import { Collection } from 'backbone';
import ArticleModel from '../item/model';

export default class ArticleCollection extends Collection {
    initialize() {
        this.model = ArticleModel;
        this.url = './server/dummy-article-list.json';
    }
}
import { Collection } from 'backbone';
import ArticleModel from './model';

export default class ArticleCollection extends Collection {
    initialize() {
        this.model = ArticleModel;
        this.url = './dummy.json';
    }
}
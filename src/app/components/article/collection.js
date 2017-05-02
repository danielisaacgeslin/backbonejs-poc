import { Collection } from 'backbone';
import ArticleModel from './model';

export default class ArticleCollection extends Collection {
    initialize(params) {
        this.model = ArticleModel;
        this.url = './dummy.json';
    }
}
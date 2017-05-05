import { Collection } from 'backbone';
import ArticleModel from '../item/model';

export default class ArticleCollection extends Collection {
    initialize() {
        this.model = ArticleModel;
        this.url = 'http://localhost:4000/article';
    }
}
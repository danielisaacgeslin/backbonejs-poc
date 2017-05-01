// import { Collection } from 'backbone';
import * as Backbone from 'backbone';
import ArticleModel from './model';

// export default class ArticleCollection extends Collection {
//     constructor(params) {
//         super(params);
//     }

//     model() {
//         return ArticleModel;
//     }
// }

const ArticleCollection = Backbone.Collection.extend({
    model: ArticleModel,
    url: './dummy.json'
});

export default ArticleCollection;
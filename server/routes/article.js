import ArticleController from '../controllers/ArticleController'

export const routes = (api) => {
    let routeCtrl = new ArticleController();
    api.get('/article', routeCtrl.get);
    api.post('/article', routeCtrl.post);
    api.put('/article', routeCtrl.put);
    api.del('/article', routeCtrl.del);
};
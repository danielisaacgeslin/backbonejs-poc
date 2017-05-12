import _template from 'lodash/template';
import { View } from 'backbone';
import ToasterModel from './model';

export default class ToasterView extends View {
    initialize(data) {
        this.model = new ToasterModel(data);
        this.tagName = 'div';
        this.className = 'toaster'
        this.template = require('./template.html');
        this.render();

        setTimeout(()=> this.close(), 3000);
    }

    events() {
        return {};
    }

    close(){
        this.undelegateEvents();
        this.$el.removeData().unbind(); 
        this.remove();
    }

    render() {
        this.$el.html(_template(this.template)(this.model.toJSON())).appendTo('body');
    }
}
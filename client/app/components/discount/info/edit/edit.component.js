import template from './edit.html';
import controller from './edit.controller.js';
import './edit.less';

let editComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default editComponent;

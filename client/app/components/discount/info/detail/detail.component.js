import template from './detail.html';
import controller from './detail.controller.js';
import './detail.less';

let detailComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default detailComponent;

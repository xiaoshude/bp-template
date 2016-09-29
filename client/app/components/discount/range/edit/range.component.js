import template from './../range.html';
import controller from './range.controller.js';
import './../range.less';

let rangeComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default rangeComponent;

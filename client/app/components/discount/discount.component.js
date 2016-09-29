import template from './discount.html';
import controller from './discount.controller';
import './discount.less';

let discountComponent = {
  //restrict: 'E',
  bindings: {},
  template: template,
  controller,
  controllerAs: 'vm'
};

export default discountComponent;


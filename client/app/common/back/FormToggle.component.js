import template from './formToggle.html';
import controller from './formToggle.controller';
import './formToggle.less';

let formToggleComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default formToggleComponent;

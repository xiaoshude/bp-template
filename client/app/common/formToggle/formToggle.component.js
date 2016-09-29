import template from './formToggle.html';
import controller from './formToggle.controller';
import './formToggle.less';

let formToggleComponent = {
  restrict: 'EA',
  bindings: {},
  replace:true,
  template:null,
  controller,
  controllerAs: 'vm'
};

export default formToggleComponent;

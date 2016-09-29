import template from './commonheader.html';
import controller from './commonheader.controller';
import './commonheader.less';

let commonheaderComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default commonheaderComponent;

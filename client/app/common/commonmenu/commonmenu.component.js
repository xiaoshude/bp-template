import template from './commonmenu.html';
import controller from './commonmenu.controller';
import './commonmenu.less';

let commonmenuComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm',
  replace: true
};


export default commonmenuComponent;

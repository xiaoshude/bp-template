import template from './../rule.html';
import controller from './editrule.controller.js';
import './editrule.less';

let editruleComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default editruleComponent;

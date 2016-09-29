import angular from 'angular';
import uiRouter from 'angular-ui-router';
import formToggleComponent from './formToggle.component';

let formToggleModule = angular.module('formToggle', [
  uiRouter
])

.component('formToggle', formToggleComponent);

export default formToggleModule;

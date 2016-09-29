import angular from 'angular';
import uiRouter from 'angular-ui-router';
import formToggleComponent from './formToggle.component';
import formToggle from './formToggle.directive'

let formToggleModule = angular
    .module('formToggleM', [])
    //.component('formToggleC', formToggleComponent)
    .directive({
      formToggle
    });

export default formToggleModule;

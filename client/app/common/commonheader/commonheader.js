import angular from 'angular';
import uiRouter from 'angular-ui-router';
import commonheaderComponent from './commonheader.component';

let commonheaderModule = angular.module('commonheader', [
  uiRouter
])

.component('commonheader', commonheaderComponent);

export default commonheaderModule;

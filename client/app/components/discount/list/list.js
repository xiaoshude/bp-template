import angular from 'angular';
import uiRouter from 'angular-ui-router';
import listComponent from './list.component';

let listModule = angular.module('list', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
      .state('list', {
        url: '/discount/list',
        template: '<list ></list>'
      });
})

.component('list', listComponent);

export default listModule;

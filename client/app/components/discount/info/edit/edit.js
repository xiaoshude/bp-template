import angular from 'angular';
import uiRouter from 'angular-ui-router';
import editComponent from './edit.component.js';

let editModule = angular.module('edit', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
      .state('discount.edit', {
        url: '/discount/edit/:id',
        template: '<edit></edit>'
      });
})

.component('edit', editComponent);

export default editModule;

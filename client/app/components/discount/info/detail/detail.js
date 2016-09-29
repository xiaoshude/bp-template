import angular from 'angular';
import uiRouter from 'angular-ui-router';
import detailComponent from './detail.component.js';

let detailModule = angular.module('detail', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
      .state('discount.detail', {
        url: '/discount/detail/:id',
        template: '<detail ></detail>'
      });
})

.component('detail', detailComponent);

export default detailModule;

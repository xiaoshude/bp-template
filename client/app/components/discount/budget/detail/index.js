import angular from 'angular';
import uiRouter from 'angular-ui-router';
import detailbudgetComponent from './component.js';

let detailbudgetModule = angular.module('detailbudget', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
      .state('discount.detailbudget', {
        url: '/discount/detailbudget/:id',
        template: '<detailbudget ></detailbudget>'
      });
})

.component('detailbudget', detailbudgetComponent);

export default detailbudgetModule;

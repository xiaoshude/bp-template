import angular from 'angular';
import uiRouter from 'angular-ui-router';
import editbudgetComponent from './component.js';

let editbudgetModule = angular.module('editbudget', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
      .state('discount.editbudget', {
        url: '/discount/editbudget/:id',
        template: '<editbudget ></editbudget>'
      });
})

.component('editbudget', editbudgetComponent);

export default editbudgetModule;

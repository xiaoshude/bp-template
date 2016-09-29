import angular from 'angular';
import uiRouter from 'angular-ui-router';
import detailruleComponent from './detailrule.component.js';

let detailruleModule = angular.module('detailrule', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
      .state('discount.detailrule', {
        url: '/discount/detailrule/:id',
        template: '<detailrule ></detailrule>'
      });
})

.component('detailrule', detailruleComponent);

export default detailruleModule;

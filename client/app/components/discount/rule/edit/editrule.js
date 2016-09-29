import angular from 'angular';
import uiRouter from 'angular-ui-router';
import editruleComponent from './editrule.component.js';

let editruleModule = angular.module('editrule', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
      .state('discount.editrule', {
        url: '/discount/editrule/:id',
        template: '<editrule></editrule>'
      });
})

.component('editrule', editruleComponent);

export default editruleModule;

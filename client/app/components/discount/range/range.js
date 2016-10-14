import uiRouter from 'angular-ui-router';
import editRangeComponent from './edit/range.component.js';
import detailRangeComponent from './detail/range.component.js';

let rangeModule = angular.module('range', [
  uiRouter
])
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('discount.editrange', {
        url: '/discount/editrange/:id',
        template: '<editrange></editrange>'
      })
      .state('discount.detailrange', {
        url: '/discount/detailrange/:id',
        template: '<detailrange></detailrange>'
      });
  })
  .filter('importStatusTrs', function () {
    return function (input) {
      let output = '导入开始';
      switch (input) {
        case 1:
          output = '正在导入';
          break;
        case 2:
          output = '导入完成'
      }
      return output;
    }
  })

  .component('editrange', editRangeComponent)
  .component('detailrange', detailRangeComponent);

export default rangeModule;

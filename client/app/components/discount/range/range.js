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

    .component('editrange', editRangeComponent)
    .component('detailrange', detailRangeComponent);

export default rangeModule;

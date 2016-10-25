import angular from 'angular';
import Discount from './discount/discount';
import 'angular-notify';
import requestHandleFunc from './request.js'
import responseHandleFunc from './response.js'
import 'ng-file-upload'

let componentModule = angular.module('app.components', [
  Discount.name,
  'cgNotify',
  'ngFileUpload'
])
    .config(function ($httpProvider) {
        "ngInject";
        $httpProvider.interceptors.push('urlInterceptor');
    })
    //拦截http,对特定请求进行数据转换
    .factory('urlInterceptor', function ($rootScope, $q, $location) {
        "ngInject";
        return {
            request: requestHandleFunc,
            response: responseHandleFunc
        };
    })
    .run(function (notify) {
        "ngInject";
        notify.config({
            startTop: 100,
            duration: 6000
        });
    });

export default componentModule;

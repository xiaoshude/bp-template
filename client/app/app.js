/**
 * bp admin entry
 * @author name emailAddress
 */

'use strict';

import 'normalize.css';

import angular from 'angular';
import 'bootstrap';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'angular-notify';
import 'restangular';
import 'bp-admin-skin'
import 'ffan-ng-table'
import 'bp-utils'

import 'angular-loading-bar'
import './lib/loading-bar.min.css'

import 'textangular'
import 'textAngular/dist/textAngular-sanitize'
import 'textAngular/dist/textAngular.css'

import './lib/css/font-awesome.css'

import 'angular-ui-bootstrap';
import './lib/angular-locale_zh-cn.js'
import 'ng-file-upload'

import 'ui-select'
import 'ui-select/dist/select.min.css'

import requestHandleFunc from './request.js'
import responseHandleFunc from './response.js'

angular.module('app', [
  uiRouter,
  Common.name,
  Components.name,
  'ui.bootstrap',
  'cgNotify',
  'restangular',
  'angular-loading-bar',
  'ngTable',
  'bp.utils',
  'ngSanitize',
  'textAngular',
  'ui.select',
  'ngFileUpload'
])
.config(function(RestangularProvider) {
  'ngInject'
  // add a response interceptor
  RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
    let extractedData;
    // .. to look for getList operations
    if (operation === "getList") {
      console.log(data);
      // .. and handle the data and meta data
      extractedData = data.data;
    } else {
      extractedData = data;
    }
    return extractedData;
  });

}).config(function ($httpProvider) {
    "ngInject";
    $httpProvider.interceptors.push('urlInterceptor');
  })
  .factory('urlInterceptor', function () {
    return {
      'request': requestHandleFunc,
      'response': responseHandleFunc,
      'responseError': responseHandleFunc
    };
  })
  .constant('$menuConstant', {
    DEBUG: process.env.DEBUG
  })
  .component('app', AppComponent)
  .run(function (notify) {
    "ngInject";
    notify.config({
      startTop: 50,
      duration: 2000
    });
  });

console.log('process.env.DEBUG', process.env.DEBUG);

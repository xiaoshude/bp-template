import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMessages from 'angular-messages';
import ffanNgtable from 'ffan-ng-table';
import uiSelect from 'ui-select';
import moment from 'moment';
import 'angular-bootstrap-datetimepicker';
moment.locale('zh-cn');
moment.locale('zh-cn', {
  meridiem: function (hour, minute, isLowercase) {
    return '';
  }, longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "MM/DD/YYYY",
    LL: "MMMM Do YYYY",
    LLL: "MMMM Do YYYY LT",
    LLLL: "dddd, MMMM Do YYYY LT"
  }
});
import discountComponent from './discount.component';

import add from './info/add/add';
import detail from './info/detail/detail';
import detailbudget from './budget/detail/index';
import detailrule from './rule/detail/detailrule';
import editbudget from './budget/edit/index';
import editrule from './rule/edit/editrule';
import list from './list/list';
import edit from './info/edit/edit';
import 'ffan-bp-menu';
import range from './range/range.js'

//import toggleComponent from './toggle.component';

let discountModule = angular.module('discount', [
  uiRouter,
  ngMessages,
  ffanNgtable.name,
  uiSelect,
  'ui.bootstrap.datetimepicker',
  'ng.ueditor',
  add.name,
  edit.name,
  detail.name,
  detailbudget.name,
  detailrule.name,
  editbudget.name,
  editrule.name,
  list.name,
  range.name
])

  .constant('$menuConstant', {
    DEBUG: process.env.DEBUG
  })
  .constant('$env', {
    DEBUG: process.env.DEBUG
  })

//.component('toggle',toggleComponent)
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('discount', {
        template: '<discount></discount>'
      });
  })

//简单封装之...todo
  .factory('Api', function ($http, $q, $httpParamSerializerJQLike, notify) {
    "ngInject";
    var api = {};

    var basePath = function () {
      return '/kickoff/';
    }

    api.get = function (url, params) {
      var deferred = $q.defer();
      $http({
        url: basePath() + url,
        method: 'get',
        params: params || {}
      }).then(function (baseResult) {
        var result = baseResult.data;
        if (result.status === 200) {
          console.log('请求正常返回~');
          deferred.resolve(result.data);
        } else {
          //todo...这里也是简单处理之 直接把异常信息和状态 返回给业务
          //是否需要弹出没有登录、没有权限相关信息？统一处理？
          console.log('非200状态~');
          var resultMsg = result && result.msg;
          if (typeof (resultMsg) == 'string') {
            notify({
              message: resultMsg.replace(/&amp;/g, '&'),
              classes: 'alert alert-danger'
            });
          }

          //alert("状态码:"+result.status+"错误信息:"+result.msg);
          deferred.reject("状态码:" + result.status + "错误信息:" + result.msg);
        }
      }, function (baseResult) {
        var httpError = "httpError~";
        console && console.log(httpError);
        deferred.reject(httpError + ":" + baseResult.status + "," + baseResult.statusText);
      })

      return deferred.promise;

    };

    api.post = function (url, params) {

      var deferred = $q.defer();

      $http({
        url: basePath() + url,
        data: $httpParamSerializerJQLike(params),
        method: "post",
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      }).then(function (baseResult) {
        var result = baseResult.data;
        if (result.status === 200) {
          console.log('请求正常返回~');
          deferred.resolve(result.data);
        } else {
          console.log('非200状态~', result.status + "错误信息:" + result.msg);
          var resultMsg = result && result.msg;
          if (typeof (resultMsg) == 'string') {
            notify({
              message: resultMsg.replace(/&amp;/g, '&'),
              classes: 'alert alert-danger'
            });
          }
          //alert("状态码:"+result.status+"错误信息:"+result.msg);
          deferred.reject("状态码:" + result.status + "错误信息:" + result.msg);
        }
      }, function (baseResult) {
        var httpError = "httpError~";
        console && console.log(httpError);
        deferred.reject(httpError + ":" + baseResult.status + "," + baseResult.statusText);
      });

      return deferred.promise;

    };

    return api;

  })
  //0: 已保存, 1: 待审核, 2:已撤销, 3:已驳回, 4:审核通过, 5:上线, 6:已下线, 7:已结束
  .filter('activityStatus', function ($filter) {
    "ngInject";
    return function (input, status) {
      switch (input) {
        case 0:
          return '已保存';
          break;
        case 1:
          return '待审核';
          break;
        case 2:
          return '已撤销';
        case 3:
          return '已驳回';
        case 4:
          return '已上线';
        case 5:
          return '已下线';
        case 6:
          return '已结束';
        default:
          break;
      }
    }
  })

  .filter('killAmp', function ($filter) {
    "ngInject";
    return function (input) {
      //  console.log(input);
      //   console.log(input.replace(/&amp;/g, '&'));
      if (input) {
        return input.replace(/&amp;/g, '&');
      }
      return input;
      //return input.replace(/&amp;/g, '&');
    }
  })

  .component('discount', discountComponent);

export default discountModule;

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
    .directive('bpLargeThan', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var theOther = scope.$eval(attrs.bpLargeThan);
                var theForm = scope.$eval(attrs.bpLargeThanForm);
                console.warn('theOther!!!!!!', theForm);
                if (!theOther || !theForm) {
                    return;
                }
                var isLargeThan = function (value) {
                    switch (theOther.type) {
                        case 'date':
                            return theForm[theOther.which] ? moment(theForm[theOther.which]).format('X') < moment(value).format('X') : true;
                            break;
                        default:
                            return theForm[theOther.which] < value;
                    }
                };
                ngModel.$parsers.push(function (value) {
                    ngModel.$setValidity('large', isLargeThan(value));
                    return isLargeThan(value) ? value : undefined;
                });
                scope.$watch(
                    function () {
                        return theForm[theOther.which];
                    },
                    function () {
                        ngModel.$setValidity('large', isLargeThan(ngModel.$modelValue));
                    }
                );
            }
        };
    })
    .constant('Errors', {
        email: '不是有效格式的邮件地址',
        url: '不是有效格式的url',
        required: '此项不能为空',
        same: '此项必须与密码相同',
        max: '超过上限',
        min: '低于下限',
        number: '必须为数字',
        parse: '根据验证规则，已重置无效值'
    })
    .directive('bpFieldError', function ($compile) {
        "ngInject";
        /*eg：
        bp-field-error='{"max":"最大值为9","min":"最小值的1"}'
        必须是这种格式的parse时才不会报错
        bp-field-error-selector="#ddIdToUidError"*/
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var subScope = scope.$new(true);
                subScope.hasError = function () {
                    return ngModel.$invalid && ngModel.$dirty;
                };
                subScope.errors = function () {
                    return ngModel.$error;
                };
                console.warn('attrs.bpFieldError', attrs.bpFieldError);
                subScope.customMessages = attrs.bpFieldError;
                var customSelector = attrs.bpFieldErrorSelector;
                var hint = $compile('<ul class="bp-field-error" ng-if="hasError()"><li ng-repeat="(name, wrong) in errors()" ng-if="wrong">{{name|error:customMessages}}</li></ul>')(subScope);
                if (customSelector) {
                    console.warn(customSelector);
                    console.warn($(customSelector));
                    $(customSelector).html(hint);
                } else {
                    element.after(hint);
                }
            }
        };
    })
    .filter('error', function (Errors) {
        "ngInject";
        return function (name, customMessages) {
            if (customMessages) {
                customMessages = JSON.parse(customMessages);
            }
            var errors = angular.extend({}, Errors, customMessages);
            console.info('extended errors', errors);
            return errors[name] || name;
        };
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

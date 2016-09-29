/**
 * Created by fjywan on 16/5/19.
 */
import moment from 'moment';

let requestHandleFunc = function (request) {
    if (/\/activity\/addrule/.test(request.url)) {
        console.log('urlInterceptor request', request);
        console.log('urlInterceptor request params', request.transformRequest[0])

    }
    return request;
};

let ruleDataProcess = function (vm, params) {
    params.greaterThan = Math.round((params.greaterThan)*100);
    params.minus       = Math.round((params.minus)*100);
    params.minValue       = Math.round((params.minValue)*100);
    params.isCheckFirstBind       = params.isCheckFirstBind ? 1 : 0;
    params.isSingleUserDailyLimit       = params.isSingleUserDailyLimit ? 1 : 0;
    params.isSingleUserTotalLimit       = params.isSingleUserTotalLimit ? 1 : 0;
    params.isGreaterThanLimit       = params.isGreaterThanLimit ? 1 : 0;
    params.isSectionLimit       = params.isSectionLimit ? 1 : 0;
    angular.forEach(params.sectionLimitations, function(item){
        console.log('probability', item.probability);
        item.maxValue = Math.round(item.maxValue * 100);
        item.minValue = Math.round(item.minValue * 100);
        item.probability = Math.round(item.probability* 100);
    });
    angular.forEach(params.deductRanges, function(item){
    item.greaterThan = Math.round(item.greaterThan * 100);
    item.minus = Math.round(item.minus * 100);
    });
    console.log("规则参数", params);

    return params;
};

let budgetSectionProcess = function (params) {
    params.startAt = moment(params.startAt).format('X');
    params.endAt = moment(params.endAt).format('X');
    params.value =  params.value * 100;
};
export {ruleDataProcess, budgetSectionProcess}
export default requestHandleFunc;

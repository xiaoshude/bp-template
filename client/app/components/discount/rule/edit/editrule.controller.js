import {ruleDataProcess} from '../../../request.js'

class EditruleController {
  constructor($scope, $state, $location, Api, notify) {
    'ngInject';
    this.notify = notify;

    let activityId = $state.params.id;

    //修改的信息
    let info = {
      activityId: $state.params.id,
      greaterThan: '',
      minus: ''
    };
    this.info = angular.copy(info);

    //获取活动详情
    Api.get('activity/info', {activityId}).then(data => {
      this.activityInfo = data;
      var status = data && data.status;
      //状态
      $scope.selectIsDisable = true;
      $scope.editRuleIsDisable = false;
      $scope.targetUserIsDisable = true;
      $scope.lastPartIsDisable = false;
      if(status == 0 || status == 2 || status == 3){
        $scope.selectIsDisable = false;
        $scope.targetUserIsDisable = false
      }
      if (status == 6) {
        $scope.editRuleIsDisable = true;
      }
      if (status == 1 || status == 6) {
        $scope.lastPartIsDisable = true;
      }
    });

    //获取规则
    Api.get('activity/rule', {activityId}).then(data => {
      this.info = data;
      if (!this.info.deductRanges.length) {
        this.info.deductRanges = [{}]
      }
    });

    //获取支付方式
    /*Api.get('activity/payChnTypeList').then(data => {
      this.info = data;
      if (!this.info.deductRanges.length) {
        this.info.deductRanges = [{}]
      }
    });*/

    //更新规则
    this.updateRole = function () {
      var params = angular.copy(this.info);
      console.log('params', params);

      params.activityId = params.id;

      if (parseFloat(this.info.greaterThan) < 0
        || parseFloat(this.info.minus) < 0) {
        notify({
          message: '金额必须大于0',
          classes: 'alert alert-danger'
        });
        return;
      }

      if (parseFloat(this.info.greaterThan) > 10000
        || parseFloat(this.info.minus) > 10000) {
        notify({
          message: '金额不能大于10000',
          classes: 'alert alert-danger'
        });
        return;
      }

      if (this.info.isSingleUserDailyLimit && this.info.isSingleUserTotalLimit && this.info.singleUserDailyLimitation > this.info.singleUserTotalLimitation) {
        notify({
          message: '每日限量不能大于活动期限量',
          classes: 'alert alert-danger'
        });
        return false;
      }
      params = ruleDataProcess(this, params);
      Api.post('activity/addrule', params).then(function (data) {
        $location.url('discount/editbudget/' + $state.params.id);
      })
    };
  }

}

export default EditruleController;

import AddPlazaController from './../addPlaza.controller.js';
import UpdatemsgController from './../updatemsg.controller.js';
import addPlazaHtml from './../addPlaza.html';
import updateMsg from './../updatemsg.html';
import moment from 'moment';
import _ from 'lodash';
import editBudgetSection from './../modal/editbudgetsection.html'
import editBudgetSectionCtrl from './../modal/editbudgetsection.controller.js'
import importBudgetSection from './../modal/importbudgetsection.html'
import importBudgetSectionCtrl from './../modal/importbudgetsection.controller.js'
class EditbudgetController {
  constructor($scope, $state, $uibModal, $location, NgTableParams, Api) {
    "ngInject";
    this.Api = Api;
    this.$uibModal = $uibModal;
    this.activityId = $state.params.id;

    let activityId = this.activityId;

    this.currBudgetDay = moment(new Date()).format("YYYY-MM-DD");

    this.rule = {};
    $scope.distributions = [];
    $scope.minus = '';
    $scope.isLimit = 0;

    //活动额总值
    $scope.totalAmount = '';

    //筛选项 name
    $scope.filters = {
      plazaName: ''
    };

    //根据活动ID获取预算设置
    Api.get('budget/info', {activityId}).then((data)=> {
      if (!data) {
        return;
      }
      $scope.totalAmount = data.total ? data.total / 100 : '';
      this.rule.type = data && data.type;
      this.rule.used = data && data.used;

      if (data && data.type == 0) {
        this.rule.dailyLimitationTimes = data && data.dailyLimitation / 100;
        this.rule.dailyLimitationAmount = 0;
      }

      if (data && data.type == 1) {
        this.rule.dailyLimitationAmount = data && data.dailyLimitation / 100;
        this.rule.dailyLimitationTimes = 0;
      }

      this.getActivityPlazalist();

    });

    //根据活动ID获取预算分段限制列表
    Api.get('budgetSection/getlist', {activityId}).then((data)=> {
      this.bands = data;
      if (!this.bands.length) {
        this.rule.type = '1'
      }
      let bandsKeys = [];
      if (this.bands && angular.isObject(this.bands)) {
        for (let k in this.bands) {
          bandsKeys.push(k);
        }
      }
      if (!bandsKeys.includes(this.currBudgetDay) && bandsKeys.length) {
        this.currBudgetDay = bandsKeys[0];
      }
    });

    //获取受限制的广场列表 取出该活动下全部广场 前端分页
    this.getActivityPlazalist = () => {
      Api.get('budget/activityplazalist', {activityId, limit: 9999999}).then((data)=> {
        $scope.choosedPlazas = data;
        $scope.tableParams = new NgTableParams({
          page: 1, // show first page
          count: 10,
          filter: $scope.filters
        }, {
          counts: [],
          filterDelay: 0,
          dataset: this.formatActivityData(data && data.data)
        });
      })
    }

    //过滤广场数据
    this.formatActivityData = activityData => {
      var result = [];
      angular.forEach(activityData, item => {
        item.dailyLimitation = (item.dailyLimitation) / 100;
        item.totalLimitation = (item.totalLimitation) / 100;
        result.push(item);
      });

      return result;
    };

    //是否限制时间段
    Api.get('budget/activityprogress', {activityId}).then(data => {
      if (data && data.length != 0) {
        $scope.isLimit = 1;
        $scope.distributions = $scope.vm.setDistributions(data);
      }
    });

    //处理返回限制时间段数据
    this.setDistributions = data => {
      var distributions = [];

      angular.forEach(data, item => {
        var startAt = new Date('2000-01-01 00:00'),
          endAt = new Date('2000-01-01 00:00');
        startAt.setSeconds(item.startAt);
        endAt.setSeconds(item.endAt)
        item.beginTime = startAt;
        item.endTime = endAt;
        distributions.push(item);
      });

      return distributions;
    }

    //增加广场 弹窗
    this.addPlaza = () => {
      var addPlaza = $uibModal.open({
        animation: true,
        template: addPlazaHtml,
        controller: AddPlazaController,
        resolve: {
          activityId: () => {
            return $state.params.id
          }
        }
      });
      addPlaza.result.then(data => {
        $scope.vm.getActivityPlazalist();
      })
    };


    //广场每天和总的改变
    $scope.changeDailyLimitation = (type, item) => {
      item.totalLimitation = parseInt(item.totalLimitation);
      item.dailyLimitation = parseInt(item.dailyLimitation);
      if (type == 0) {
        if (!/^[0-9]\d*$/.test(item.dailyLimitation)) {
          alert('广场每日次数只能为正整数或0');
          return;
        }

        if (item.dailyLimitation > item.totalLimitation) {
          alert('广场每日次数不能大于广场总限制次数');
          return;
        }
      }

      if (type == 1) {
        if (item.totalLimitation > $scope.totalAmount) {
          alert('广场活动总预算不能为大于活动期金额');
          return;
        }

        if (!/^[0-9]\d*$/.test(item.dailyLimitation)) {
          alert('广场每天预算只能为正整数或0');
          return;
        }

        if (item.dailyLimitation > item.totalLimitation) {
          alert('广场每天预算不能大于广场活动期预算');
          return;
        }
      }

      var params = {
        activityId,
        budgets: angular.toJson([{
          id: item.id,
          dailyLimitation: (item.dailyLimitation) * 100,
          totalLimitation: (item.totalLimitation) * 100
        }])
      };

      Api.post('budget/batchupdateplazabudget', params).then(data => {
        $uibModal.open({
          animation: true,
          template: updateMsg,
          controller: UpdatemsgController
        });

      })
    };

    $scope.$watch(() => {
      return $scope.tableParams && $scope.tableParams.data;
    }, (newVal, oldVal) => {
      if (newVal) {
        $scope.selectedPlazaIDs = [];
        angular.forEach($scope.tableParams.data, (item, index) => {
          if (item.plazaSelected) {
            $scope.selectedPlazaIDs.push(item.id);
          }
        })
      }
    }, true);


    $scope.$watch(() => {
      return $scope.totalAmount;
    }, (newVal, oldVal) => {
      this.rule.total = newVal * 100;
    });

    //watch rule type
    $scope.$watch(() => {
      return this.rule.type;
    }, (newVal, oldVal) => {
      if (newVal == 1) {
        this.rule.dailyLimitationTimes = '';
      }

      if (newVal == 0) {
        this.rule.dailyLimitationAmount = '';
      }
    });


    //设置列每列的值
    this.setColumnVal = column => {
      if ($scope.tableParams) {
        var columnVal = $scope.tableParams.data && $scope.tableParams.data[0] && $scope.tableParams.data[0][column];

        var flag = 0;
        for (var i = 0; i < $scope.tableParams.data.length; i++) {
          if ($scope.tableParams.data[i]['dailyLimitation'] > $scope.tableParams.data[i]['totalLimitation'] && parseInt($scope.tableParams.data[i]['totalLimitation']) != 0) {
            flag = 1;
            break;
          }
        }
        if (flag == 1) {
          alert('当前列中有广场单日限制大于广场总限制');
          return;
        }

        var plazas = [];
        angular.forEach($scope.tableParams.data, item => {
          item[column] = columnVal;
          plazas.push({
            id: item.id,
            dailyLimitation: item.dailyLimitation * 100,
            totalLimitation: item.totalLimitation * 100
          });
        });

        var params = {
          activityId,
          budgets: angular.toJson(plazas)
        };

        Api.post('budget/batchupdateplazabudget', params).then(data => {
          $uibModal.open({
            animation: true,
            template: updateMsg,
            controller: UpdatemsgController
          });
        })
      }
    }

    //copy每天次数 / 元
    this.dailyLimitation = () => {
      this.setColumnVal('dailyLimitation');
    };

    //copy活动期间总数 / 总钱
    this.totalLimitation = () => {
      this.setColumnVal('totalLimitation');
    };

    //删除一个广场
    this.delPlaza = (item) => {
      var params = {
        activityId,
        ids: angular.toJson([item.id])
      };

      Api.post('budget/batchdeleteactivityplaza', params).then((data) => {
        $scope.vm.getActivityPlazalist();
      })
    };

    //批量删除
    this.delBatch = () => {
      var params = {};
      var plazaIDs = [];
      angular.forEach($scope.tableParams.data, (item, index) => {
        if (item.plazaSelected) {
          plazaIDs.push(item.id);
        }
      })
      params = {
        activityId,
        ids: angular.toJson(plazaIDs)
      };

      Api.post('budget/batchdeleteactivityplaza', params).then((data) => {
        $scope.vm.getActivityPlazalist();
      })
    };

    //全选
    this.selectAll = () => {
      $scope.selectedAll = !$scope.selectedAll;
      angular.forEach($scope.tableParams.data, (item, index) => {
        item.plazaSelected = $scope.selectedAll;
      });
    };

    //单纯的增加按钮
    this.addProgressRestrict = () => {
      var restrict = {
        activityId,
        beginTime: '',
        endTime: '',
        amount: 0
      };
      $scope.distributions.push(restrict);
    };

    //删除一个时间限制
    this.delRestrict = (index, item) => {
      $scope.distributions.splice(index, 1);
    };

    //watch限制时间
    $scope.$watch(() => {
      return $scope.distributions;
    }, (newVal, oldVal) => {
      $scope.paramsDistributions = [];
      angular.forEach(newVal, (item, index) => {

        $scope.paramsDistributions.push(
          {
            startAt: (moment(item.beginTime).hour() * 3600) + (moment(item.beginTime).minute() * 60),
            endAt: (moment(item.endTime).hour() * 3600) + (moment(item.endTime).minute() * 60),
            amount: item.amount
          }
        );

      })
    }, true);

    //保存预算
    this.saveBudget = () => {

      //活动天预算不能大于剩余预算
      if (parseInt(this.rule.dailyLimitationAmount) > parseInt(this.oaInfo.residualBudget / 100)) {
        alert("活动天预算不能大于剩余预算");
        return;
      }

      //总额的验证
      if (!$scope.totalAmount || $scope.totalAmount == '') {
        alert('活动预算总额不能为空或者为0');
        return;
      }
      //正整数的验证
      if ($scope.totalAmount.toString().charAt(0) == "0" || !/^[1-9]\d*$/.test($scope.totalAmount)) {
        alert('活动预算总额只能为正整数');
        return;
      }


      //比率只能输入正整数
      //比率相加只能为100才能提交
      if ($scope.isLimit == 1) {
        var allAmount = [];
        var errorFalg = false;
        if ($scope.paramsDistributions && $scope.paramsDistributions.length == 0) {
          alert('请至少选择一个时间段');
          return;
        }
        for (var i = 0; i < $scope.paramsDistributions.length; i++) {
          //比率的正则
          var amount = $scope.paramsDistributions[i]['amount'];
          if (!amount || parseInt(amount) == 0 || amount == '') {
            errorFalg = true;
            alert('百分比不能为空或者为0');
            break;
          } else if (amount.toString().charAt(0) == "0" || !/^[1-9]\d*$/.test(amount)) {
            errorFalg = true;
            alert('百分比不合法');
            break;
          } else if (parseInt(amount) > 100) {
            errorFalg = true;
            alert('百分比不能大于100');
            break;
          } else {
            allAmount.push(amount);
          }
        }

        if (errorFalg) {
          return;
        }

        if (allAmount.length > 0) {
          var amountSum = allAmount.reduce((partial, value) => {
            return parseInt(partial) + parseInt(value);
          })
          if (amountSum != 100) {
            alert('百分比总和不等于100');
            return;
          }
        }

        //时间覆盖率的不能重复的验证
        var left = 0;
        var repeatFlag = false;
        var tmpDistributions = _.sortBy($scope.paramsDistributions, 'startAt');
        for (var i = 0; i < tmpDistributions.length; i++) {

          if (parseInt(tmpDistributions[i]['startAt']) == 0 || parseInt(tmpDistributions[i]['endAt']) == 0) {
            alert('开始或者结束时间不能为0');
            repeatFlag = true;
            break;
          }

          if (parseInt(tmpDistributions[i]['startAt']) >= parseInt(tmpDistributions[i]['endAt'])) {
            alert('开始时间不能大于或者等于结束时间');
            repeatFlag = true;
            break;
          }

          if (parseInt(tmpDistributions[i]['startAt']) > left && parseInt(tmpDistributions[i]['endAt']) > parseInt(tmpDistributions[i]['startAt'])) {
            left = tmpDistributions[i]['endAt'];
          } else {
            alert('结束时间不能大于开始时间且时间段不能重叠');
            repeatFlag = true;
            break;
          }
        }

        if (repeatFlag) {
          return;
        }

        if (left >= 86400) {
          alert("活动时间不能超过一天");
          return;
        }

      }

      //处理数据准备提交
      var dailyLimitation = 0,
        totalLimitation = 0;

      if (this.rule.type == 0) {
        dailyLimitation = this.rule.dailyLimitationTimes ? this.rule.dailyLimitationTimes : 0;
      }
      if (this.rule.type == 1) {
        dailyLimitation = this.rule.dailyLimitationAmount ? this.rule.dailyLimitationAmount : 0;
      }
      var params = {
        activityId,
        type: this.rule.type,
        dailyLimitation: dailyLimitation * 100,
        total: $scope.totalAmount * 100,
        distributions: $scope.isLimit == 0 ? angular.toJson([]) : angular.toJson($scope.paramsDistributions)
      };

      let budgetPromise = Api.post('budget/update', params);

      let budgetalertParam = angular.copy(this.budgetalert);
      budgetalertParam.alertRatio = budgetalertParam.alertRatio * 100;
      budgetalertParam.minus = budgetalertParam.minus * 100;
      let alertPromise = Api.post('budgetAlert/update', budgetalertParam);

      Promise.all([budgetPromise, alertPromise]).then(() => {
        alert('保存成功');
        $location.url('discount/list');
      });
    };

    this.loading = true;

    this.tableParams = new NgTableParams({
      count: 10  //每页几条
    }, {
      counts: [],
      getData: (params) => {
        this.loading = true;
        return Api.get('activity/getlog', {
          activityId,
          offset: (params.url().page - 1) * 10
        }).then(response => {
          params.total(response.totalCount); //帮你分几页
          this.loading = false;
          return response && response.data;
        });
      }
    });

    this.tableParamsOfBudgetLoading = true;
    this.tableParamsOfBudget = new NgTableParams({
      count: 1000  //每页几条
    }, {
      counts: [],
      getData: (params) => {
        this.loading = true;
        return Api.get('budgetSection/report', {
          activityId,
          offset: (params.url().page - 1) * 10
        }).then(response => {
          params.total(response.length); //帮你分几页
          this.tableParamsOfBudget = false;
          return response;
        });
      }
    });

    //预算广场列表

    this.delBudgetSection = (id) => {
      Api.post('budgetSection/del', {activityId, id: id}).then((result) => {
        Api.get('budgetSection/getlist', {activityId}).then((data)=> {
          this.bands = data;
        });
      });
    };
    this.now = Date.now();
  }

  callBudgetSectionModal(size, action, type, band, index, isAllEditable) {
    let activityId = this.activityId;

    let modalInstance = this.$uibModal.open({
      animation: true,
      template: editBudgetSection,
      controller: editBudgetSectionCtrl,
      controllerAs: 'vm',
      size: size,
      resolve: {
        bandData: () => {
          let bandData = {};
          bandData.action = action;
          bandData.type = type;
          bandData.oaInfo = this.oaInfo;
          if (action == 'add') {
            bandData.title = '新增预算分段控制';
            bandData.bands = this.bands;
          } else {
            bandData.title = '编辑预算分段控制';
            bandData.band = band;
            bandData.index = index;
          }
          return bandData;
        },
        isAllEditable: () =>  isAllEditable
      }
    });

    modalInstance.result.then((data) => {
      this.Api.get('budgetSection/getlist', {activityId}).then((data)=> {
        this.bands = data;
      });
      /*if (data && band) {
        band = data;
      }
      if (data.index == 0 || data.index) {
        console.log('data band', data);
        this.bands[data.index] = data.band;
      } else {
        this.bands = data.bands
      }*/

    });
  }

  callBudgetImportModal(size, action, type, band, index) {
    let activityId = this.activityId;

    let modalInstance = this.$uibModal.open({
      animation: true,
      template: importBudgetSection,
      controller: importBudgetSectionCtrl,
      controllerAs: 'vm',
      size: size,
      resolve: {
        oaInfo: () => this.oaInfo
      }
    });

    modalInstance.result.then((data) => {
      this.Api.get('budgetSection/getlist', {activityId}).then((data)=> {
        this.bands = data;
        if (!this.bands.length) {
          this.rule.type = '1'
        }
      });
    });
  }

  $onInit() {
    let activityId = this.activityId;

    //根据活动ID获取OA信息
    this.Api.get('activity/info', {activityId}).then(data => {
      this.oaInfo = data;
    });

    //拉起预算预警
    this.Api.get('budgetAlert/info', {activityId}).then(r => {
      this.budgetalert = r;
      this.budgetalert.alertRatio = this.budgetalert.alertRatio / 100
      this.budgetalert.minus = this.budgetalert.minus / 100
    });
  }
}

export default EditbudgetController;

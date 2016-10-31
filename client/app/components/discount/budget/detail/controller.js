import moment from 'moment';
class DetailbudgetController {
 constructor($scope,$state,$uibModal,NgTableParams,Api) {
    "ngInject";
   this.activityId = $state.params.id;
   this.currBudgetDay = moment(new Date()).format("YYYY-MM-DD");
   this.Api = Api;

    $scope.activityId    = '';
    $scope.oaInfo        = {};
    $scope.rule          = {};
    $scope.distributions = [];
    $scope.minus         = '';
    $scope.isLimit       = 0;


    //活动额总值
    $scope.totalAmount = '';

    //当前活动ID
    $scope.activityId = $state.params.id;

    //筛选项 name
    $scope.filters = {
      plazaName:''
    };

    //根据活动ID获取OA信息
    Api.get('activity/info',{activityId:$state.params.id}).then(function(data){
      $scope.oaInfo = data;
    })

    //根据ID获取活动规则  主要是想获取满减的值
    /*
    Api.get('activity/rule',{id:$state.params.id}).then(function(data){
      $scope.minus = data && data.minus;
  })*/


     //根据活动ID获取预算分段限制列表
     Api.get('budgetSection/getlist',{activityId:$state.params.id}).then((data)=>{
         $scope.bands = data;
       if (!$scope.bands.length) {
         $scope.rule.type = '1'
       }
       let bandsKeys = [];
       if ($scope.bands && angular.isObject($scope.bands)) {
         for (let k in $scope.bands) {
           bandsKeys.push(k);
         }
       }
       if (!bandsKeys.includes(this.currBudgetDay) && bandsKeys.length) {
         this.currBudgetDay = bandsKeys[0];
       }
     });

    //根据活动ID获取预算设置
    Api.get('budget/info',{activityId:$state.params.id}).then((data)=>{
      $scope.totalAmount = data.total?data.total/100:0;
      $scope.rule.type = data && data.type;
      $scope.rule.used = data && data.used;

      if(data && data.type == 0){
        $scope.rule.dailyLimitationTimes = data && data.dailyLimitation/100;
        $scope.rule.dailyLimitationAmount = 0;
      }

      if(data && data.type == 1){
        $scope.rule.dailyLimitationAmount = data && data.dailyLimitation/100;
        $scope.rule.dailyLimitationTimes = 0;
      }

      console.log('scoperule',$scope.rule);
      this.getActivityPlazalist();

    })

    //获取受限制的广场列表 取出该活动下全部广场 前端分页
    this.getActivityPlazalist = function(){
      Api.get('budget/activityplazalist',{activityId:$state.params.id,limit:9999999}).then((data)=>{
        $scope.tableParams = new NgTableParams({
              page: 1, // show first page
              count: 10,
              filter:$scope.filters
            }, {
              counts:[],
              filterDelay: 0,
              dataset: this.formatActivityData(data && data.data)
      });
      })
    }

    $scope.$watch(function(){
      return $scope.totalAmount;
    },function(newVal,oldVal){
      $scope.rule.total = newVal*100;
    })

    //过滤广场数据
    this.formatActivityData = function(activityData){
      var result = [];
      angular.forEach(activityData,function(item,index){
        item.dailyLimitation = (item.dailyLimitation) / 100;
        item.totalLimitation = (item.totalLimitation) / 100;
        result.push(item);
      })
      return result;
    }

    //处理返回限制时间段数据
    this.setDistributions = function(data){
      var distributions = [];

      angular.forEach(data,function(item,index){
        var startAt = new Date('2000-01-01 00:00'),
          endAt   = new Date('2000-01-01 00:00');
        startAt.setSeconds(item.startAt);
        endAt.setSeconds(item.endAt)
        item.beginTime = startAt;
        item.endTime = endAt;
        distributions.push(item);
      })
      return distributions;
    }

    //是否限制时间段
    Api.get('budget/activityprogress',{activityId:$state.params.id}).then(function(data){
      //$scope.plazas = data && data.data;
      if(data && data.length != 0){
        $scope.isLimit = 1;
        $scope.distributions = $scope.vm.setDistributions(data);
      }
    })

     this.loading = true;
     let self = this;

     this.tableParams = new NgTableParams({
         count:10  //每页几条
     }, {
         counts:[],
         getData: function(params) {
             this.loading = true;
             return Api.get('activity/getlog', {activityId:$state.params.id,
                 offset: (params.url().page - 1) * 10
             }).then(function(response){
                 console.log('getData response', response);
                 params.total(response.totalCount); //帮你分几页
                 self.loading = false;
                 return response && response.data;
             });
         }
     });
     this.tableParamsOfBudgetLoading = true;
     this.tableParamsOfBudget = new NgTableParams({
         count:1000  //每页几条
     }, {
         counts:[],
         getData: function(params) {
             this.loading = true;
             return Api.get('budgetSection/report', {activityId:$state.params.id,
                 offset: (params.url().page - 1) * 10
             }).then(function(response){
                 params.total(response.length); //帮你分几页
                 self.tableParamsOfBudget = false;
                 return response;
             });
         }
     });
     this.now = Date.now();

  }

  $onInit() {
    let activityId = this.activityId;

    //拉起预算预警
    this.Api.get('budgetAlert/info', {activityId}).then(r => {
      this.budgetalert = r;
      this.budgetalert.alertRatio = this.budgetalert.alertRatio / 100
      this.budgetalert.minus = this.budgetalert.minus / 100
    });
  }
}

export default DetailbudgetController;

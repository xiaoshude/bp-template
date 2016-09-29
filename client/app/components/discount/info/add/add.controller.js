import moment from 'moment';
class AddController {
  constructor($scope,$location,Api) {
  	'ngInject';

    var addInfo = {
      name:'',
      shortTitle:'',
      tag:'',
      type:1,
      oaNumber:'',
      budget:'',
      startAt:'',
      endAt:'',
      description:'',
      residualBudget:'',
      ruleDescription:''
    };

    //活动类型列表 factory
    var typeList = [{
      id:'1',
      name:'满减'
    }];

    //预算列表 factory
    var getBudgetList = function(){
      Api.get('budget/oaidlist').then(function(data){
        $scope.vm.budgetList = data;
        $scope.vm.budgetList.unshift({
          budget:"",
          residualBudget:'',
          beginTime:'',
          endTime:'',
          oaNumber:'请选择OA编号'
        });
        $scope.vm.currentBudget = $scope.vm.budgetList &&  $scope.vm.budgetList[0];
      })
    }

    var vm = {
      currentType:{
        id:'1',
        name:'支付优惠'
      },
      currentBudget:{
      },
      datetime:{
        begin:'',
        end:''
      },
      addInfo:angular.copy(addInfo),
      typeList:angular.copy(typeList),
      budgetList: $scope.vm.budgetList
    };

    vm.datepickerOption = {
      viewFormat: 'YYYY-MM-DD HH:mm:ss'
    };

    //watch oa预算
    $scope.$watch(function(){
      return vm.currentBudget;
    },function(newVal,oldVal){
      console.log('budget',newVal);
      $scope.vm.addInfo.oaNumber = newVal && newVal.oaNumber;
      $scope.vm.addInfo.budget = newVal && newVal.budget;
      $scope.vm.addInfo.residualBudget = newVal && newVal.residualBudget;
    });

    //watch 时间
    $scope.$watch(function(){
      return vm.datetime;
    },function(newVal,oldVal){
      console.log('时间',newVal);
      var benginTime = newVal && newVal.begin,
          endTime    = newVal && newVal.end;
      $scope.vm.addInfo.startAt = moment(benginTime).format('X');
      $scope.vm.addInfo.endAt   = moment(endTime).format('X');
    },true);

    /**
     * 时间限制规则 简单限制后续可根据产品具体需求进行限制
     */
    //开始时间限制
    vm.beforeStartTimeRender = function($view, $dates) {
      console.log('$view',$view);
      var minDate = moment().startOf($view).valueOf(); // Now
      angular.forEach($dates, function(date) {
          var localDateValue = date.localDateValue();
          date.selectable = localDateValue >= minDate //&& localDateValue <= maxDate;
      });
    };

    //结束时间限制
    vm.beforeEndTimeRender = function($view, $dates) {
      var minDate = moment().startOf($view).valueOf();
      var startTime = $scope.vm.datetime.begin;
      if(startTime){
        minDate = moment(startTime).valueOf();
      }
      angular.forEach($dates, function(date) {
          var localDateValue = date.localDateValue();
          date.selectable = localDateValue >= minDate //&& localDateValue <= maxDate;
      });
    };

    //设置开始时间
    vm.onStartTimeSet = function(newVal,oldVal){
      var endTime = $scope.vm.datetime.end;
      if(endTime && moment(newVal).valueOf() > moment(endTime).valueOf()){
        $scope.vm.addInfo.endAt = '';
      }
    }

    //设置结束时间
    vm.onEndTimeSet = function(newVal,oldVal){
      var startTime = $scope.vm.begin;
      if(startTime && moment(newVal).valueOf() < moment(startTime).valueOf()){
        $scope.vm.addInfo.startAt = '';
      }
    }

    //保存活动
    vm.addActivity = function(discountForm){

      //OA开始时间  OA结束时间
      var OABeginTime = moment($scope.vm.currentBudget.beginTime).format('X'),
          OAEndTime   = moment($scope.vm.currentBudget.endTime).format('X');

      var startDay = moment($scope.vm.addInfo.startAt * 1000).format("YYYYMMDD"),
          endDay   = moment($scope.vm.addInfo.endAt * 1000).format("YYYYMMDD");

      //开始 结束的活动时间 必须在OA的时间范围内
      //活动开始时间 小于 OA开始时间
      if($scope.vm.addInfo.startAt < OABeginTime){
        alert('活动时间超出OA预算可用时间，请修改后保存');
        return;
      }

      if($scope.vm.addInfo.endAt > OAEndTime){
        alert('活动时间超出OA预算可用时间，请修改后保存');
        return;
      }

      //开始时间不能大于结束时间
      if($scope.vm.addInfo.startAt >= $scope.vm.addInfo.endAt){
        alert('开始时间不能大于或者等于结束时间');
        return;
      }

      //开始时间和结束时间不能再同一天
      /*if(moment(startDay).isSame(endDay, 'day')){
        alert("开始时间和结束时间不能再同一天");
        return;
      } */

      Api.post('activity/add',$scope.vm.addInfo).then(function(data){
          $location.url('discount/editrange/'+data.id);
      })
    };

    getBudgetList();
    $scope.vm = vm;

  }
}

export default AddController;

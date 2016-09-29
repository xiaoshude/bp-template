import moment from 'moment';
class EditController {
  constructor($state, $scope, $location, Api) {
    'ngInject';

    this.datepickerOption = {
      viewFormat: 'YYYY-MM-DD HH:mm:ss'
    };

    $scope.activityId = $state.params.id;

    var addInfo = {
      id: $state.params.id,
      name: '',
      shortTitle: '',
      tag: '',
      type: 1,
      oaNumber: '',
      budget: '',
      startAt: '',
      endAt: '',
      description: '',
      residualBudget: '',
      ruleDescription: ''
    };

    Api.get('activity/info', {activityId: $state.params.id}).then(data => {

      //依据状态码查看是否可以编辑
      var status = data && data.status;
      //已保存 已撤销 已驳回 状态
      if (status == 0 || status == 2 || status == 3) {
        $scope.nameIsEdit = true; //活动名称
        $scope.shorTitleIsEdit = true; //短标题
        $scope.tagIsEdit = true;        //标签
        $scope.beginTimeIsEdit = true;//开始时间
        $scope.endTimeIsEdit = true;//结束时间
        $scope.descriptionIsEdit = true;//活动说明
        $scope.ruleDescriptionIsEdit = true;//活动规则
      }
      //待审核
      if (status == 1) {
        $scope.nameIsEdit = false; //活动名称
        $scope.shorTitleIsEdit = false; //短标题
        $scope.tagIsEdit = false;        //标签
        $scope.beginTimeIsEdit = false;//开始时间
        $scope.endTimeIsEdit = false;//结束时间
        $scope.descriptionIsEdit = false;//活动说明
        $scope.ruleDescriptionIsEdit = false;//活动规则
      }
      //已上线
      if (status == 4) {
        $scope.nameIsEdit = true; //活动名称
        $scope.shorTitleIsEdit = true; //短标题
        $scope.tagIsEdit = true;        //标签
        $scope.beginTimeIsEdit = false;//开始时间
        $scope.endTimeIsEdit = false;//结束时间
        $scope.descriptionIsEdit = true;//活动说明
        $scope.ruleDescriptionIsEdit = true;//活动规则
      }
      //已下线
      if (status == 5) {
        $scope.nameIsEdit = true; //活动名称
        $scope.shorTitleIsEdit = true; //短标题
        $scope.tagIsEdit = true;        //标签
        $scope.beginTimeIsEdit = false;//开始时间
        $scope.endTimeIsEdit = false;//结束时间
        $scope.descriptionIsEdit = true;//活动说明
        $scope.ruleDescriptionIsEdit = true;//活动规则
      }
      //已结束
      if (status == 6) {
        $scope.nameIsEdit = false; //活动名称
        $scope.shorTitleIsEdit = false; //短标题
        $scope.tagIsEdit = false;        //标签
        $scope.beginTimeIsEdit = false;//开始时间
        $scope.endTimeIsEdit = false;//结束时间
        $scope.descriptionIsEdit = false;//活动说明
        $scope.ruleDescriptionIsEdit = false;//活动规则
      }

      this.currentBudget = {
        oaNumber: data.oaNumber,
        budget: data.budget,
        residualBudget: data.residualBudget,
        oaBeginTime: data.oaBeginTime,
        oaEndTime: data.oaEndTime
      };
      this.addInfo.name = (data.name).replace(/&amp;/g, '&');
      this.addInfo.shortTitle = (data.shortTitle).replace(/&amp;/g, '&');
      this.addInfo.shortTitleBottom = (data.shortTitleBottom).replace(/&amp;/g, '&');
      this.addInfo.oaNumber = data.oaNumber;
      this.addInfo.budget = data.budget;
      this.addInfo.residualBudget = data.residualBudget;
      this.datetime.begin = moment(data.startAt * 1000).format("YYYY-MM-DD HH:mm:ss");
      this.datetime.end = moment(data.endAt * 1000).format("YYYY-MM-DD HH:mm:ss");
      this.addInfo.tag = (data.tag).replace(/&amp;/g, '&');
      this.addInfo.description = data.description;
      this.addInfo.ruleDescription = (data.ruleDescription).replace(/&amp;/g, '&');
    });

    //活动类型列表 factory
    var typeList = [{
      id: '1',
      name: '满减'
    }];

    //预算列表 factory
    var getBudgetList = () => {
      Api.get('budget/oaidlist').then(data => {
        this.budgetList = data;
      })
    };

    this.currentType = {
      id: '1',
      name: '支付优惠'
    };
    this.currentBudget = {};
    this.datetime = {
      begin: '',
      end: ''
    };
    this.addInfo = angular.copy(addInfo);
    this.typeList = angular.copy(typeList);

    //watch oa预算
    $scope.$watch(() => {
        return this.currentBudget;
      }, newVal => {
        this.addInfo.oaNumber = newVal && newVal.oaNumber;
        this.addInfo.budget = newVal && newVal.budget;
      }
    )
    ;

    //watch 时间
    $scope.$watch(
      () => this.datetime, newVal => {
        var benginTime = newVal && newVal.begin,
          endTime = newVal && newVal.end;
        this.addInfo.startAt = moment(benginTime).format('X');
        this.addInfo.endAt = moment(endTime).format('X');
      }, true);

    /**
     * 时间限制规则 简单限制后续可根据产品具体需求进行限制
     */
      //开始时间限制
    this.beforeStartTimeRender = ($view, $dates) => {
      var minDate = moment().startOf($view).valueOf(); // Now
      angular.forEach($dates, date => {
        var localDateValue = date.localDateValue();
        date.selectable = localDateValue >= minDate //&& localDateValue <= maxDate;
      });
    };

    //设置开始时间
    this.onStartTimeSet = newVal => {
      var endTime = this.datetime.end;
      if (endTime && moment(newVal).valueOf() > moment(endTime).valueOf()) {
        this.addInfo.endAt = '';
      }
    };

    //设置结束时间
    this.onEndTimeSet = newVal => {
      var startTime = this.begin;
      if (startTime && moment(newVal).valueOf() < moment(startTime).valueOf()) {
        this.addInfo.startAt = '';
      }
    };

    //保存活动
    this.saveActivity = () => {

      //OA开始时间  OA结束时间
      var OABeginTime = moment(this.currentBudget.oaBeginTime).format('X'),
        OAEndTime = moment(this.currentBudget.oaEndTime).format('X');

      var startDay = moment(this.addInfo.startAt * 1000).format("YYYYMMDD"),
        endDay = moment(this.addInfo.endAt * 1000).format("YYYYMMDD");

      //开始 结束的活动时间 必须在OA的时间范围内
      //活动开始时间 小于 OA开始时间
      if (this.addInfo.startAt < OABeginTime) {
        alert('活动时间超出OA预算可用时间，请修改后保存');
        return;
      }

      if (this.addInfo.endAt > OAEndTime) {
        alert('活动时间超出OA预算可用时间，请修改后保存');
        return;
      }

      //开始时间不能大于结束时间
      if (this.addInfo.startAt >= this.addInfo.endAt) {
        alert('开始时间不能大于或者等于结束时间');
        return;
      }

      this.addInfo.activityId = this.addInfo.id;
      Api.post('activity/update', this.addInfo).then(data => {
        $location.url('discount/editrange/' + data.id);
      })

    };

    getBudgetList();
  }

}

export default EditController;

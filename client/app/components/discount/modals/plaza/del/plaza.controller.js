class PlazaController {
  constructor($uibModalInstance, $http, Api, $state, plazalimitationList) {
    'ngInject'
    this.$uibModalInstance = $uibModalInstance;
    this.Api = Api;
    this.$state = $state;
    this.isDetailRange = this.$state.current.name == 'discount.detailrange' || this.$state.params.isDetailLike;
    this.btnPrimaryCon = '删除';

    this.multiSelectModel = angular.copy(plazalimitationList);
    let activityId = $state.params.id;
    this.loadPromise = $http.get('/kickoff/activity/plazalimitationList?activityId=' + activityId);
    this.config = {
      //拉取数据的url
      url: '/kickoff/activity/plazalimitationList?activityId=' + activityId,

      //标识每个选项的字段
      uniqueField: 'id',

      //生成查询表单的信息w
      queryFields: [
      ],
      //在table中展示的字段
      tableFields: [
        {
          displayName: '商圈编号',
          name: 'plazaId'
        },
        {
          displayName: '商圈名称',
          name: 'plazaName'
        },
        {
          displayName: '所属集团',
          name: 'entGroupName'
        },
        {
          displayName: '城市',
          name: 'cityName'
        }
      ],
      //ng-table的配置项
      tableConfig: {
        limit: 10, //每页多少个
        pageName: 'page', //后端接受的页码字段名
        excel: false //是否需要导出excel
      }
    };

  }


  ok() {
    let activityId = this.$state.params.id;
    this.Api.post('activity/delPlazalimitation', {
      activityId: activityId,
      ids: this.multiSelectModel
    }).then(r => {
      this.$uibModalInstance.close('ok');
    }, e => {
      alert('删除失败');
    });
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default PlazaController;

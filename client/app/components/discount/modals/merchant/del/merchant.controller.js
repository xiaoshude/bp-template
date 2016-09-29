class PlazaController {
  constructor($uibModalInstance, $http, Api, $state, merchantlimitationList) {
    'ngInject'
    this.$uibModalInstance = $uibModalInstance;
    this.Api = Api;
    this.$state = $state;
    this.isDetailRange = this.$state.current.name == 'discount.detailrange' || this.$state.params.isDetailLike;
    this.btnPrimaryCon = '删除';

    let activityId = this.$state.params.id;
    this.multiSelectModel = merchantlimitationList;
    this.loadPromise = $http.get('/kickoff/activity/merchantlimitationList?activityId=' + activityId);
    this.config = {
      //拉取数据的url
      url: '/kickoff/activity/merchantlimitationList?activityId=' + activityId,

      //标识每个选项的字段
      uniqueField: 'id',

      //生成查询表单的信息w
      queryFields: [
      ],
      //在table中展示的字段
      tableFields: [
        {
          displayName: '商户名称',
          name: 'merchantName'
        },
        {
          displayName: '门店类型',
          name: 'type'
        },
        {
          displayName: '所属城市',
          name: 'registeredAddress'
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
    this.Api.post('activity/delMerchantlimitation', {
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

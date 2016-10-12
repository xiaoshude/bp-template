class Controller {
  constructor($uibModalInstance, $http, Api, $state, selectionFlag) {
    'ngInject'
    this.$uibModalInstance = $uibModalInstance;
    this.Api = Api;
    this.$state = $state;
    this.selectionFlag = selectionFlag;

    this.isDetailRange = this.$state.current.name == 'discount.detailrange' || this.$state.params.isDetailLike;
    this.btnPrimaryCon = '删除';
    this.title = this.isDetailRange ? '查看' : '编辑';

    let activityId = this.$state.params.id;
    this.loadPromise = $http.get('/kickoff/activity/brandMerchantLimitationList');
    this.config = {
      //拉取数据的url
      url: `/kickoff/activity/brandMerchantLimitationList?activityId=${activityId}&selectionFlag=${selectionFlag}`,

      //标识每个选项的字段
      uniqueField: 'id',

      //生成查询表单的信息w
      queryFields: [
      ],
      //在table中展示的字段
      tableFields: [
        {
          displayName: '品牌商编号',
          name: 'merchantId'
        },
        {
          displayName: '品牌商名称',
          name: 'merchantName'
        },
        {
          displayName: '经营品牌',
          name: 'brandName'
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
    let selectionFlag = this.selectionFlag;
    this.Api.post('activity/delBrandMerchantLimitation', {
      activityId,
      selectionFlag,
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

export default Controller;

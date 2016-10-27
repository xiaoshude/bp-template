class Controller {
  constructor($uibModalInstance, $http, Api, $state, selectionFlag) {
    'ngInject'
    this.$uibModalInstance = $uibModalInstance;
    this.Api = Api;
    this.$state = $state;
    this.selectionFlag = selectionFlag;

    let activityId = this.$state.params.id;

    this.btnPrimaryCon = '添加';

    this.loadPromise = $http.get('/kickoff/activity/brandMerchantList');
    this.config = {
      //拉取数据的url
      url: `/kickoff/activity/brandMerchantList?activityId=${activityId}&selectionFlag=${selectionFlag}`,

      //标识每个选项的字段
      uniqueField: 'merchantId',

      //生成查询表单的信息w
      queryFields: [
        {
          type: 'text',
          displayName: '品牌商ID',
          name: 'merchantId'
        },
        {
          type: 'text',
          displayName: '品牌商名称',
          name: 'merchantName'
        },
        {
          type: 'text',
          displayName: '经营品牌',
          name: 'brandName'
        }
      ],
      //在table中展示的字段
      tableFields: [
        {
          displayName: '品牌商ID',
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
    this.Api.post('activity/addBrandMerchantlimitation', {
      activityId,
      selectionFlag,
      limitations: this.multiSelectModel
    }).then(r => {
      this.$uibModalInstance.close('ok');
    }, e => {
      alert('添加失败');
    });
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default Controller;

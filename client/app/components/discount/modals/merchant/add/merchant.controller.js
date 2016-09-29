class PlazaController {
  constructor($uibModalInstance, $http, Api, $state, merchantlimitationList) {
    'ngInject'
    this.$uibModalInstance = $uibModalInstance;
    this.Api = Api;
    this.$state = $state;
    let activityId = this.$state.params.id;

    this.btnPrimaryCon = '添加';

    this.multiSelectModel = merchantlimitationList;
    this.loadPromise = $http.get('/kickoff/activity/merchantList');
    this.config = {
      //拉取数据的url
      url: '/kickoff/activity/merchantList?activityId=' + activityId,

      //标识每个选项的字段
      uniqueField: 'merchantId',

      //生成查询表单的信息w
      queryFields: [
        {
          type: 'text',
          displayName: '商户编号',
          name: 'merchantId'
        },
        {
          type: 'text',
          displayName: '所属集团',
          name: 'entGroupName'
        },
        {
          type: 'text',
          displayName: '品牌名称',
          name: 'brandName'
        },
        {
          type: 'text',
          displayName: '商户名称',
          name: 'merchantName'
        },
        {
          type: 'select',
          displayName: '商户类型',
          name: 'type',
          options: [
            {
              text: '全部',
              value: ''
            },
            {
              text: '第三方商家',
              value: '1'
            },
            {
              text: '自有商家',
              value: '3'
            },
            {
              text: '集团虚拟商家',
              value: '4'
            }
          ]
        },
        {
          type: 'select',
          displayName: '状态',
          name: 'status',
          options: [
            {
              text: '全部',
              value: ''
            },
            {
              text: '预上线',
              value: '1'
            },
            {
              text: '初级合作',
              value: '2'
            },
            {
              text: '线上业务审核通过',
              value: '3'
            },
            {
              text: '线上+收单业务审核通过',
              value: '4'
            },
            {
              text: '冻结',
              value: '5'
            }
          ]
        }
      ],
      //在table中展示的字段
      tableFields: [
        {
          displayName: '商户编号',
          name: 'merchantId'
        },
        {
          displayName: '商户名称',
          name: 'merchantName'
        },
        {
          displayName: '所属集团',
          name: 'entGroupName'
        },
        {
          displayName: '商户类型',
          name: 'type'
        },
        {
          displayName: '经营品牌',
          name: 'brandNames'
        },
        {
          displayName: '经营类目',
          name: 'categoryNames'
        },
        {
          displayName: '状态',
          name: 'status'
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
    this.Api.post('activity/addMerchantlimitation', {
      activityId: activityId,
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

export default PlazaController;

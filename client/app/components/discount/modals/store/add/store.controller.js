class StoreController {
  constructor($uibModalInstance, $http, Api, $state, storelimitationList, selectionFlag) {
    'ngInject'
    this.$uibModalInstance = $uibModalInstance;
    this.Api = Api;
    this.$state = $state;
    this.selectionFlag = selectionFlag;

    let activityId = this.$state.params.id;

    this.btnPrimaryCon = '添加';

    this.multiSelectModel = storelimitationList;
    this.loadPromise = $http.get('/kickoff/activity/storeList');
    this.config = {
      //拉取数据的url
      url: '/kickoff/activity/storeList?fields=brand&activityId=' + activityId,

      //标识每个选项的字段
      uniqueField: 'storeId',

      //生成查询表单的信息w
      queryFields: [
        {
          type: 'text',
          displayName: '门店编号',
          name: 'storeId'
        },
        {
          type: 'text',
          displayName: '门店名称',
          name: 'storeName'
        },
        {
          type: 'text',
          displayName: '经营品牌',
          name: 'brandName'
        },
        {
          type: 'text',
          displayName: '商户名称',
          name: 'merchantName'
        },
        {
          type: 'text',
          displayName: '商圈名称',
          name: 'plazaName'
        },
        {
          type: 'select',
          displayName: '门店类型',
          name: 'businessTypes',
          options: [
            {
              text: '全部',
              value: ''
            },
            {
              text: '电影',
              value: '1'
            },
            {
              text: '亲子',
              value: '2'
            },
            {
              text: '餐饮',
              value: '3'
            },
            {
              text: 'KTV',
              value: '4'
            },
            {
              text: '大玩家',
              value: '5'
            },
            {
              text: '乐园',
              value: '6'
            },
            {
              text: '秀场',
              value: '7'
            },
            {
              text: '购物',
              value: '8'
            },
            {
              text: '旅游',
              value: '9'
            },
            {
              text: '地产',
              value: '10'
            },
            {
              text: '酒店',
              value: '11'
            },
            {
              text: '广场门店',
              value: '12'
            }
          ]
        }
      ],
      //在table中展示的字段
      tableFields: [
        {
          displayName: '门店编号',
          name: 'storeId'
        },
        {
          displayName: '门店名称',
          name: 'storeName'
        },
        {
          displayName: '商户名称',
          name: 'merchantName'
        },
        {
          displayName: '经营品牌',
          name: 'brandNameZh'
        },
        {
          displayName: '门店类型',
          name: 'businessTypeName'
        },
        {
          displayName: '所属商圈',
          name: 'plazaName'
        },
        {
          displayName: '所属城市',
          name: 'cityName'
        }
      ],

      //ng-table的配置项
      tableConfig: {
        limit: 10, //每页多少个
        pageName: 'page', //后端接受的页码字段名
        excel: false //是否需要导出excel
      },

      //table内的操作按钮
      operations: [
      ]

    };

  }


  ok() {
    let activityId = this.$state.params.id;
    let selectionFlag = this.selectionFlag;
    this.Api.post('activity/addStorelimitation', {
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

export default StoreController;

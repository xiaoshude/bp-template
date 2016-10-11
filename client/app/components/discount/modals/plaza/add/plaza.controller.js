class PlazaController {
  constructor($uibModalInstance, $http, Api, $state, plazalimitationList, selectionFlag) {
    'ngInject'
    this.$uibModalInstance = $uibModalInstance;
    this.Api = Api;
    this.$state = $state;
    this.selectionFlag = selectionFlag;

    let activityId = this.$state.params.id;

    this.btnPrimaryCon = '添加';

    let plazaTypeOptions = [
      {
        text: '全部',
        value: ''
      }
    ];
    Api.get('activity/plazaTypeList').then(r => {
      console.log('plazaTypeList', r);
      r.forEach(item => {
        plazaTypeOptions.push({
          text: item.name,
          value: item.code
        });
      });
      console.log('plazaTypeOptions', plazaTypeOptions);
    });

    this.multiSelectModel = angular.copy(plazalimitationList);
    this.loadPromise = $http.get('/kickoff/activity/plazaList');
    this.config = {
      //拉取数据的url
      url: '/kickoff/activity/plazaList?activityId=' + activityId,

      //标识每个选项的字段
      uniqueField: 'plazaId',

      //生成查询表单的信息w
      queryFields: [
        {
          type: 'text',
          displayName: '商圈编号',
          name: 'plazaId'
        },
        {
          type: 'select',
          displayName: '商圈类型',
          name: 'plazaType',
          options: plazaTypeOptions
        },
        {
          type: 'text',
          displayName: '商圈名称',
          name: 'plazaName'
        },
        {
          type: 'text',
          displayName: '所属集团',
          name: 'entGroupName'
        },
        {
          type: 'select',
          displayName: '商圈状态',
          name: 'status',
          options: [
            {
              text: '全部',
              value: ''
            },
            {
              text: '未上线',
              value: '1'
            },
            {
              text: '已上线',
              value: '2'
            },
            {
              text: '已下线',
              value: '3'
            },
            {
              text: '建设中',
              value: '4'
            }
          ]
        }
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
          displayName: '商圈状态',
          name: 'status'
        },
        {
          displayName: '商圈类型',
          name: 'plazaType'
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
      }
    };

  }


  ok() {
    let activityId = this.$state.params.id;
    let selectionFlag = this.selectionFlag;
    this.Api.post('activity/addPlazalimitation', {
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

export default PlazaController;

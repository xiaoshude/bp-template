/**
 * 活动详情页
 * @author chuxin fengpeng
 * restructed by fjywan
 */

import moment from 'moment';

import template from '../modals/onlineconfig/template.html'
import controller from '../modals/onlineconfig/controller.js'

"use strict";
export default class ListController {
  constructor($scope, NgTableParams, $http, $location, Api, $uibModal, $state) {
    'ngInject';
    this.Api = Api;
    this.$uibModal = $uibModal;
    this.filter = {};
    this.params = {};
    this.authList = [];
    this.isEmptyForListData = false;
    this.$state = $state;

    this.datepickerOption = {
      viewFormat: 'YYYY-MM-DD HH:mm:ss'
    };

    Api.get('activity/getAuthList').then((data) => {
      angular.forEach(data, (item) => {
        this.authList.push(item);
      });

      this.tableParams = new NgTableParams({
        count: 10  //每页几条
      }, {
        counts: [],
        getData: params => {
          let formData = this.getSearchFormData();
          formData.offset = ((params.url().page) - 1) * 10;
          return Api.get('activity/getlist', formData)
            .then(data => {
              if (data && data['data'] && data['data'].length > 0) {
                this.isEmptyForListData = false;
              } else {
                this.isEmptyForListData = true;
              }
              params.total((data && data.totalCount) || 1); //帮你分几页
              this.formatTableButtonStatus(data && data['data']);
              return (data && data['data']) || [];
            });
        }
      });
    })

  }

  /**
   * 所搜, 其实还是调用表格的搜索 也就是getData
   */
  searchList() {
    let params = this.getSearchFormData();
    params.offset = 0;
    params.page = 1;
    this.tableParams.parameters(params).reload();
  }

  /**
   * @returns {{}} form数据集合
   */
  getSearchFormData() {
    let formData = {
      type: 1
    };
    let filter = this.filter;
    if (filter.name) {
      formData.name = filter.name;
    }
    if (filter.laterThan) {
      formData.laterThan = moment(filter.laterThan).format('X');
    }
    if (filter.earlierThan) {
      formData.earlierThan = moment(filter.earlierThan).format('X');
    }
    if (filter.createdBy) {
      formData.createdBy = filter.createdBy;
    }
    if (filter.status) {
      formData.status = filter.status;
    }
    return formData;
  }

  //操作按钮是否展示 权限控制
  checkAuth(behaviour) {
    if (this.authList.indexOf(behaviour) > -1) {
      return true;
    }
  }

  /**
   * 格式化几个按钮的状态, 不在html里面写了, 太捉急了.
   * @param dataList {Array} Table的数据源
   */
  formatTableButtonStatus(dataList) {
    dataList = dataList || [];
    const statusMap = {};
    // 已保存
    statusMap['status0'] = {
      hasDetailButton: this.checkAuth('show'),
      hasEditButton: this.checkAuth('edit'),
      hasSubmitButton: this.checkAuth('submit')
    };
    // 待审核//新加edit
    statusMap['status1'] = {
      hasEditButton: this.checkAuth('edit'),
      hasDetailButton: this.checkAuth('show'),
      hasAgreeButton: this.checkAuth('agree'),
      hasRejectButton: this.checkAuth('reject'),
      hasRepealButton: this.checkAuth('repeal')
    };
    // 已撤销
    statusMap['status2'] = {
      hasDetailButton: this.checkAuth('show'),
      hasEditButton: this.checkAuth('edit')//,
      //  hasSubmitButton: true
    };
    // 已驳回
    statusMap['status3'] = {
      hasDetailButton: this.checkAuth('show'),
      hasEditButton: this.checkAuth('edit')//,
      //  hasSubmitButton: true
    };
    // 已上线
    statusMap['status4'] = {
      hasDetailButton: this.checkAuth('show'),
      hasEditButton: this.checkAuth('edit'),
      hasOffOnlineButton: this.checkAuth('up'),
      hasRefreshConfigButton: true
    };
    // 已下线
    statusMap['status5'] = {
      hasDetailButton: this.checkAuth('show'),
      hasOnlineButton: this.checkAuth('up'),
      hasEditButton: this.checkAuth('edit')
    };
    // 已结束
    statusMap['status6'] = {
      hasDetailButton: this.checkAuth('show'),
      //hasEditButton: this.checkAuth('edit')
    };

    //做检索合并
    dataList.forEach(item => {
      const buttonConfig = statusMap['status' + item.status];
      if (buttonConfig) {
        angular.extend(item, buttonConfig);
      }
    });
  }

  /**
   * 提交 把状态变更为待审核
   * @param id
   */
  submitActivity(id) {
    this.changeActivityStatus(id, 'commit');
  }

  /**
   * 同意 点同意就直接已上线了...
   * @param id
   */
  agreeActivity(id) {
    this.changeActivityStatus(id, 'approve');
    this.$uibModal.open({
      animation: true,
      template: `<div class="modal-body">
      <p style="text-align: center">
      请到【活动配置中心】>设置本活动的权重值，点击【去设置】可直接前往~~
      </p>
      <p style="text-align: center;font-size: 17px;margin-top: 6px"><a class="btn bp-btn-primary" href="/BPAPPS/whitelist/index.html#/configcenter">去设置</a></p></div>`,
      size: 'sm'
    });
  }

  /**
   * 驳回 变已驳回
   * @param id
   */
  rejectActivity(id) {
    this.changeActivityStatus(id, 'reject');
  }

  /**
   * 撤销 变已撤销
   * @param id
   */
  repealActivity(id) {
    this.changeActivityStatus(id, 'rollback');
  }

  /**
   * 上线 变已上线 这个和同意是一样的
   * @param id
   */
  onlineActivity(id) {
    this.changeActivityStatus(id, 'open');
  }

  /**
   * 下线
   * @param id
   */
  offlineActivity(id) {
    this.changeActivityStatus(id, 'close');
  }


  changeActivityStatus(id, status) {
    this.Api.post('activity/status', {
      activityId: id,
      status: status
    })
      .then(
      () => {
        this.tableParams.parameters({}).reload();
      }
    );
  }


  refreshConfig(activityId, flushAt){
    var modalInstance = this.$uibModal.open({
      animation: true,
      template,
      controller,
      controllerAs: 'vm',
      size: '',
      resolve: {
        activityId: () => activityId,
        flushAt: () => flushAt
      }
    });

    modalInstance.result.then(r => {
      let params = this.getSearchFormData();
      params.offset = 0;
      params.page = 1;
      this.tableParams.parameters(params).reload();
    }, () => {
    });
  }
}

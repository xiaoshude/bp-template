class Controller {
  constructor($uibModalInstance, Api, $state, activityId, flushAt) {
    'ngInject'
    this.$uibModalInstance = $uibModalInstance;
    this.Api = Api;
    this.$state = $state;

    this.activityId = activityId;
    this.flushAt = flushAt * 1000;
    if (this.flushAt) {
      this.isNowRefresh = '0'
    } else {
      this.isNowRefresh = '1'
    }

    this.datepickerOption = {
      viewFormat: 'YYYY-MM-DD HH:mm:ss',
      modelFormat: "x"
    };
  }

  ok() {
    let activityId = this.activityId;
    if (this.isNowRefresh == 1) {
      this.Api.post('activity/flushStatus', {activityId}).then(r => {
        alert('刷新成功');
        this.$uibModalInstance.close('ok');
      }, e => {
        alert('刷新失败');
      });
    } else {
      if (this.flushAt) {
        let flushAt = this.flushAt;
        this.Api.post('activity/flushStatus', {activityId, flushAt}).then(r => {
          alert('刷新成功');
          this.$uibModalInstance.close('ok');
        }, e => {
          alert('刷新失败');
        });
      } else {
        alert('生效时间必填');
      }
    }
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default Controller;

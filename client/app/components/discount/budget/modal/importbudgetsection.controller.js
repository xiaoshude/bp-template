class EditBudgetSectionCtrl {
  constructor(Api, $uibModalInstance, $stateParams) {
    "ngInject";
    this.bpApi = Api;
    this.$uibModalInstance = $uibModalInstance;
    this.$stateParams = $stateParams;
    this.form = {};

    this.formConfig = {
      fields: [
        {
          type: 'text',
          displayName: '模板',
          name: 'code',
          validateRules: {
            required: true
          }
        }]
    };

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.dateOptions = {
      minDate: tomorrow,
      initDate: tomorrow,
      showWeeks: false
    };

    this.open1 = () => {
      this.popup1.opened = true;
    };

    this.open2 = () => {
      this.popup2.opened = true;
    };
    this.popup1 = {
      opened: false
    };

    this.popup2 = {
      opened: false
    };
  }

  ok() {
    let activityId = this.$stateParams.id;
    this.bpApi.get('template/importScope', Object.assign({}, this.form, {activityId})).then(() => {
      this.$uibModalInstance.close(bands);
    }, e => {
      e && e.message ? alert(e.message) : alert('出现错误');
    });
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default EditBudgetSectionCtrl;

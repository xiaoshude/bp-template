class EditBudgetSectionCtrl {
  constructor(Api, $uibModalInstance) {
    "ngInject";
    this.bpApi = Api;
    this.$uibModalInstance = $uibModalInstance;
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
  }

  ok() {
    let code = this.form.code;
    this.bpApi.get('template/importScope', {code}).then(r => {
      let bands = r;
      if (bands && angular.isArray(bands)) {
        this.$uibModalInstance.close(bands);
      } else {
        alert('该编号的模板为空');
      }
    }, e => {
      e && e.message ? alert(e.message) : alert('出现错误');
    });
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default EditBudgetSectionCtrl;

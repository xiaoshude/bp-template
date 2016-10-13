class Controller {
  constructor($uibModalInstance, $http, Api, $state, data, Upload, restrict) {
    'ngInject'
    this.$uibModalInstance = $uibModalInstance;
    this.Api = Api;
    this.$state = $state;
    this.Upload = Upload;
    this.data = data;

    let typeMappings = [0, 'brandMerchant', 'brand', 'store', 'plaza', 'merchant'];
    this.selectionFlagOptions = [
      {
        text: '导入正向列表',
        value: 1
      },
      {
        text: '导入反向列表',
        value: 2
      }
    ];

    this.selectionFlag = 1;
    if (typeMappings[data.type]) {
      if (!restrict[this._getLimitName(typeMappings[data.type])]) {
        this.selectionFlagOptions.shift();
        this.selectionFlag = 2;
      }
      if (!restrict[this._getReverseLimitName(typeMappings[data.type])]) {
        this. selectionFlagOptions.pop();
        this.selectionFlag = 1;
      }
    }

    this.url = '/kickoff/activity/multiImportScopeLimitations';

    this.activityId = this.$state.params.id;
    this.uploadFile = function (file) {
      this._uploadFile(file, data.type, this.selectionFlag)
    }
  }

  _uploadFile(file, type, selectionFlag) {
    file.upload = this.Upload.upload({
      url: this.url,
      data: {
        file: file,
        activityId: this.activityId,
        selectionFlag,
        type
      }
    });

    this.startImport = true;
    this.importing = true;

    file.upload.then(response => {
      let taskId = response.data.data.taskId;
      let getImportData = () => {
        this.Api.get('activity/getMultiImportData', {taskId}).then(r => {
          console.log('r', r);
          this.importResult = {
            total: r.total,
            success: r.success,
            failed: r.failed,
            existed: r.existed
          };
          if (r.status != 2) {
            setTimeout(getImportData(), 500)
          } else {
            this.importing = false;
          }
        });
      };
      if (taskId) {
        getImportData();
      } else {
        alert('导入失败');
      }
    }, response => {
      alert('导入失败');
    })
  }

  _getLimitName(typeName) {
    let CapTypeName = typeName.charAt(0).toUpperCase() + typeName.slice(1);
    return `is${CapTypeName}Limit`;
  }

  _getReverseLimitName(typeName) {
    let CapTypeName = typeName.charAt(0).toUpperCase() + typeName.slice(1);
    return `is${CapTypeName}ReverseLimit`;
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default Controller;

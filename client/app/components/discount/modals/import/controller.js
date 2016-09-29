class Controller {
  constructor($uibModalInstance, $http, Api, $state, data, Upload) {
    'ngInject'
    this.$uibModalInstance = $uibModalInstance;
    this.Api = Api;
    this.$state = $state;
    this.Upload = Upload;
    this.data = data;

    this.url = '/kickoff/activity/multiImportScopeLimitations';

    this.activityId = this.$state.params.id;
    this.uploadFile = function (file) {
      this._uploadFile(file, data.type)
    }
  }

  _uploadFile(file, type) {
    file.upload = this.Upload.upload({
      url: this.url,
      data: {
        file: file,
        activityId: this.activityId,
        type: type
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
          if(r.status != 2){
            setTimeout(getImportData(), 500)
          }else{
            this.importing = false;
          }
        });
      };
      if(taskId){
        getImportData();
      }else{
        alert('导入失败');
      }
    }, response => {
      alert('导入失败');
    })
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default Controller;

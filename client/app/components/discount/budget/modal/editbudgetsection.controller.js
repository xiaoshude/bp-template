import {budgetSectionProcess} from '../../../request.js'
import moment from 'moment';
class EditBudgetSectionCtrl {
  constructor(Api, $uibModalInstance, bandData, $state, notify) {
    "ngInject";
    let self = this;
    this.Api = Api;
    this.title = bandData.title;
    this.type = bandData.type;
    this.action = bandData.action;
    this.oaInfo = bandData.oaInfo;
    this.isStartAtDisable = true;
    //this.isDisable = false;
    if (bandData.action != 'add') {
      this.band = angular.copy(bandData.band);
      //if(moment().unix() > moment(bandData.band.startAt).unix()){
      //    this.isDisable = true;
      //}

    } else {
      this.isStartAtDisable = false;
      this.band = {};
    }
    this.ok = function () {
      if (bandData.type == '1' && !(/^[1-9]\d*(\.\d{1,2})?$/.test(self.band.value))) {
        notify({
          message: '元最多精确到小数点后两位',
          classes: 'alert alert-danger'
        });
        return false;
      }
      if (bandData.type == '0' && !(/^[1-9]\d*$/.test(self.band.value))) {
        notify({
          message: '次必须为整数',
          classes: 'alert alert-danger'
        });
        return false;
      }

      if (bandData.action != 'add') {
        let dataToPost = angular.copy(this.band);
        budgetSectionProcess(dataToPost);
        self.Api.post('budgetSection/update', dataToPost).then(function (result) {
          bandData.band = self.band;
          $uibModalInstance.close(bandData);
        });
      } else {
        this.band.activityId = $state.params.id;
        let dataToPost = angular.copy(this.band);
        budgetSectionProcess(dataToPost);
        self.Api.post('budgetSection/add', dataToPost).then(function (result) {
          if (result) {
            Api.get('budgetSection/getlist', {activityId: $state.params.id}).then((data)=> {
              bandData.bands = data;
              $uibModalInstance.close(bandData);
            });
          }
        });
      }
    };
    this.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    this.startDatepickerOption = {
      viewFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: '开始时间'
    };
    this.endDatepickerOption = {
      viewFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: '结束时间'
    }
  }
}

export default EditBudgetSectionCtrl;

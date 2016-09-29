class CityController {
  constructor($uibModalInstance, Api, $http, citylimitationList, $state) {
    'ngInject'
    this.$uibModalInstance = $uibModalInstance;
    this.Api = Api;
    this.$state = $state;
    this.loadPromise = $http.get('/Database/coupon_component/selectCity');
    this.config = {
      //指示子节点的字段名
      fieldOfChildren: 'child',
      //指示节点名的字段
      fieldOfName: 'name',
      //指示节点id的字段
      fieldOfId: 'categoryId'
    };
    this.form = {};
    console.log('citylimitationList inject in CityController', citylimitationList);
    this.form.cities = angular.copy(citylimitationList);
  }

  ok() {
    let activityId = this.$state.params.id;
    let ids = this.parseData(this.form.cities);
    if(!ids.length){
      alert('未选择任何城市');
      return;
    }
    this.Api.post('activity/updateCitylimitation', {
      activityId: activityId,
      limitations: ids
    }).then(responce => {
      this.$uibModalInstance.close('ok');
    });
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
  parseData(data){
    let ids = [];
    let walkList = list => {
      list.forEach(item => {
        console.log('walkList in parseData', item);
        ids.push(item[this.config.fieldOfId]);
        if(list[this.config.fieldOfChildren]){
          walkList(list[this.config.fieldOfChildren])
        }
      });
    };
    walkList(data);
    return ids;
  }
}

export default CityController;

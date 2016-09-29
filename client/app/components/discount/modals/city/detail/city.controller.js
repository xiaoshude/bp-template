class CityController {
  constructor($uibModalInstance, Api, $http, citylimitationList, $state) {
    'ngInject'
    this.$uibModalInstance = $uibModalInstance;
    this.Api = Api;
    this.$state = $state;
    this.loadPromise = $http.get('/Database/coupon_component/selectCity');

    this.cities = angular.copy(citylimitationList);
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default CityController;

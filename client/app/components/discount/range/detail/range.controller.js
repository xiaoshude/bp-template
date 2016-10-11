import citySelectTemplate from '../../modals/city/select/city.html';
import citySelectController from '../../modals/city/select/city.controller.js';
import cityDetailTemplate from '../../modals/city/detail/city.html';
import cityDetailController from '../../modals/city/detail/city.controller.js';

import brandTemplate from '../../modals/brand/template.html'
import brandDelController from '../../modals/brand/del/controller.js'

import brandmerchantTemplate from '../../modals/brandmerchant/template.html'
import brandmerchantDelController from '../../modals/brandmerchant/del/controller.js'

import plazaTemplate from '../../modals/plaza/plaza.html'
import plazaAddController from '../../modals/plaza/add/plaza.controller.js'
import plazaDelController from '../../modals/plaza/del/plaza.controller.js'

import merchantTemplate from '../../modals/merchant/merchant.html'
import merchantAddController from '../../modals/merchant/add/merchant.controller.js'
import merchantDelController from '../../modals/merchant/del/merchant.controller.js'

import storeTemplate from '../../modals/store/store.html'
import storeAddController from '../../modals/store/add/store.controller.js'
import storeDelController from '../../modals/store/del/store.controller.js'
class RangeController {
  constructor($uibModal, Api, $scope, $state, $location) {
    'ngInject'
    this.$uibModal = $uibModal;
    this.Api = Api;
    this.$location = $location;

    this.rangeDetail = true;
    this.form = {};
    this.restrict = {};
    this.activityId = $state.params.id;

    $scope.$watch('vm.restrict', newValue => {
      for (let key in newValue) {
        if (newValue[key] && key != 'id') {
          this.noLimit = false;
        }
      }
    }, true);
    //获取业态
    Api.get('activity/businessTypeList').then(responce => {
      console.log('businessTypeList', responce);
      this.businessTypeList = responce;
    });
    //获取类目
    Api.get('activity/categoryList').then(responce => {
      console.log('categoryList', responce);
      this.categoryList = responce;
    });

    this.firmTypes = [
      {
        value: 1,
        text: '乐园'
      },
      {
        value: 2,
        text: '秀场'
      },
      {
        value: 3,
        text: '购物'
      },
      {
        value: 4,
        text: '旅游'
      },
      {
        value: 4,
        text: '房产'
      },
      {
        value: 4,
        text: '酒店'
      },
      {
        value: 4,
        text: '电影'
      },
      {
        value: 4,
        text: '亲子'
      },
      {
        value: 4,
        text: '餐饮'
      },
      {
        value: 4,
        text: 'KTV'
      },
      {
        value: 4,
        text: '大玩家'
      },
      {
        value: 4,
        text: '超市'
      }
    ];
    this.groupOptions = [
      {
        value: 1,
        text: '万达集团'
      },
      {
        value: 2,
        text: '上海红星美凯龙商业管理有限公司'
      },
    ]
  }

  detailCity(size) {
    let activityId = this.activityId;
    var modalInstance = this.$uibModal.open({
      animation: true,
      template: cityDetailTemplate,
      controller: cityDetailController,
      controllerAs: 'vm',
      size: size,
      resolve: {
        citylimitationList: () => {
          //获取城市限制列表
          return this.Api.get('activity/citylimitationList', {activityId}).then(responce => {
            this.citylimitationList = responce;
            this.citylimitationList.forEach(item => {
              item.categoryId = item.regionId || item.provinceId || item.cityId;
            });
            return this.citylimitationList;
          });
        }
      }
    });

    modalInstance.result.then(selectedItem => {
      console.log('selectedItem', selectedItem);
      this.selected = selectedItem;
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  }

  delPlaza(size) {
    var modalInstance = this.$uibModal.open({
      animation: true,
      template: plazaTemplate,
      controller: plazaDelController,
      controllerAs: 'vm',
      size: size,
      resolve: {
        plazalimitationList: () => {
          return [];
        },
        rangeDetail: () => {
          return true;
        }
      }
    });

    modalInstance.result.then(selectedItem => {
      console.log('selectedItem', selectedItem);
      this.selected = selectedItem;
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  }

  delBrand(size) {
    var modalInstance = this.$uibModal.open({
      animation: true,
      template: brandTemplate,
      controller: brandDelController,
      controllerAs: 'vm',
      size: size,
      resolve: {
      }
    });

    modalInstance.result.then(selectedItem => {
      console.log('selectedItem', selectedItem);
      this.selected = selectedItem;
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  }

  delBrandMerchant(size) {
    var modalInstance = this.$uibModal.open({
      animation: true,
      template: brandmerchantTemplate,
      controller: brandmerchantDelController,
      controllerAs: 'vm',
      size: size,
      resolve: {
      }
    });

    modalInstance.result.then(selectedItem => {
      console.log('selectedItem', selectedItem);
      this.selected = selectedItem;
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  }

  delMerchant(size) {
    var modalInstance = this.$uibModal.open({
      animation: true,
      template: merchantTemplate,
      controller: merchantDelController,
      controllerAs: 'vm',
      size: size,
      resolve: {
        merchantlimitationList: () => {
          return [];
        }
      }
    });

    modalInstance.result.then(selectedItem => {
      console.log('selectedItem', selectedItem);
      this.selected = selectedItem;
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  }

  delStore(size) {
    var modalInstance = this.$uibModal.open({
      animation: true,
      template: storeTemplate,
      controller: storeDelController,
      controllerAs: 'vm',
      size: size,
      resolve: {
        storelimitationList: () => {
          return [];
        }
      }
    });

    modalInstance.result.then(selectedItem => {
      console.log('selectedItem', selectedItem);
      this.selected = selectedItem;
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  }

  $onInit() {
    let activityId = this.activityId;
    //获取各级活动范围是否限制列表
    this.Api.get('activity/scopelimitationList', {activityId}).then(responce => {
      this.restrict = responce;
      if(this.restrict.isBusinessTypeLimit == 0 &&
        this.restrict.isCategoryLimit == 0 &&
        this.restrict.isCityLimit == 0 &&
        this.restrict.isMerchantLimit == 0 &&
        this.restrict.isPlazaLimit == 0 &&
        this.restrict.isStoreLimit == 0){
        this.noLimit = true;
      }
    });
    //获取业态限制列表
    this.Api.get('activity/businesstypelimitationList', {activityId}).then(responce => {
      this.form.businesstypelimitationList = [];
      responce.forEach(item => {
        this.form.businesstypelimitationList.push('' + item.businessTypeId)
      });
    });
    //获取类目限制列表
    this.Api.get('activity/categorylimitationList', {activityId}).then(responce => {
      this.form.categorylimitationList = [];
      responce.forEach(item => {
        this.form.categorylimitationList.push(item.categoryId)
      });
    });
    //获取城市限制列表
    this.Api.get('activity/citylimitationList', {activityId}).then(responce => {
      this.citylimitationList = responce;
      this.citylimitationList.forEach(item => {
        item.categoryId = item.regionId || item.provinceId || item.cityId;
      });
    });
    //获取商圈限制列表
    this.Api.get('activity/plazalimitationList', {activityId}).then(responce => {
      this.plazalimitationList = [];
      responce.forEach(item => {
        this.plazalimitationList.push(item.plazaId);
      });
    });
    //获取商户限制列表
    this.Api.get('activity/merchantlimitationList', {activityId}).then(responce => {
      this.merchantlimitationList = [];
      responce.forEach(item => {
        this.merchantlimitationList.push(item.merchantId);
      });
    });
    //获取门店限制列表
    this.Api.get('activity/storelimitationList', {activityId}).then(responce => {
      this.storelimitationList = [];
      responce.forEach(item => {
        this.storelimitationList.push(item.storeId);
      });
    });
  }

}

export default RangeController;
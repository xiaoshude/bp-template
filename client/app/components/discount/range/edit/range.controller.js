import citySelectTemplate from '../../modals/city/select/city.html';
import citySelectController from '../../modals/city/select/city.controller.js';
import cityDetailTemplate from '../../modals/city/detail/city.html';
import cityDetailController from '../../modals/city/detail/city.controller.js';

import importTemplate from '../../modals/import/template.html'
import importController from '../../modals/import/controller.js'

import plazaTemplate from '../../modals/plaza/plaza.html'
import plazaAddController from '../../modals/plaza/add/plaza.controller.js'
import plazaDelController from '../../modals/plaza/del/plaza.controller.js'

import brandTemplate from '../../modals/brand/template.html'
import brandAddController from '../../modals/brand/add/controller.js'
import brandDelController from '../../modals/brand/del/controller.js'

import brandmerchantTemplate from '../../modals/brandmerchant/template.html'
import brandmerchantAddController from '../../modals/brandmerchant/add/controller.js'
import brandmerchantDelController from '../../modals/brandmerchant/del/controller.js'

import merchantTemplate from '../../modals/merchant/merchant.html'
import merchantAddController from '../../modals/merchant/add/merchant.controller.js'
import merchantDelController from '../../modals/merchant/del/merchant.controller.js'

import storeTemplate from '../../modals/store/store.html'
import storeAddController from '../../modals/store/add/store.controller.js'
import storeDelController from '../../modals/store/del/store.controller.js'
class RangeController {
  constructor($uibModal, Api, $scope, $state, $location, Upload) {
    'ngInject'
    this.$uibModal = $uibModal;
    this.Api = Api;
    this.$location = $location;
    this.$state = $state;
    this.Upload = Upload;

    this.form = {};
    this.restrict = {};
    this.reverseRestrict = {};
    this.activityId = $state.params.id;

    //type(1=>品牌商户,2=>品牌,3=>门店,4=>商圈,5=>商户,6=>白名单,7＝》灰名单)
    this.importUrls = {
      brandMerchant: 1,
      brand: 2,
      merchant: 5,
      store: 3,
      plaza: 4
    };
    this.importTplUrls = {
      brandMerchant: '/Public/excel_template/kicoff/brandmerchant.xlsx',
      brand: '/Public/excel_template/kicoff/brand.xlsx',
      merchant: '/Public/excel_template/kicoff/merchant.xlsx',
      store: '/Public/excel_template/kicoff/store.xlsx',
      plaza: '/Public/excel_template/kicoff/plaza.xlsx'
    };

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

  selectCity(size, selectionFlag) {
    let activityId = this.activityId;
    var modalInstance = this.$uibModal.open({
      animation: true,
      template: citySelectTemplate,
      controller: citySelectController,
      controllerAs: 'vm',
      size: size,
      resolve: {
        citylimitationList: () => {
          //获取城市限制列表
          return this.Api.get('activity/citylimitationList', {activityId, selectionFlag}).then(responce => {
            this.citylimitationList = responce;
            this.citylimitationList.forEach(item => {
              item.categoryId = item.cityId;
            });
            return this.citylimitationList;
          });
        },
        selectionFlag: () => {
          return selectionFlag;
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

  detailCity(size, selectionFlag) {
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
          return this.Api.get('activity/citylimitationList', {activityId, selectionFlag}).then(responce => {
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

  selectPlaza(size, selectionFlag) {
    var modalInstance = this.$uibModal.open({
      animation: true,
      template: plazaTemplate,
      controller: plazaAddController,
      controllerAs: 'vm',
      size: size,
      resolve: {
        plazalimitationList: () => {
          return [];
        },
        selectionFlag: () => {
          return selectionFlag;
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

  delPlaza(size, selectionFlag) {
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
          return false;
        },
        selectionFlag: () => {
          return selectionFlag;
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

  selectBrand(size) {
    var modalInstance = this.$uibModal.open({
      animation: true,
      template: brandTemplate,
      controller: brandAddController,
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

  selectBrandMerchant(size, selectionFlag) {
    var modalInstance = this.$uibModal.open({
      animation: true,
      template: brandmerchantTemplate,
      controller: brandmerchantAddController,
      controllerAs: 'vm',
      size: size,
      resolve: {
        selectionFlag: () => {
          return selectionFlag;
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

  delBrandMerchant(size, selectionFlag) {
    var modalInstance = this.$uibModal.open({
      animation: true,
      template: brandmerchantTemplate,
      controller: brandmerchantDelController,
      controllerAs: 'vm',
      size: size,
      resolve: {
        selectionFlag: () => {
          return selectionFlag;
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

  popImportModal(url, tpl) {
    let data = {
      type: url,
      tpl: tpl
    };
    let modalInstance = this.$uibModal.open({
      animation: true,
      template: importTemplate,
      controller: importController,
      controllerAs: 'vm',
      size: 'md',
      resolve: {
        data: () => data
      }
    });

    modalInstance.result.then(selectedItem => {
    }, function () {
    });
  }

  selectMerchant(size, selectionFlag) {
    var modalInstance = this.$uibModal.open({
      animation: true,
      template: merchantTemplate,
      controller: merchantAddController,
      controllerAs: 'vm',
      size: size,
      resolve: {
        merchantlimitationList: () => {
          return [];
        },
        selectionFlag: () => {
          return selectionFlag;
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

  delMerchant(size, selectionFlag) {
    var modalInstance = this.$uibModal.open({
      animation: true,
      template: merchantTemplate,
      controller: merchantDelController,
      controllerAs: 'vm',
      size: size,
      resolve: {
        merchantlimitationList: () => {
          return [];
        },
        selectionFlag: () => {
          return selectionFlag;
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

  selectStore(size, selectionFlag) {
    var modalInstance = this.$uibModal.open({
      animation: true,
      template: storeTemplate,
      controller: storeAddController,
      controllerAs: 'vm',
      size: size,
      resolve: {
        storelimitationList: () => {
          return [];
        },
        selectionFlag: () => {
          return selectionFlag;
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

  delStore(size, selectionFlag) {
    var modalInstance = this.$uibModal.open({
      animation: true,
      template: storeTemplate,
      controller: storeDelController,
      controllerAs: 'vm',
      size: size,
      resolve: {
        storelimitationList: () => {
          return [];
        },
        rangeDetail: () => {
          return false;
        },
        selectionFlag: () => {
          return selectionFlag;
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

    //获取该条活动的状态
    this.Api.get('activity/info', {activityId}).then(data => {
      //依据状态码查看是否可以编辑
      this.status = data && data.status;

      this.$state.params.isDetailLike = this.status == 1 || this.status == 5 || this.status == 6;
    });

    //获取各级活动范围是否限制列表
    this.Api.get('activity/scopelimitationList', {activityId}).then(responce => {
      this.reverseRestrict.isCityReverseLimit = responce.isCityReverseLimit;
      delete responce.isCityReverseLimit;
      this.reverseRestrict.isPlazaReverseLimit = responce.isPlazaReverseLimit;
      delete responce.isPlazaReverseLimit;
      this.reverseRestrict.isBrandMerchantReverseLimit = responce.isBrandMerchantReverseLimit;
      delete responce.isBrandMerchantReverseLimit;
      this.reverseRestrict.isMerchantReverseLimit = responce.isMerchantReverseLimit;
      delete responce.isMerchantReverseLimit;
      this.reverseRestrict.isStoreReverseLimit = responce.isStoreReverseLimit;
      delete responce.isStoreReverseLimit;

      this.restrict = responce;
      if (this.restrict.isBusinessTypeLimit == 0 &&
        this.restrict.isCategoryLimit == 0 &&
        this.restrict.isCityLimit == 0 &&
        this.restrict.isMerchantLimit == 0 &&
        this.restrict.isPlazaLimit == 0 &&
        this.restrict.isStoreLimit == 0) {
        this.noLimit = true;
        console.log('this.noLimit', this.noLimit);
      }
    });
    //获取业态限制列表
    this.Api.get('activity/businesstypelimitationList', {activityId}).then(responce => {
      this.form.businesstypelimitationList = [];
      responce.forEach(item => {
        this.form.businesstypelimitationList.push('' + item.businessTypeId)
      });
    });
    /*//获取类目限制列表
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
    });*/
  }

  save() {
    let activityId = this.activityId;
    let blankPromise = Promise.resolve(3);
    let postBusinesstypelimitation = {};
    postBusinesstypelimitation.activityId = activityId;
    postBusinesstypelimitation.limitations = [];
    this.form.businesstypelimitationList.forEach(item => {
      postBusinesstypelimitation.limitations.push(item);
    });
    /*let postCategorylimitation = {};
    postCategorylimitation.activityId = activityId;
    postCategorylimitation.limitations = [];
    this.form.categorylimitationList.forEach(item => {
      postCategorylimitation.limitations.push(item);
    });*/

    //检验合法性
    if (!this.restrict.isBusinessTypeLimit &&
      !this.restrict.isCategoryLimit &&
      !this.restrict.isCityLimit &&
      !this.restrict.isMerchantLimit &&
      !this.restrict.isBrandLimit &&
      !this.restrict.isBrandMerchantLimit &&
      !this.restrict.isPlazaLimit &&
      !this.restrict.isStoreLimit &&
      this.noLimit == false) {
      alert('未选择任何范围');
      return;
    }
    //业态范围
    if (this.restrict.isCategoryLimit && !postCategorylimitation.limitations.length) {
      alert('类目范围不能为空');
      return;
    }
    /*//类目范围
    if (this.restrict.isBusinessTypeLimit && !postBusinesstypelimitation.limitations.length) {
      alert('业态范围不能为空');
      return;
    }*/
    //从新拉取选中的来进行必填性校验
    let citylimitationListPromise = this.Api.get('activity/citylimitationList', {activityId, selectionFlag: 1});
    let plazalimitationListPromise = this.Api.get('activity/plazalimitationList', {activityId, selectionFlag: 1});
    //获取商户限制列表
    let merchantlimitationListPromise = this.Api.get('activity/merchantlimitationList', {activityId, selectionFlag: 1});
    //获取门店限制列表
    let storelimitationListPromise = this.Api.get('activity/storelimitationList', {activityId, selectionFlag: 1});
    Promise.all([citylimitationListPromise, plazalimitationListPromise, merchantlimitationListPromise, storelimitationListPromise]).then(result => {
      console.info('result', result);
      if(!result[0].length && this.restrict.isCityLimit == 1){
        console.log('this.restrict.isCityLimit', this.restrict.isCityLimit);
        alert('未选择任何城市');
        return;
      }
      if(!result[1].length && this.restrict.isPlazaLimit == 1){
        alert('未选择任何商圈');
        return;
      }
      if(!result[2].length && this.restrict.isMerchantLimit == 1){
        alert('未选择任何商户');
        return;
      }
      if(!result[3].length && this.restrict.isStoreLimit == 1){
        alert('未选择任何门店');
        return;
      }
      updateActivity();
    });

    var updateActivity = () => {
      //更新活动范围限制
      let scopePromise = this.Api.post('activity/updateScopelimitation', Object.assign({}, this.restrict, this.reverseRestrict, {activityId}));
      scopePromise.then(responce => {
        //this.restrict = responce;
      });

      //更新业态范围
      let businessTypePromise = blankPromise;
      if (postBusinesstypelimitation.limitations.length && this.restrict.isBusinessTypeLimit) {
        businessTypePromise = this.Api.post('activity/updateBusinesstypelimitation', postBusinesstypelimitation);
      }
      /*//更新类目范围
      let categoryPromise = blankPromise;
      if (this.restrict.isCategoryLimit && postCategorylimitation.limitations.length) {
        categoryPromise = this.Api.post('activity/updateCategorylimitation', postCategorylimitation);
      }*/

      Promise.all([scopePromise, businessTypePromise/*, categoryPromise*/])
        .then(r => {
          this.$location.url('discount/editrule/' + activityId);
        }, e => {
          alert('保存失败');
        });
    };
  }
}

export default RangeController;

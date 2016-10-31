/**
 * Created by fjywan on 16/5/19.
 */
import moment from 'moment';
function cityResponceFormat(list) {
  function addName(list, parentId) {
    list.forEach(item => {
      item.name = item.regionName || item.provinceName || item.cityName;
      item.categoryId = item.regionId || item.provinceId || item.cityId;
      if (parentId) {
        item.parent = parentId;
      }
      if (item.child) {
        addName(item.child, item.categoryId)
      }
    });
  }

  addName(list);
}
let responseHandleFunc = function (response) {
  // do something on success
  if (/\/activity\/rule/.test(response.config.url)) {
    console.info('urlInterceptor response pass', response);
    if (response.data.data) {
      response.data.data.ruleType ? response.data.data.ruleType = '1' : response.data.data.ruleType = '0';
      response.data.data.greaterThan = response.data.data.greaterThan / 100;
      response.data.data.minus = response.data.data.minus / 100;
      response.data.data.minValue = response.data.data.minValue / 100;
      if (response.data.data.greaterThan == 0) {
        response.data.data.greaterThan = '';
      }
      if (response.data.data.minus == 0) {
        response.data.data.minus = '';
      }
      if (response.data.data.minValue == 0) {
        response.data.data.minValue = '';
      }
      if (response.data.data.isCheckFirstBind == 0) {
        response.data.data.isCheckFirstBind = false;
      } else {
        response.data.data.isCheckFirstBind = true;
      }
      if (response.data.data.isSectionLimit == 0) {
        response.data.data.isSectionLimit = false;
      } else {
        response.data.data.isSectionLimit = true;
      }
      if (response.data.data.isGreaterThanLimit == 0) {
        response.data.data.isGreaterThanLimit = false;
      } else {
        response.data.data.isGreaterThanLimit = true;
      }
      if (response.data.data.isSingleUserDailyLimit == 0) {
        response.data.data.isSingleUserDailyLimit = false;
      } else {
        response.data.data.isSingleUserDailyLimit = true;
      }
      if (response.data.data.isSingleUserTotalLimit == 0) {
        response.data.data.isSingleUserTotalLimit = false;
      } else {
        response.data.data.isSingleUserTotalLimit = true;
      }
      angular.forEach(response.data.data.sectionLimitations, function (item) {
        item.maxValue = item.maxValue / 100;
        item.minValue = item.minValue / 100;
        item.probability = item.probability / 100;
      });
      angular.forEach(response.data.data.deductRanges, function (item) {
        item.greaterThan = item.greaterThan / 100;
        item.minus = item.minus / 100;
      });
    }
  }

  if (/\/budgetSection\/getlist/.test(response.config.url)) {
    setTimeout(() => console.info('urlInterceptor response budgetSection', response), 0);
    let processedData = {};
    if (response && response.data && response.data.data && angular.isArray(response.data.data)) {
      angular.forEach(response.data.data, function (item) {
        let day = moment(item.startAt * 1000).format("YYYY-MM-DD");
        let isMultiDay = day != moment(item.endAt * 1000).format("YYYY-MM-DD");

        item.startAt = moment(item.startAt * 1000).format("YYYY-MM-DD HH:mm:ss");
        item.endAt = moment(item.endAt * 1000).format("YYYY-MM-DD HH:mm:ss");
        item.value = item.value / 100;
        item.$isDisable = false;
        if (moment().unix() > moment(item.startAt).unix()) {
          item.$isDisable = true;
        }

        if (!processedData[day] || !angular.isArray(processedData[day])) {
          processedData[day] = [];
        }

        processedData[day].push(item);
        if(isMultiDay){
          processedData[day].isMultiDay = true;
        }
      });
      response.data.data = processedData;
    }
  }

  if (/\/kickoff\/activity\/brandList/.test(response.config.url)) {
    response.data.items = response.data.data;
  }
  if (/\/kickoff\/activity\/brandLimitationList/.test(response.config.url)) {
    response.data.items = response.data.data;
  }

  if (/\/kickoff\/activity\/brandMerchantList/.test(response.config.url)) {
    response.data.items = response.data.data;
  }
  if (/\/kickoff\/activity\/brandMerchantLimitationList/.test(response.config.url)) {
    response.data.items = response.data.data;
  }

  if (/\/kickoff\/activity\/merchantList/.test(response.config.url)) {
    console.info('urlInterceptor response merchantList', response);
    response.data.items = response.data.data;
    response.data.items.forEach(item => {
      switch (item.type) {
        case 1:
          item.type = '第三方商家';
          break;
        case 3:
          item.type = '自有商家';
          break;
        case 4:
          item.type = '自有商家';
          break;
        default :
          item.type = '未知类型'
      }
      switch (item.status) {
        case 1:
          item.status = '预上线';
          break;
        case 2:
          item.status = '初级合作';
          break;
        case 3:
          item.status = '线上业务审核通过';
          break;
        case 4:
          item.status = '线上+收单业务审核通过';
          break;
        case 5:
          item.status = '冻结';
          break;
        default :
          item.status = '未知类型'
      }
    });
  }
  if (/\/kickoff\/activity\/merchantlimitationList/.test(response.config.url)) {
    response.data.items = response.data.data;
  }


  if (/\/kickoff\/activity\/plazaList/.test(response.config.url)) {
    response.data.items = response.data.data;
    if (response.data.items && response.data.items.length) {
      response.data.items.forEach(item => {
        switch (item.plazaType) {
          case 1:
            item.plazaType = '购物中心';
            break;
          case 2:
            item.plazaType = '百货';
            break;
          default :
            item.plazaType = '未知类型'
        }
        switch (item.status) {
          case "1":
            item.status = '未上线';
            break;
          case "2":
            item.status = '已上线';
            break;
          case "3":
            item.status = '已下线';
            break;
          case "4":
            item.status = '建设中';
            break;
          default :
            item.status = '未知类型'
        }
      });
    }
  }
  if (/\/kickoff\/activity\/plazalimitationList/.test(response.config.url)) {
    response.data.items = response.data.data;
  }

  if (/\/kickoff\/activity\/storeList/.test(response.config.url)) {
    response.data.items = response.data.data;
    response.data.items.forEach(item => {
      console.log('item.type', item.type);
      switch (item.type) {
        case 1:
          item.type = '第三方门店';
          break;
        case 3:
          item.type = '万达自有';
          break;
        default :
          item.type = '未知门店类型'
      }
    });
  }
  if (/\/kickoff\/activity\/storelimitationList/.test(response.config.url)) {
    response.data.items = response.data.data;
  }

  if (/\/Database\/coupon_component\/selectCity/.test(response.config.url)) {
    let list = response.data.data;
    cityResponceFormat(list);
    response = list;
  }

  return response;
};

export default responseHandleFunc;

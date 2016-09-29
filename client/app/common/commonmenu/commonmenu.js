import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularUiTree from 'angular-ui-tree';
import commonmenuComponent from './commonmenu.component';
import MenuFactory from './commonmenu.factory';

let commonmenuModule = angular.module('commonmenu', [
  uiRouter,
  angularUiTree
])

/* 增加测试数据start */
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";
  let menus = MenuFactory().getMenus();
  _add2Routers(menus);

  function _add2Routers(data){
    data.forEach(function(d, index){

      if(d.url){
        let nextPage = _buildNextPage(data, index);
        $stateProvider
        .state(d.url, {
          url: d.url,
          template: '<div>'+ d.title +'</div>' + '<div><a href=#'+ nextPage.url +'>'+ nextPage.title +'</a></div>'
        });
      }
      if(d.nodes){
        _add2Routers(d.nodes);
      }
    });
  }

  function _buildNextPage(data, index){
    var nextIndex = index;
    while(nextIndex === index){
      nextIndex = Math.floor(Math.random()*data.length);
    }
    return data[nextIndex];
  }

})
/* 增加测试数据end */

.component('commonmenu', commonmenuComponent)
.factory('MenuFactory', MenuFactory);

export default commonmenuModule;
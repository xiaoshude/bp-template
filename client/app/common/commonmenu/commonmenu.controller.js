import angularUiTree from 'angular-ui-tree';
import $ from 'jquery';

let tool = {
  expandMenu: function(menu, menus){
    if(!menu||!menu.id||!menus.length){
      return;
    }
    let menuIds = menu.id.split('-');
    let expandMenu = menus[menuIds.shift()];
    while(expandMenu){
      if(expandMenu.nodes){
        expandMenu.menuCollapsed = false;
      }
      expandMenu = (expandMenu&&expandMenu.nodes) ? expandMenu.nodes[menuIds.shift()] : null;
    }
  },
  collapsMenu: function(menu, menus){
    if(!menu||!menu.id||!menus.length){
      return;
    }
    let menuIds = menu.id.split('-');
    let expandMenu = menus[menuIds.shift()];
    while(expandMenu){
      expandMenu.menuCollapsed = true;
      expandMenu = (expandMenu&&expandMenu.nodes) ? expandMenu.nodes[menuIds.shift()] : null;
    }
  },
  removeMenu: function(menu, menus){
    menus.some(function(m, index){
      if(menu.id&&m.id.indexOf(menu.id)===0){
        menus.splice(index, 1);
        return true;
      }
      return;
    })
  },
  // 如果当前menu没在可是区域，将当前menu放到可视区域
  // 这里应该放在directive里做，现在暂时放到controller
  visibleMenu: function(menu){
    if(!menu||!menu.id){
      return;
    }
    // 计算把当前menu放到可是区域需要打高度
    let menuIds = menu.id.split('-');
    let len = menuIds.length-1;
    let totalHeight = 0;
    menuIds.forEach(function(menuId, index){
      let num = ~~menuId;
      num = index === len ? num : num + 1;
      console.log(num)
      totalHeight += num*(index === 0 ? 50 : 40);
    });
    setTimeout(function(){
      $('#tree-root').scrollTop(totalHeight);
    })
  }
}

class CommonmenuController {


    constructor($location, treeConfig, MenuFactory, $rootScope, $scope) {
        'ngInject';

        this.$location = $location;
        this.$scope = $scope;
        //treeConfig.defaultCollapsed = true;
        this.name = 'commonmenu';
        this.menuDefault = require('./images/default-menu.png');
        this.closeMenuImg = require('./images/close-menu.png');
        this.path = null;
        this.close = false;
        this.preExpandMenu = null;
        this.preExpandMenus = [];

        var menus = MenuFactory.getMenus();
        _filterMenus(menus);
        this.menus = menus;

        function _filterMenus(arr, level = 0, parentIndex) {
            arr.forEach(function (item, index) {
                item.id = (parentIndex ? parentIndex+'-' : '') + index;
                item.level = level;
                item.menuCollapsed = true;
                if (item.nodes) {
                    _filterMenus(item.nodes, level + 1, item.id);
                }
            })
        }

        $rootScope.$on('$locationChangeSuccess', function() {
          this._pathMatchMenus();
        }.bind(this));
    }

    _pathMatchMenus(){

      let path = this.$location.path();
      let menus = this.menus;
      let pathMenu = null;
      if(path!==this.path){

        function _scan(datas){
          return datas.some(function(data){
            if(data.url&&data.url === path){
              pathMenu = data;
              return true;
            }
            if(data.nodes){
              return _scan(data.nodes)
            }
            return false;
          });
        }
        _scan(menus);
        
        if(pathMenu){
          this._expandMenu(pathMenu);
        };

        this.path = path;
      }
    }

    _getRelation(menu, preMenu){
      let menuId = menu.id;
      let preMenuId = preMenu.id;
      let relationState = 'prevIs';
      if(menuId.indexOf(preMenuId)===0){
        relationState += 'Parent';
      }else if(preMenuId.indexOf(menuId)===0){
        relationState += 'Child';
      }else{
        relationState += 'Brother';
      }

      return relationState;
    }

    _getState(menu){
      let state = '';
      state += menu.url ? 'isUrl' : 'notUrl';
      state += menu.nodes ? 'hasNode' : 'noNode';
      state += this._getRelation(menu, preMenu);
      return state;
    }


    // 打开点击的menu
    _expandMenu(menu){

      //this._collapsOtherMenu(menu);
      this._collapsAllMenuOnLink(menu);


      this.preExpandMenu = menu;
      this.preExpandMenus.push(menu);

      if(this.close){
        this._expandLinkMenu();
        this.close = false;
      }else{
        let menus = this.menus;
        let expandMenuIds = menu.id.split('-');
        let expandMenu = menus[expandMenuIds.shift()];
        while(expandMenu){
          expandMenu.menuCollapsed = false;
          expandMenu = (expandMenu&&expandMenu.nodes) ? expandMenu.nodes[expandMenuIds.shift()] : null;
        }
      }
      
      if(menu.url){
        tool.visibleMenu(menu);
      }
    }

    // 链接切换时进行关闭，并且只关闭链接
    _collapsLinkMenuOnLink(curMenu){
      if(!curMenu.url){
        return false;
      }
      let preExpandMenus = this.preExpandMenus;
      preExpandMenus.forEach(function(menu){
        if(menu.url){
          menu.menuCollapsed = true;
        }
      })
    }

    _expandLinkMenu(){
      let preExpandMenus = this.preExpandMenus;
      let menus = this.menus;
      preExpandMenus.forEach(function(menu){
        tool.expandMenu(menu, menus);
      })
    }

    // 链接切换时进行关闭，关闭所有打开的menu
    _collapsAllMenuOnLink(curMenu){
      if(!curMenu.url){
        return false;
      }
      let preExpandMenus = this.preExpandMenus;
      let menus = this.menus;

      let menu = preExpandMenus.shift();
      while(menu){
        tool.collapsMenu(menu, menus);
        menu = preExpandMenus.shift();
      }
    }

    // 只要和当前点击的菜单不是父子关系就关闭
    _collapsOtherMenu(menu){
      let preMenu = this.preExpandMenu;
      tool.collapsMenu(preMenu, this.menus);
      return;
      if(!preMenu){
        return;
      }

      let preMenuId = preMenu.id;
      let menuId = menu.id;
      
      if(preMenuId===menuId){
        return;
      }else{
        if(preMenuId.length!==menuId.length){
          
          let smaleId = menuId;
          let bigId = preMenuId;

          if(smaleId.length>bigId.length){
            let tempId = smaleId;
            smaleId = bigId;
            bigId = tempId;
          }
          if(bigId.indexOf(smaleId)===0){
            return;
          }
        }
      }

      let menus = this.menus;
      let expandMenuIds = preMenu.id.split('-');
      let expandMenu = menus[expandMenuIds.shift()];
      while(expandMenu){
        expandMenu.menuCollapsed = true;
        expandMenu = (expandMenu&&expandMenu.nodes) ? expandMenu.nodes[expandMenuIds.shift()] : null;
      }
    }

    _closeAll(){
      let menus = this.menus;
      menus.forEach(function(menu){
        menu.menuCollapsed = true;
      });
    }

    nodeClick(node) {
    
      // 当前状态是闭合，关闭上个menu，打开当前menu
      if(node.menuCollapsed===true){
        this._expandMenu(node);
      // 当前状态是打开，直接关闭
      }else{
        if(node.nodes){
          node.menuCollapsed = true;
          tool.removeMenu(node, this.preExpandMenus);
        }
      }

      if (node && node.url) {
          this.path = node.url;
          this.$location.path(node.url);
      } else {
        //this.$scope.$broadcast('angular-ui-tree:expand-all');
        //this.menus[0].menuCollapsed = false;
        //scope.toggle();
        //this._expandMenu(node);
      }
    }

    closeMenu(){
      this.close=!this.close;
      if(this.close){
        this._closeAll();
      }else{
        //this._expandMenu(this.preExpandMenu);
        this._expandLinkMenu();
      }
    }

}

export default CommonmenuController;

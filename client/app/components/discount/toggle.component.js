class ToggleController {
 
  constructor($location) {
    "ngInject";
    //console.log('url',console.log($location.url()));
    this.toggles = [
     {url:"/#/discount/add/",name:"活动信息"},
     {url:"/#/discount/rule/",name:"活动规则"},
     {url:"/#/discount/budget/",name:"预算控制"} 
    ];


  }

}

export default {
  bindings: {},
  template: `
    <ul class="nav nav-tabs" id="navtab">
      <li ng-repeat="item in vm.toggles">
        <a ng-href="{{item.url}}" data-toggle="tab">{{item.name}}</a>
      </li>
    </ul>
  `,
  controller: ToggleController,
  controllerAs: 'vm'
}

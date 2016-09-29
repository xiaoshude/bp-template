//logo图片
import logo from './images/logo.jpg';
import { common } from '../../services/data-interface';

class CommonheaderController {

  constructor($location,$scope) {
  	'ngInject';
	var data = common.getHeader();
	this.location = $location;
    this.userName = data.userName;
    this.groupName = data.groupName;
    this.last5LoginIp = data.last5LoginIp;
    this.image = logo;
    var searchData = common.getSearch();
    this.searchData = searchData;
    $scope.headertitle = "飞凡平台";
  	$scope.$watch('greeting',function(news,olds){
  		if(!news){
  			return;
  		}
  		this.searchData = common.getSearch(news);

	},true);
	$scope.choiseValue = function(value){
		$scope.headertitle = value;
	}
  }
	toggle() {

	}
}

export default CommonheaderController;

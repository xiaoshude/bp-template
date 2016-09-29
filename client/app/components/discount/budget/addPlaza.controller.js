class AddPlazaController {
  constructor($scope,$uibModalInstance,NgTableParams,$filter,Api,activityId) {
  	'ngInject';

  	 var vm = {

         };

    //获取所有的广场列表
    Api.get('activity/getplazalist?limit=9999999&activityId='+activityId).then(function(data){
        $scope.tableParams = new NgTableParams({
            page: 1, // show first page
            count: 10,
            filter:$scope.filters
          }, {
            counts:[],
            filterDelay: 0,
            dataset: data
        });
     })

    //翻页时干掉之前选中的状态
    $scope.$watch(function(){
      return $scope.tableParams && $scope.tableParams.data;
    },function(newVal,oldVal){
      if(newVal){
         if(vm.selectedAll){
            vm.selectedAll = false;
         }
         angular.forEach($scope.tableParams.data,function(item,index){
             item.selected = false;
         })
      }
      
    });

    //全选
    vm.selectAll = function(){
        if(vm.selectedAll) {
            vm.selectedAll = true;
        }else{
            vm.selectedAll = false;
        }
        angular.forEach($scope.tableParams.data, function (item,index) {
            if(item.status == 0){
               item.selected = vm.selectedAll;
            }
        })
    }

    //保存广场
    vm.addSubmit = function(addForm){
      var params = {};
      var plazasParams = [];
      angular.forEach($scope.tableParams.data,function(item,index){
        if(item.selected){
          plazasParams.push({
            plazaId:item.id,
            plazaName:item.name
          });
        }
      })

      if(plazasParams.length == 0){
        alert('请至少选择一个广场');
        return;
      }

      params = {
        activityId:activityId,
        budgets:angular.toJson(plazasParams)
      };

      console.log('预算广场参数',params);

      //保存需要设置预算的广场
      Api.post('budget/batchaddactivityplaza',params).then(function(data){
        console.log('预算的广场返回的参数',data);
        $uibModalInstance.close(data);
      })

    }

    vm.close = function() {
      $uibModalInstance.dismiss('close');
    }

    $scope.filters = {
      name:''
    }



  	 $scope.vm = vm;
  }

}

export default AddPlazaController;

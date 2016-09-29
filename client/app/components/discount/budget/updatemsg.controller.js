class UpdatemsgController {
  constructor($scope,$uibModalInstance) {
  	 'ngInject';

     
    setTimeout(function() {
      $uibModalInstance.dismiss('close');
    },1000)

  }

}

export default UpdatemsgController;

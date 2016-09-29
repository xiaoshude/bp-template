class DetailruleController {
  /**
   * @constructor
   */
  constructor($state, Api) {
    'ngInject';
    this.detailMode = true;

    let activityId = $state.params.id;

    Api.get('activity/rule', {activityId})
      .then(response => {
        this.info = response;
      });
  }
}

export default DetailruleController;

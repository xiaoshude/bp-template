/**
 * 满减活动的详情
 * @author fengpeng
 */

"use strict";

/**
 * @class
 */
export default class DetailController {
  /**
   * @constructor
   */
  constructor($state, Api) {
    'ngInject';

    this._Api = Api;
    this.readonly = false;

    /**
     * 页面里有链接要用这个id做跳转
     * @type {int}
     */
    this.activityid = $state.params.id;
    this.getDetailInformation($state.params.id);
  }

  /**
   *
   * @param id
   */
  getDetailInformation(id) {
    console.log('getDetailInformation', id);
    let getInfoPromise = this._Api.get('activity/info', {activityId:id});
    this.cgPromise = getInfoPromise;
    getInfoPromise.then(response => {
      this.fillDataToForm(response);
    });
  }

  fillDataToForm(data) {
    this.name = data.name;
    this.shortTitle = data.shortTitle;
    this.shortTitleBottom = data.shortTitleBottom;
    this.oaNumber = data.oaNumber;
    this.budget = data.budget;
    this.residualBudget = data.residualBudget;
    this.startAt = data.startAt * 1000;
    this.endTime = data.endAt * 1000;
    this.oaBeginTime = data.oaBeginTime;
    this.oaEndTime = data.oaEndTime;
    this.typeName = data.typeName;
    this.tag = data.tag;
    this.description = data.description;
    this.ruleDescription = data.ruleDescription;
    UE.getEditor('activity-edit').setDisabled();
  }
}

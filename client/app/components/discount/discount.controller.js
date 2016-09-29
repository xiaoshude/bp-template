class DiscountController {
  constructor($state) {
    'ngInject'
    let stateName = $state.current.name;
    let id = $state.params.id;
    let navArrOfEdit = [
      {
        name: '活动信息',
        sref: `discount.edit({id:${id}})`
      },
      {
        name: '活动范围',
        sref: `discount.editrange({id:${id}})`
      },
      {
        name: '活动规则',
        sref: `discount.editrule({id:${id}})`
      },
      {
        name: '预算控制',
        sref: `discount.editbudget({id:${id}})`
      }
    ];
    let navArrOfdetail = [
      {
        name: '活动信息',
        sref: `discount.detail({id:${id}})`
      },
      {
        name: '活动范围',
        sref: `discount.detailrange({id:${id}})`
      },
      {
        name: '活动规则',
        sref: `discount.detailrule({id:${id}})`
      },
      {
        name: '预算控制',
        sref: `discount.detailbudget({id:${id}})`
      }
    ];
    let navArrOfadd = [
      {
        name: '活动信息',
        sref: `discount.add`
      },
      {
        name: '活动范围',
        sref: ``
      },
      {
        name: '活动规则',
        sref: ``
      },
      {
        name: '预算控制',
        sref: ``
      }
    ];

    this.title = '编辑活动';
    this.navArr = [];

    if(stateName == 'discount.add'){
      this.title = '创建活动';
      this.navArr = navArrOfadd;
    }else if(stateName == 'discount.edit' ||
      stateName == 'discount.editrange' ||
      stateName == 'discount.editrule'||
      stateName == 'discount.editbudget'){
      this.title = '编辑活动';
      this.navArr = navArrOfEdit;
    }else{
      this.title = '查看活动';
      this.navArr = navArrOfdetail;
    }
  }
}

export default DiscountController;

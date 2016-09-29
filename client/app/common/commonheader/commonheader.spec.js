import CommonheaderModule from './commonheader'
import CommonheaderController from './commonheader.controller';
import CommonheaderComponent from './commonheader.component';
import CommonheaderTemplate from './commonheader.html';

describe('Commonheader', () => {
  let $rootScope, makeController;

  beforeEach(window.module(CommonheaderModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new CommonheaderController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(CommonheaderTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = CommonheaderComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(CommonheaderTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(CommonheaderController);
      });
  });
});

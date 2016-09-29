import DetailruleModule from './detailrule'
import DetailruleController from './detailrule.controller.js';
import DetailruleComponent from './detailrule.component.js';
import DetailruleTemplate from './detailrule.html';

describe('Detailrule', () => {
  let $rootScope, makeController;

  beforeEach(window.module(DetailruleModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new DetailruleController();
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
      expect(DetailruleTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = DetailruleComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(DetailruleTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(DetailruleController);
      });
  });
});

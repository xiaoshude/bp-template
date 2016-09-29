import <%= name %>Component from './component';

let <%= name %>Module = angular.module('<%= name %>', [
])

.component('<%= name %>', <%= name %>Component);

export default <%= name %>Module;

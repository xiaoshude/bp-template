import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularComponent from 'angular-component';
import Common from './common/common';
import Components from './components/components';
import Services from './services/services';
import AppComponent from './app.component';
import uibs from 'angular-ui-bootstrap';
import 'angular-busy/dist/angular-busy';
import 'angular-busy/angular-busy.css';
import Header from 'ffan-bp-header';
import 'bp-admin-skin';
import 'jquery';
import 'bootstrap';
import './lib/ui-grid';
import './lib/ui-grid.css';
import './lib/bootstrap.css';
import './lib/bootstrap-theme.css';
import './lib/select.css';
import './lib/datetimepicker.css';
import './lib/datetimepicker.templates';
import './lib/ueditor.config';
import './lib/ueditor.all';
import './lib/ueditor.parse';
import './lib/angular-ueditor';
import './lib/font-awesome/css/font-awesome.css';
import './lib/angular-busy.css';
import 'checklist-model'
import 'bp-utils'
import 'angular-loading-bar'
import './lib/loading-bar.min.css'
import  './lib/angular-locale_zh-cn.js'

angular.module('app', [
  uiRouter,
  Common.name,
  Components.name,
  Services.name,
  uibs,
  'bp.header',
  'angular-loading-bar',
  'ui.grid',
  'cgBusy',
  'checklist-model',
  'bp.utils'
])

.component('app', AppComponent);

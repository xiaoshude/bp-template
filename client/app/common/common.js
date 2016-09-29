import angular from 'angular';
import Navbar from './navbar/navbar';
import Hero from './hero/hero';
import User from './user/user';

import Menu from 'ffan-bp-menu';
import FormToggle from './formToggle/formToggle'

let commonModule = angular.module('app.common', [
  Navbar.name,
  Hero.name,
  'bp.menu',
  User.name,
  FormToggle.name
]);

export default commonModule;

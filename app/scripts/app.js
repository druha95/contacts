'use strict';

/**
 * @ngdoc overview
 * @name izzlyApp
 * @description
 * # izzlyApp
 *
 * Main module of the application.
 */
angular
  .module('izzlyApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'GmailContacts',
        controllerAs: 'gmail'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

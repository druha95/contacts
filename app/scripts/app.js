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
      .when('/gmail', {
        templateUrl: '../views/gmail.html',
        controller: 'GmailContacts',
        controllerAs: 'gmail'
      })
      .when('/hotmail', {
        templateUrl: '../views/hotmail.html',
        controller: 'HotmailContacts',
        controllerAs: 'hotmail'
      })
      .otherwise({
        redirectTo: '/gmail'
      });
  });

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
        controller: 'GmailCtrl',
        controllerAs: 'gmail'
      })
      .when('/hotmail', {
        templateUrl: '../views/hotmail.html',
        controller: 'HotmailCtrl',
        controllerAs: 'hotmail'
      })
      .when('/yahoo', {
        templateUrl: '../views/yahoo.html',
        controller: 'YahooCtrl',
        controllerAs: 'yahoo'
      })
      .otherwise({
        redirectTo: '/gmail'
      });
  });

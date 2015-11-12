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
    'ngTouch',
    'ui.bootstrap',
    'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        currentTab: 'main'
      })
      .when('/gmail', {
        templateUrl: '../views/gmail.html',
        controller: 'GmailCtrl',
        controllerAs: 'gmail',
        currentTab: 'gmail'
      })
      .when('/hotmail', {
        templateUrl: '../views/hotmail.html',
        controller: 'HotmailCtrl',
        controllerAs: 'hotmail',
        currentTab: 'hotmail'
      })
      .when('/yahoo', {
        templateUrl: '../views/yahoo.html',
        controller: 'YahooCtrl',
        controllerAs: 'yahoo',
        currentTab: 'yahoo'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .run(function($location, $rootScope, $window) {
    var getParamFromLocation = function() {
      var result = {};
      var tmp = [];
      var argumentsArray = Array.prototype.slice.call(arguments);

      location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          for (var i = 0; i < argumentsArray.length; i++) {
            if (tmp[0] == argumentsArray[i]) {
              result[argumentsArray[i]] = decodeURIComponent(tmp[1]);
            }
          }

        });

      if (Object.keys(result).length == 0) {
        return "Not found";
      } else {
        return result;
      }
    }

    var getParams = getParamFromLocation('oauth_token', 'oauth_verifier');
    if(getParams.oauth_token && getParams.oauth_verifier) {
      $window.localStorage.setItem('oauth_token', getParams.oauth_token);
      $window.localStorage.setItem('oauth_verifier', getParams.oauth_verifier);
      $location.path('yahoo');
    }
  })

  .controller('Navbar', ['$scope','$route', function($scope, $route) {

    $scope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
      $scope.currentTab = $route.current.currentTab;
    });

  }]);

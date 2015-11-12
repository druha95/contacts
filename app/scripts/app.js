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

  .controller('Navbar', ['$scope','$mdSidenav', function($scope, $mdSidenav) {
    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();

      // Async lookup for sidenav instance; will resolve when the instance is available
      $mdSidenav(componentId).then(function(instance) {
        $log.debug( componentId + "is now ready" );
      });
// Async toggle the given sidenav;
// when instance is known ready and lazy lookup is not needed.
      $mdSidenav(componentId)
        .toggle()
        .then(function(){
          $log.debug('toggled');
        });
// Async open the given sidenav
      $mdSidenav(componentId)
        .open()
        .then(function(){
          $log.debug('opened');
        });
// Async close the given sidenav
      $mdSidenav(componentId)
        .close()
        .then(function(){
          $log.debug('closed');
        });
// Sync check to see if the specified sidenav is set to be open
      $mdSidenav(componentId).isOpen();
// Sync check to whether given sidenav is locked open
// If this is true, the sidenav will be open regardless of close()
      $mdSidenav(componentId).isLockedOpen();
    };
  }]);

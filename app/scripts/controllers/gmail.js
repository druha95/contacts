'use strict';

/**
 * @ngdoc function
 * @name izzlyApp.controller:GmailCtrl
 * @description
 * # GmailCtrl
 * Controller of the izzlyApp gets contacts list
 * from gmail
 */
angular.module('izzlyApp')
  .controller('GmailCtrl',['$scope','$window', '$http','$timeout',
              function ($scope, $window, $http, $timeout) {

    $scope.applicationData = {};
    $scope.applicationData.clientId = '846336466595-nucqeu94903ddb46iioqnen02u0kefrs.apps.googleusercontent.com';
    $scope.applicationData.apiKey = 'AIzaSyCpRkWJnLzOV1arohiFtn0u4EULkC2acQ8';
    $scope.applicationData.scopes = 'https://www.google.com/m8/feeds';
    $scope.gapi = $window.gapi;

    $scope.contactsList = [];

    $scope.gapi.client.setApiKey($scope.applicationData.apiKey);


    $scope.checkAuth = function() {
      $scope.gapi.auth.authorize({client_id: $scope.applicationData.clientId, scope: $scope.applicationData.scopes, immediate: false}, $scope.handleAuthResult);
    };


    $scope.handleAuthResult = function (authResult) {
      if (authResult && !authResult.error) {
        var url = "https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token=" + authResult.access_token + "&max-results=700&v=3.0";
        $http.get(url).then(
          function(response){
            $scope.contactsList = response;
            debugger;
          }, function(response){
            $scope.contactsList = response;
            debugger;
          });
      }
    };
    $scope.checkAuth();
  }]);

'use strict';

/**
 * @ngdoc function
 * @name izzlyApp.controller:GmailContact
 * @description
 * # GmailContact
 * Controller of the izzlyApp gets contacts list
 * from gmail
 */
angular.module('izzlyApp')
  .controller('GmailContacts',['$scope', function ($scope) {

    $scope.applicationData = {};
    $scope.applicationData.clientId = '846336466595-nucqeu94903ddb46iioqnen02u0kefrs.apps.googleusercontent.com';
    $scope.applicationData.apiKey = 'AIzaSyCpRkWJnLzOV1arohiFtn0u4EULkC2acQ8';
    $scope.applicationData.scopes = 'https://www.google.com/m8/feeds';
    $scope.gapi = angular.copy(window.gapi);

    $scope.contactsList = [];

    $scope.gapi.client.setApiKey($scope.applicationData.apiKey);
    window.setTimeout(checkAuth,100);


    function checkAuth() {
      $scope.gapi.auth.authorize({client_id: $scope.applicationData.clientId, scope: $scope.applicationData.scopes, immediate: false}, handleAuthResult);
    }

    function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        $.get("https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token=" + authResult.access_token + "&max-results=700&v=3.0",
          function(response){
            $scope.contactsList = response;
            debugger;
          });
      }
    }
  }]);

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
  .controller('GmailCtrl',['$scope','$window', '$http','$timeout', 'GmailCache', '$q',
  function ($scope, $window, $http, $timeout, GmailCache, $q) {

    $scope.applicationData = {};
    $scope.applicationData.clientId = '846336466595-nucqeu94903ddb46iioqnen02u0kefrs.apps.googleusercontent.com';
    $scope.applicationData.apiKey = 'AIzaSyCpRkWJnLzOV1arohiFtn0u4EULkC2acQ8';
    $scope.applicationData.scopes = [
      'https://www.google.com/m8/feeds',
      'http://www.google.com/m8/feeds'
    ];
    $scope.gapi = $window.gapi;


    $scope.getList = function() {
      var deferred = $q.defer();
      $scope.gapi.client.setApiKey($scope.applicationData.apiKey);
      $scope.checkAuth = function() {
        $scope.gapi.auth.authorize({client_id: $scope.applicationData.clientId, scope: $scope.applicationData.scopes, immediate: false}, $scope.handleAuthResult);
      };


      $scope.handleAuthResult = function (authResult) {
        if (authResult && !authResult.error) {
          var url = "https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token=" + authResult.access_token + "&max-results=700&v=3.0";
          $http.get(url).then(
            function(response){
              GmailCache.setContactList(response);
              deferred.resolve();
            }, function(err){
              console.log(err);
              deferred.rejected();
            });
        }
      };
      $scope.checkAuth();
      return deferred.promise
    };

    $scope.initializeContacts = function() {
      $scope.getList().then(function() {
        $scope.contactsList = GmailCache.getContactList();
      }, function() {
        console.log('Error');
      });
    };

    $scope.findUser = function() {
      var findedContacts = [];
      $scope.contactsList = GmailCache.getContactList();
      for(var i=0; i<$scope.contactsList.data.feed.entry.length; i++) {
        if($scope.contactsList.data.feed.entry[i].title.$t.indexOf($scope.fulltext_search) != -1) {
          findedContacts.push($scope.contactsList.data.feed.entry[i]);
        }
      }
      $scope.contactsList.data.feed.entry = findedContacts;
    };

    if(!GmailCache.getContactList()) {
      $scope.initializeContacts();
    } else {
      $scope.contactsList = GmailCache.getContactList();
    };


  }]);

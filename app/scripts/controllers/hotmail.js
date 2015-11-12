'use strict';

/**
 * @ngdoc function
 * @name izzlyApp.controller:HotmailCtrl
 * @description
 * # HotmailCtrl
 * Controller of the izzlyApp which gets
 * list of contacts from hotmail
 */
angular.module('izzlyApp')
  .controller('HotmailCtrl',['$scope', '$window', '$q', 'HotmailCache', function ($scope, $window, $q, HotmailCache) {

    $scope.WL = window.WL;

    $scope.initData = {};
    $scope.initData.client_id = '0000000040173F6C';
    $scope.initData.redirect_uri = 'http://localhost:9000/';
    $scope.initData.scopes = ["wl.basic", "wl.contacts_emails"];

    $scope.getList = function() {
      var deffered = $q.defer();
      $scope.WL.init({
        client_id: $scope.initData.client_id,
        redirect_uri: $scope.initData.redirect_uri,
        scope: $scope.initData.scopes,
        response_type: "token"
      });

      $scope.WL.login({
        scope: $scope.initData.scopes
      }).then(function (response) {
        $scope.WL.api({
          path: "me/contacts",
          method: "GET"
        }).then(function (response) {
          HotmailCache.setContactList(response);
          deffered.resolve()
        }, function (err) {
          console.log(err);
        });
      }, function (err) {
        console.log(err)
      });
      return deffered.promise
    };

    $scope.initilizeContacts = function() {
      $scope.getList().then(function() {
        $scope.contactsList = HotmailCache.getContactList();
      }, function() {
        console.log('Error');
      });
    };

    $scope.findUser = function() {
      var foundContacts = [];
      $scope.contactsList = HotmailCache.getContactList();
      for(var i=0; i<$scope.contactsList.data.length; i++) {
        if($scope.contactsList.data[i].name.indexOf($scope.fulltext_search) != -1) {
          foundContacts.push($scope.contactsList.data[i]);
        }
      }
      $scope.contactsList.data = foundContacts;
    };




    if(!HotmailCache.getContactList()) {
      $scope.initilizeContacts();
    } else {
      $scope.contactsList = HotmailCache.getContactList();
    };

  }]);

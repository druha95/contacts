'use strict';

/**
 * @ngdoc function
 * @name izzlyApp.controller:HotmailContacts
 * @description
 * # HotmailContacts
 * Controller of the izzlyApp which gets
 * list of contacts from hotmail
 */
angular.module('izzlyApp')
  .controller('HotmailContacts',['$scope', '$window', function ($scope, $window) {

    $scope.WL = window.WL;

    $scope.initData = {};
    $scope.initData.client_id = '0000000040173F6C';
    $scope.initData.redirect_uri = 'http://localhost:9000/';
    $scope.initData.scopes = ["wl.basic", "wl.contacts_emails"];



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
          debugger;
        }, function (err) {
            console.log(err);
        });
    }, function (err) {
      console.log(err)
    });

  }]);

/**
 * Created by andrew on 10.11.15.
 */

/**
 * @ngdoc function
 * @name izzlyApp.controller:YahooCtrl
 * @description
 * # YahooCtrl
 * Controller of the izzlyApp gets contacts list
 * from yahoo
 * */

angular.module('izzlyApp')
  .controller('YahooCtrl', ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {

    $scope.makeRandomString = function() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 33; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    };

    $scope.data = {
      oauth_nonce:$scope.makeRandomString(),
      oauth_timestamp:new Date().valueOf()+1,
      oauth_consumer_key:'dj0yJmk9Q0VodzdhbWs4RXhyJmQ9WVdrOU1uTjZSalpCTjJjbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD00MA--',
      oauth_signature_method:'plaintext',
      oauth_signature:'5b52b2c4418c96cbbc68cefce1d7f3856b5400c2&',
      oauth_version:'1.0',
      xoauth_lang_pref:"en-us",
      oauth_callback:"http://www.localhost"
    };

    $scope.decodeToken = function(str) {
      var obj={};
      var keyValueArr = str.split('&');
      angular.forEach(keyValueArr, function(item) {
        var keyValue = item.split('=');
        obj[keyValue[0]] = keyValue[1];
      })
      return obj;
    };

  $http({
    method: "GET",
    url:'https://api.login.yahoo.com/oauth/v2/get_request_token',
    params: $scope.data
    }).then(function(data) {

    $scope.tokenData = $scope.decodeToken(data.data);
    $http({
      method: "GET",
      url:"https://api.login.yahoo.com/oauth/v2/request_auth",
      params: {
        oauth_token: $scope.tokenData.oauth_token
      }
    }).then(function(data) {
      var uibModalInstance = $uibModal.open({
        template: data.data,
        controller: 'YahooLoginCtrl'
      });
    }, function(err) {
    })
  }, function(err) {
    console.log(err)
  })

  }]);

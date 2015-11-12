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
  .controller('YahooCtrl', ['$scope', '$http', '$uibModal', '$rootScope', '$location', '$window', '$cookies',
    function($scope, $http, $uibModal, $rootScope, $location, $window, $cookies) {
      $scope.makeRandomString = function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < possible.length; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      };

      $scope.decodeToken = function(str) {
        var obj={};
        var keyValueArr = str.split('&');
        angular.forEach(keyValueArr, function(item) {
          var keyValue = item.split('=');
          obj[keyValue[0]] = keyValue[1];
        });
        return obj;
      };




      if($window.localStorage.getItem('oauth_verifier') && $window.localStorage.getItem('oauth_token')){
      window.location.search='';
      $http({
        url:'https://api.login.yahoo.com/oauth/v2/get_token',
        method: 'GET',
        params: {
          oauth_consumer_key: 'dj0yJmk9TU9GdERwZ0NxN2NZJmQ9WVdrOWNWTk9VR0pZTlRRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD02Zg--',
          oauth_signature_method: 'PLAINTEXT',
          oauth_version:'1.0',
          oauth_verifier: $window.localStorage.getItem('oauth_verifier'),
          oauth_token: $window.localStorage.getItem('oauth_token'),
          oauth_nonce: $scope.makeRandomString(),
          oauth_timestamp:new Date().valueOf()+1,
          oauth_signature:'18b51824ee4f0b876d79a51a6571c2868f538322&'+ $window.localStorage.getItem('secret_token')
        }
      }).then(function(data) {
        $scope.newStepData = $scope.decodeToken(data.data);
        $http({
          url:'https://api.login.yahoo.com/oauth/v2/get_token',
          method: 'GET',
          params: {
            oauth_consumer_key: 'dj0yJmk9TU9GdERwZ0NxN2NZJmQ9WVdrOWNWTk9VR0pZTlRRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD02Zg--',
            oauth_signature_method: 'PLAINTEXT',
            oauth_version:'1.0',
            oauth_session_handle: $scope.newStepData.oauth_session_handle,
            oauth_token: $scope.newStepData.oauth_token,
            oauth_nonce: $scope.makeRandomString(),
            oauth_timestamp:new Date().valueOf()+1,
            oauth_signature:'18b51824ee4f0b876d79a51a6571c2868f538322&'+ $scope.newStepData.oauth_token_secret
          }
        }).then(function(data) {
          debugger;
          $scope.guidObject = $scope.decodeToken(data.data);
          $http({
            url:'https://social.yahooapis.com/v1/user/'+$scope.guidObject.xoauth_yahoo_guid +'/contacts',
            method: 'GET',
            withCredentials: true,
            headers: {
              oauth_token: $scope.newStepData.oauth_token
            },
            params: {
              oauth_token: $scope.newStepData.oauth_token
            }
          }).then(function(data) {
            console.log(data);
            //$scope.contacts = $scope.decodeToken(data.data);
            debugger;
          }, function(err) {
            debugger;
          });
          debugger;
        }, function(err) {
          debugger;
        })
      }, function(err) {
        debugger;
      });

    } else {
      $scope.data = {
        oauth_nonce:$scope.makeRandomString(),
        oauth_timestamp:new Date().valueOf()+1,
        oauth_consumer_key:'dj0yJmk9TU9GdERwZ0NxN2NZJmQ9WVdrOWNWTk9VR0pZTlRRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD02Zg--',
        oauth_signature_method:'plaintext',
        oauth_signature:'18b51824ee4f0b876d79a51a6571c2868f538322&',
        oauth_version:'1.0',
        xoauth_lang_pref:"en-us",
        oauth_callback:"http://www.localhost:9000/"
      };

      $http({
        method: "GET",
        url:'https://api.login.yahoo.com/oauth/v2/get_request_token',
        params: $scope.data
      }).then(function(data) {
        $scope.tokenData = $scope.decodeToken(data.data);
        $window.localStorage.setItem('secret_token', $scope.tokenData.oauth_token_secret);
        debugger;
        $http({
          method: "GET",
          url:"https://api.login.yahoo.com/oauth/v2/request_auth",
          params: {
            oauth_token: $scope.tokenData.oauth_token
          }
        }).then(function(data) {
          debugger;
          var htmlStr = data.data.replace('action="/oauth/v2/request_auth"', 'action="https://api.login.yahoo.com/oauth/v2/request_auth"');
          var htmlStr = htmlStr.replace('action="/config/login', 'action="https://login.yahoo.com/config/login');
          //var htmlStr = htmlStr.replace('type="submit"', 'type="button" ng-click="sendForm()"');
          //var htmlStr = htmlStr.replace('<form', '<form ng-submit="submitHandler($event)" ');
          ////var htmlStr = htmlStr.replace('</form', '</ng-form');
          var uibModalInstance = $uibModal.open({
            template: htmlStr,
            controller: 'YahooLoginCtrl',
            resolve: {
              data: $scope.tokenData
            }
          });
        }, function(err) {
        })
      }, function(err) {
        console.log(err)
      })
    }



  }]);

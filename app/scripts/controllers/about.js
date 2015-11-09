'use strict';

/**
 * @ngdoc function
 * @name izzlyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the izzlyApp
 */
angular.module('izzlyApp')
  .controller('AboutCtrl', function () {
    WL.init({
      client_id: '0000000040173F6C',
      redirect_uri: 'http://localhost:9000/',
      scope: ["wl.basic", "wl.contacts_emails"],
      response_type: "token"
    });

    WL.login({
      scope: ["wl.basic", "wl.contacts_emails"]
    }).then(function (response)
      {
        WL.api({
          path: "me/contacts",
          method: "GET"
        }).then(
          function (response) {
            debugger;
            //your response data with contacts
            console.log(response.data);
          },
          function (responseFailed) {
            //console.log(responseFailed);
          }
        );

      },
      function (responseFailed)
      {
        //console.log("Error signing in: " + responseFailed.error_description);
      });
  });

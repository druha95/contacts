/**
 * Created by andrew on 11.11.15.
 */

angular.module('izzlyApp')
  .service('GmailCache', function() {
    var _contactList = {};

    return {
      getContactList: function() {
        if(Object.keys(_contactList).length != 0) {
          return angular.copy(_contactList);
        } else {
          return false;
        }
      },
      setContactList: function(contactList) {
        _contactList = angular.copy(contactList);
      }
    }
  });

'use strict';

angular.module('emission.tracemob.inactiveUser', [])
.factory('inactiveUser', function($state, $translate, $ionicPopup, storage, KVStore) {
  var inactiveUser = {};
  inactiveUser.redirectedToIntro = false;

  inactiveUser.check = function(provider) {
    return new Promise(function(resolve, reject) {
      if (inactiveUser.redirectedToIntro !== true) {
        window.cordova.plugins.BEMServerComm.pushGetJSON('/tracemob/checkuuid', function() {},
          function(response) {
            if (response.success === true) {
              resolve(true);
            }
            else if (inactiveUser.redirectedToIntro !== true) {
              inactiveUser.redirectedToIntro = true;
              resolve(false);
              $state.go('root.intro');
              $ionicPopup.alert({
                title: $translate.instant('tracemob.inactiveUser.title'),
                cssClass: 'tracemob-popup',
                template: `
                  <p>${$translate.instant('tracemob.inactiveUser.text-1')}</p>
                  <p>${$translate.instant('tracemob.inactiveUser.text-2')}</p>
                  <br>
                  <p>${$translate.instant('tracemob.inactiveUser.text-3')}</p>
                `
              }).then(function() {
                cordova.plugin.http.clearCookies();
                storage.clearAll();
                KVStore.clearAll();
                window.cordova.plugins.BEMUserCache.clearAll().then(
                  function(result) {
                    console.log('clearAll');
                  },
                  function(error) {
                  }
                );
                window.cordova.plugins.BEMUserCache.invalidateAllCache().then(
                  function(result) {
                    console.log('invalidateAllCache');
                  },
                  function(error) {
                  }
                );
                return false;
              });
            }
          },
          function(error) {
          }
        );
      }
    });
  };

  return inactiveUser;
});

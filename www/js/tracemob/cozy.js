'use strict';

/*import React from 'react'
import ReactDOM from 'react-dom'
import { MobileRouter } from 'cozy-authentication'
import { hashHistory, Route } from 'react-router'

import { useClient } from 'cozy-client'

console.log('MobileRouter');
console.log(MobileRouter);
console.log('hashHistory');
console.log(hashHistory);
console.log('Route');
console.log(Route);
console.log('useClient');
console.log(useClient);

const cozyLoginPage = () => {
  // LoginPage has to be a child of a CozyProvider from cozy-client
  const client = useClient()
  // client will have isLogged === false at first
  return ReactDOM.render(<MobileRouter
    protocol={'mycustomSchema://'}
    appTitle={'TraceMob'}
    universalLinkDomain={'https://links.mycozy.cloud'}
    appSlug={'appname'}
    history={hashHistory}
    onAuthenticated={() => {
      alert('user Authenticated')
      console.log({client}) // client is logged
    }}
    loginPath={'/path/after/successfullLogin'}
    onLogout={() => alert('logout')}
    appIcon={require('icon.png')}
  >
  <Route>
    <Route path="path1" component={...} />
    <Route path="path2" component={...} />
  </Route>
  </MobileRouter>)
}*/

angular.module('emission.tracemob.cozy', [])
.factory('cozy', function($translate, $ionicPopup, storage) {
  var cozy = {};
  cozy.isEnabled = false;
  cozy.shownOnAppFirstLaunchKey = 'tracemob-cozy-shownOnAppFirstLaunch';
  cozy.shownOnAppFirstLaunchValue = 0;
  cozy.isBindedKey = 'tracemob-cozy-isBinded';

  cozy.showDialog = function(fromSettings) {
    if (cozy.isEnabled === true && cozy.isBinded() === false && (fromSettings === true || storage.get(cozy.shownOnAppFirstLaunchKey) !== cozy.shownOnAppFirstLaunchValue)) {
      storage.set(cozy.shownOnAppFirstLaunchKey, cozy.shownOnAppFirstLaunchValue);
      $ionicPopup.confirm({
        title: $translate.instant('tracemob.control.bind-with-cozy-cloud'),
        cssClass: 'tracemob-popup',
        template: `
          <p>${$translate.instant('tracemob.cozy.text-1')}</p>
          <ul>
            <li>${$translate.instant('tracemob.cozy.list-1')}</li>
            <li>${$translate.instant('tracemob.cozy.list-2')}</li>
            <li>${$translate.instant('tracemob.cozy.list-3')}</li>
          </ul>
          <br>
          <p class="bold">${$translate.instant('tracemob.cozy.text-2')}</p>
          <p>${$translate.instant('tracemob.cozy.text-3')}</p>
        `,
        okText: $translate.instant('tracemob.cozy.bind'),
        cancelText: $translate.instant('tracemob.cozy.later')
      }).then(function(result) {
        if (result) {
          cozy.bind();
        }
        return false;
      });
    }
  };

  cozy.bind = function() {
    if (cozy.isEnabled === true) {
      alert('TODO');
      // storage.set(cozy.isBindedKey, true);
    }
  };

  cozy.isBinded = function() {
    return storage.get(cozy.isBindedKey) || false;
  };

  return cozy;
});


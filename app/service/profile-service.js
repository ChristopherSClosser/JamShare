'use strict';

module.exports = [
  '$q',
  '$log',
  '$rootScope',
  '$http',
  '$window',
  'authService',
  function($q, $log, $rootScope, $http, $window, authService) {
    $log.debug('profileService');
    $rootScope.finderloader = true;

    let service = {};

    service.currentUser = function() {

      return authService.getToken()
      .then(token => {
        let config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        return $http.get(`${__API_URL__}/api/profile`, config);
      })
      .then(res => {
        $log.log('success', res.data);
        let user = res.data;
        $rootScope.finderloader = false;

        return user;
      })
      .catch(err =>{
        $log.error('failure', err.message);
        $rootScope.finderloader = false;

        return $q.reject(err);
      });
    };
    $rootScope.finderloader = false;

    return service;
  },
];

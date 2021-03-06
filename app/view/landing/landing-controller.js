'use strict';

require('./_landing.scss');

module.exports = [
  '$log',
  '$location',
  '$rootScope',
  'authService',
  function($log, $location, $rootScope, authService) {
    this.$onInit = () => {
      let url = $location.url();
      $log.log('url', url);
      this.showSignup = url === '/join#signup' || url === '/join';
      $rootScope.finderloader = false;
    };
  },
];

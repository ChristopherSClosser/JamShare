'use strict';

require('./_landing.scss')

module.exports = [
  '$log',
  '$location',
  '$rootScope',
  'authService',
  function LandingController($log, $location, $rootScope, authService) {// eslint-disable-line
    this.$onInit = () => {
      let url = $location.url()
      $log.log('url', url)
      this.showSignup = url === '/join#signup' || url === '/join'
    }
  }
]

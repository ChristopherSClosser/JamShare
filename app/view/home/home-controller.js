'use strict';



module.exports = [
  '$log',
  '$location',
  '$rootScope',
  'authService',
  function($log, $location, $rootScope, authService) {// eslint-disable-line
    this.$onInit = () => {
      let url = $location.url()
      $log.log('url', url)
      this.showSignup = url === '/home' || url === '/home'
    }
  }
]

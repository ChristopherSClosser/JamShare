'use strict'

require('./_profile.scss')

module.exports = [
  '$log',
  '$rootScope',
  '$window',
  '$location',
  'authService',
  'songService',
  function($log, $rootScope, $window, $location, authService, songService) {//eslint-disable-line
    $log.log($rootScope, 'here is the rootScope')
    this.$onInit = () => {
      this.username = songService.signupCtrl.user.username
      $log.debug('ProfileController')
      if(!$window.localStorage.token) {
        authService.getToken()
        .then(
          () => $location.url('/home'),
          () => $location.url('/signup'),
          () => $location.url('/profile')
        )
      }
    }
  }
]

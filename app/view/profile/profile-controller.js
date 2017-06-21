'use strict'

require('./_profile.scss')

module.exports = [
  '$log',
  '$rootScope',
  '$window',
  '$location',
  'profileService',
  'authService',
  'songService',
  function($log, $rootScope, $window, $location, profileService, authService, songService) {//eslint-disable-line
    this.$onInit = () => {
      this.username = authService.currentUser
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

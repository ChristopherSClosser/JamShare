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
      $log.debug('ProfileController')

      console.log(profileService);

      profileService.currentUser()
      .then(user => {
        console.log('scott was here', user)
        this.username = user
      })
      .catch(err => console.error(err))

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

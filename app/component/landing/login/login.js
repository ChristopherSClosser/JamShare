'use strict';

module.exports = {
  template: require('./login.html'),
  controllerAs: 'loginCtrl',
  controller: [
    '$log',
    '$location',
    '$window',
    '$rootScope',
    'authService',
    function($log, $location, $window, $rootScope, authService) {
      this.$onInit = () => {
        $log.debug('LoginController');

        this.title = 'Sign In'

        if(!$window.localStorage.token) {
          authService.getToken()
          .then(
            () => $location.url('/home'),
            () => $location.url('/signup')
          );
        }

        this.login = function() {
          $log.log('loginCtrl.login()')

          authService.login(this.user)
          .then(() => $location.url('/home'))
        };
      };
    }
  ]
};

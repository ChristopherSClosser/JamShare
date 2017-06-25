'use strict';

require('./_splash.scss');

module.exports = [
  '$log',
  '$location',
  '$rootScope',
  'songService',
  function($log, $location, $rootScope, songService) {
    $log.debug('Splash controller');

    this.$onInit = () => {
      let url = $location.url();
      $log.log('url', url);

      this.showSignup = url === '/home' || url === '/home';
      this.allTheSongs = [];

      return songService.fetchAllSongs()
      .then(allSongs => {
        this.allTheSongs = allSongs;

        return allSongs;
      });
    };
  },
];

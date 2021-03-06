'use strict';

require('./_profile.scss');

module.exports = [
  '$log',
  '$window',
  '$location',
  '$rootScope',
  'authService',
  'songService',
  function($log, $window, $location, $rootScope, authService, songService) {
    $log.debug('Splash Controller');

    this.$onInit = () => {
      if(!$window.localStorage.token) {
        authService.getToken()
        .then(
          () => $location.url('/signup'),
          () => $location.url('/profile')
        );
      }
      if(!$window.localStorage.user) {
        this.user = '';
      }
      this.user = localStorage.user;

      this.songs = [];
      this.allTheSongs = [];

      this.fetchSongs = () => {
        $log.log('songService');

        return songService.fetchSongs()
        .then(songs => {
          this.songs = songs;
          this.currentSong = this.songs[0];
          songService.currentSong = this.currentSong;
          $rootScope.finderloader = false;

          // this.user = this.currentSong.username;
          // console.log('this.user', this.user);
        })
        .catch(err => $log.error(err));
      };
      $rootScope.finderloader = false;

      $rootScope.$on('locationChangeSuccess', this.fetchSongs);
      $rootScope.$on('newSongCreated', this.fetchSongs);
      $rootScope.$on('updateCurrentSong', (eve, songId) => {

        for(let i = 0; this.songs.length; i++) {
          if(this.songs[i]._id === songId) {
            this.currentSong = this.songs[i];
            break;
          }
        }
      });
      $rootScope.finderloader = false;

      this.fetchSongs();

      return songService.fetchAllSongs()
      .then(allSongs => {
        this.allTheSongs = allSongs;
        $rootScope.finderloader = false;

        return allSongs;
      });
    };
  },
];

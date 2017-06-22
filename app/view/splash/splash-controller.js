'use strict'

require('./_splash.scss')

module.exports = [
  '$log',
  '$window',
  '$location',
  '$rootScope',
  'authService',
  'songService',
  function($log, $window, $location, $rootScope, authService, songService) {
    $log.debug('Splash Controller')
    this.$onInit = () => {

      if(!$window.localStorage.token){
        authService.getToken()
        .then(
          () => $location.url('/home'),
          () => $location.url('/signup')
          // () => $location.url('/profile')
        )
      }
      this.songs = []

      this.fetchSongs = () => {
        $log.log(songService)
        return songService.fetchSongs()
        .then(songs => {
          this.songs = songs;
          this.currentSong = this.songs[0];
          songService.currentSong = this.currentSong;
          this.user = this.currentSong.username;

        },
        err => $log.error(err)
        )
      }

      $rootScope.$on('locationChangeSuccess', this.fetchSongs)
      $rootScope.$on('newSongCreated', this.fetchSongs)
      $rootScope.$on('updateCurrentSong', (eve, songId) => {
        for(let i = 0; this.songs.length; i++) {
          if(this.songs[i]._id === songId) {
            this.currentSong = this.songs[i]
            break;
          }
        }
      })
      this.fetchSongs();
    }
  }
]

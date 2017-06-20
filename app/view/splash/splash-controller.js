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

      if(!window.localStorage.token){
        authService.getToken()
        .then(
          () => $location.url('/home'),
          () => $location.url('/signup'),
          () => $location.url('/profile')
        )
      }
      this.songs = []

      this.fetchSongs = () => {
        $log.log(songService)
        return songService.fetchsongs()
        .then(songs => {
          this.songs = songs
          this.currentSong = songs[0]
        },
        err => $log.error(err)
        )
      }
      this.fetchSongs()

      $rootScope.$on('locationChangeSuccess', this.fetchSongs)
      $rootScope.$on('newSongCreated', this.fetchSongs)
      $rootScope.$on('updateCurrentSong', (eve, songId) => {
        for(let i = 0; this.pics.length; i++) {
          if(this.pics[i]._id === songId) {
            this.currentSong = this.songs[i]
            break
          }
        }
      })
    }
  }
]

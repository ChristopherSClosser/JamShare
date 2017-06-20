'use strict'

require('./_home.scss')

module.exoprts = [
  '$log',
  '$rootScope',
  '$window',
  '$location',
  'authService',
  'songService',
  function($log, $rootScope, $window, $location, authService, songService) {
    this.$onInit = () => {
      $log.debug('HomeController()')
      if(!window.localStorage.token){
        authService.getToken()
        .then(
          () => $location.url('/home'),
          () => $location.url('/signup')
        )
      }
      this.songs = []

      this.fetchSongs = () => {
        return songService.fetchSongs()
        .then(songs => {
          this.songs = songs
          this.currentSong = songs[0]
        },
        err => $log.error(err)
        )
      }
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
      return this.fetchSongs()
    }
  }
]

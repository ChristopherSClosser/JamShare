'use strict';



module.exports = [
  '$log',

  '$location',
  '$rootScope',
  'songService',
  function($log, $location, $rootScope, songService) {// eslint-disable-line
    this.$onInit = () => {
      let url = $location.url()
      $log.log('url', url)
      this.showSignup = url === '/home' || url === '/home'

      // this.fetchAllSongs = () => {
      //   $log.log(songService)
      //   return songService.fetchAllSongs()
      // }
      this.allTheSongs = []
      this.getAllSongs = () => {
        return songService.fetchAllSongs()
        .then(allTheSongs => {
          this.allTheSongs = allTheSongs;
          this.currentSong = this.allTheSongs[0]
          songService.currentSong = this.currentSong
          this.user = this.currentSong.user
        },
        err => $log.error(err)
      )
      }
      $rootScope.$on('locationChangeSuccess', this.fetchAllSongs)
      $rootScope.$on('newSongCreated', this.fetchAllSongs)
      $rootScope.$on('updateCurrentSong', (eve, songId) => {
        for(let i = 0; this.allTheSongs.length; i++) {
          if(this.allTheSongs[i]._id === songId) {
            this.currentSong = this.allTheSongs[i]
            break;
          }
        }
      })
      this.fetchAllSongs()
    }
  }
]

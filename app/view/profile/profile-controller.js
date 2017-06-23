'use strict'

require('./_profile.scss')

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
          // () => $location.url('/home'),
          () => $location.url('/signup'),
          () => $location.url('/profile'),
        )
      }
      this.songs = []
      this.allTheSongs = []

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

      return songService.fetchAllSongs()
      .then(allSongs => {
        this.allTheSongs = allSongs
        console.log('elements', allSongs[4].elements[0]);

        console.log('root', $rootScope.allSongs);
        console.log('flerg', allSongs);
        return allSongs
      })
    }
  }
]

// 'use strict'
//
// require('./_profile.scss')
//
// module.exports = [
//   '$log',
//   '$rootScope',
//   '$window',
//   '$location',
//   'profileService',
//   'authService',
//   'songService',
//   function($log, $rootScope, $window, $location, profileService, authService, songService) {//eslint-disable-line
//     this.$onInit = () => {
//       $log.debug('ProfileController')
//
//
//       profileService.currentUser()
//       .then(user => {
//         this.username = user
//       })
//       .catch(err => console.error(err))
//
//       if(!$window.localStorage.token) {
//         authService.getToken()
//         .then(
//           // () => $location.url('/home'),
//           () => $location.url('/signup'),
//           () => $location.url('/profile')
//         )
//       }
//     }
//   }
// ]

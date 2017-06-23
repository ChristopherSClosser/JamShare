// 'use strict';
//
// module.exports = [
//   '$log',
//
//   '$location',
//   '$rootScope',
//   'songService',
//   function($log, $location, $rootScope, songService) {// eslint-disable-line
//     this.$onInit = () => {
//       let url = $location.url()
//       $log.log('url', url)
//       this.showSignup = url === '/home' || url === '/home'
//
//       this.allTheSongs = []
//
//
//       return songService.fetchAllSongs()
//       .then(allSongs => {
//         this.allTheSongs = allSongs
//         // console.log('elements', allSongs[4].elements[0]);
//
//         // console.log('root', $rootScope.allSongs);
//         // console.log('flerg', allSongs);
//         return allSongs
//       })
//     }
//   }
// ]

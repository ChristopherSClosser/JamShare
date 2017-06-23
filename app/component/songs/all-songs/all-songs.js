// module.exports = [
//   '$log',
//   '$location',
//   '$rootScope',
//   'songService',
//   function($log, $location, $rootScope, songService) {// eslint-disable-line
//     this.$onInit = () => {
//       let allSongs = []
//
//       songService.fetchAllSongs()
//       .then(res => allSongs.push(res.data))
//       console.log('allsongs', allSongs);
//     }
//   }
// ]
// 'use strict';
//
// // require('./_song-item.scss');
//
// module.exports = {
//   template: require('./song-item.html'),
//   controllerAs: 'songItemCtrl',
//   bindings: {
//     song: '<',
//     allSongs: '<',
//   },
//   controller: ['$log', '$rootScope', 'songService', function($log, $rootScope, songService){
//     this.$onInit = () => {
//       console.log('hello world');
//       $log.debug('allSongs Item Controller');
//       console.log('scott was here', this.songs);
//       this.showEditSong = false;
//       this.dayUploaded = new Date();
//
//       this.fetchAllSongs = () => {
//         return songService.fetchAllSongs();
//       }
//     };
//   }],
// }

'use strict';

require('./_song-item.scss');

module.exports = {
  template: require('./song-item.html'),
  controllerAs: 'songItemCtrl',
  bindings: {
    song: '<',
    allSongs: '<',
  },
  controller: ['$log', '$rootScope', 'songService', function($log, $rootScope, songService){

    this.$onInit = () => {
      console.log('hello world');
      $log.debug('Song Item Controller');
      console.log('this', this.song.elements);
      this.showEditSong = false;
      this.dayUploaded = new Date();

      this.fetchAllSongs = () => {
        // $rootScope.finderloader = false;
        return songService.fetchAllSongs();
      };

      this.deleteSong = () => {
        // $rootScope.finderloader = false;
        return songService.deleteSong(this.song._id);
      };
    };
  }],
};

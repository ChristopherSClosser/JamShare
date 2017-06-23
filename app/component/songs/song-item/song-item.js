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
      console.log('scott was here', this.songs);
      this.showEditSong = false;
      this.dayUploaded = new Date();

      this.deleteSong = () => {
        return songService.deleteSong(this.song._id);
      };
    };
  }],
}

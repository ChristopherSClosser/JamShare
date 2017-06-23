'use strict';

require('./_song-item.scss');

module.exports = {
  template: require('./song-item.html'),
  controllerAs: 'songItemCtrl',
  bindings: {
    song: '<',

  },
  controller: ['$log', '$rootScope', 'songService', function($log, $rootScope, songService){
    this.$onInit = () => {
      $log.debug('Song Item Controller');

      this.showEditSong = false;
      this.dayUploaded = new Date();

      this.deleteSong = () => {
        return songService.deleteSong(this.song._id);
      };
    };
  }],
}

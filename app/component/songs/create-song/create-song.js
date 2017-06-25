'use strict';

require('./_create-song.scss');

module.exports = {
  template: require('./create-song.html'),
  controllerAs: 'createSongCtrl',
  controller: ['$log', 'songService', function($log, songService){
    this.$onInit = () => {
      $log.debug('Create Song Controller');
      this.song = {};

      this.createSong = () => {
        return songService.createSong(this.song)
        .then(() => {
          let res = this.song;
          this.song.name = null;
          this.song.desc = null;

          return res;
        })
        .catch(err => $log.error(err));
      };
    };
  }],
};

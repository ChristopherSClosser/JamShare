'use strict'

require('./_edit-song.scss')

module.exports = {
  template: require('./edit-song.html'),
  controllerAs: 'editSongCtrl',
  bindings: {
    song: '<'
  },
  controller: ['$log', 'songService', function($log, songService) {
    this.$onInit = () => {
      $log.debug('editSongCtrl');

      this.updateSong = () => {
        songService.updateSong(this.song._id, this.song)
        .then(
          () => $log.log('updated succesfully'),
          err => $log.error(err)
        )
      }

      this.deleteSong = () => {
        songService.deleteSong(this.song._id)
        .then(
          () => $log.log('deleted successfully'),
          err => $log.error(err)
        )
      }
    }
  }]
}

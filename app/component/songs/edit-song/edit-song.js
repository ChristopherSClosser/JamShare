'use strict'

require('./_edit-song.scss')

module.exports = {
  template: require('./edit-song.html'),
  controllerAs: 'editSongCtrl',
  bindings: {
    elem: '<',
    song: '<'
  },
  controller: ['$q', '$log', 'elemService', 'songService', function($q, $log, elemService, songService) {
    this.$onInit = () => {
      $log.debug('editSongCtrl')

      this.deleteElem = function() {
        $log.debug('editSongCtrl.deleteElem')
        return elemService.deleteElem(this.song, this.elem)
        .then(
          songService.fetchSongs,
          err => $log.error(err)
        )
        .catch($q.reject)
      }
    }
  }]
}

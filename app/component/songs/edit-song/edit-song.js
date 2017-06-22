'use strict'

require('./_edit-song.scss')

module.exports = {
  template: require('./edit-song.html'),
  controllerAs: 'editSongCtrl',
  bindings: {
    element: '<',
    song: '<'
  },
  controller: ['$q', '$log', 'elementService', 'songService', function($q, $log, elementService, songService) {
    this.$onInit = () => {
      $log.debug('editSongCtrl')

      this.deleteelement = function() {
        $log.debug('editSongCtrl.deleteelement')
        return elementService.deleteelement(this.song, this.element)
        .then(
          songService.fetchSongs,
          err => $log.error(err)
        )
        .catch($q.reject)
      }
    }
  }]
}

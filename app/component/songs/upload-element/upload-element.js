'use strict'

require('./_upload-element.scss')

module.exports = {
  template: require('./upload-element.html'),
  controllerAs: 'uploadElementCtrl',
  bindings: {
    song: '<'
  },
  controller: [
    '$log', 'songService', 'elementService', function($log, songService, elementService) {
      this.$onInit = () => {
        $log.debug('uploadElementController initialized')
        this.element = {}

        this.uploadElement = () => {
          // $rootScope.$emit('updateCurrentSong', )
          console.log('here again', songService.currentSong);

          elementService.uploadElement(songService.currentSong, this.element)
          .then(() => {
            console.log('the song', this.song);
            console.log('the element', this.element);
            this.element.name = null
            this.element.desc = null
            this.element.file = null
          },
          err => $log.error(err)
          )
        }
      }
    }
  ]
}

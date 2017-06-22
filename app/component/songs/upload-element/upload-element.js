'use strict'

require('./_upload-element.scss')

module.exports = {
  template: require('./upload-element.html'),
  controllerAs: 'uploadElementCtrl',
  bindings: {
    song: '<'
  },
  controller: [
    '$log', 'elementService', function($log, elementService) {
      this.$onInit = () => {
        $log.debug('uploadElementController initialized')
        this.element = {}

        this.uploadElement = () => {
          console.log('here again', this.song);

          elementService.uploadElement(this.song, this.element)
          .then(() => {
            console.log('the element', this.song);
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

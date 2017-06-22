'use strict'

require('./_upload-element.scss')

module.exports = {
  template: require('./upload-element.html'),
  controllerAs: 'uploadelementCtrl',
  bindings: {
    song: '<'
  },
  controller: [
    '$log', 'elementService', function($log, elementService) {
      this.$onInit = () => {
        $log.log('uploadelementController initialized')
        this.element = {}

        this.uploadelement = () => {
          elementService.uploadelement(this.song, this.element)
          .then(() => {
            this.element.name = null
            this.element.description = null
            this.element.file = null
          },
          err => $log.error(err)
          )
        }
      }
    }
  ]
}

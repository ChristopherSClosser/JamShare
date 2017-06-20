'use strict'

// require('./_upload-element.scss')

module.exports = {
  template: require('./upload-element.html'),
  controllerAs: 'uploadElemCtrl',
  bindings: {
    song: '<'
  },
  controller: [
    '$log', 'elemService', function($log, elemService) {
      this.$onInit = () => {
        $log.log('uploadElemController initialized')
        this.elem = {}

        this.uploadElem = () => {
          elemService.uploadElem(this.song, this.elem)
          .then(() => {
            this.elem.name = null
            this.elem.description = null
            this.elem.hash = null
          },
          err => $log.error(err)
          )
        }
      }
    }
  ]
}

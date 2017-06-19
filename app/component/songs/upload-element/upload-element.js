'use strict'

require('./_upload-element.scss')

module.exports = {
  template: require('./upload-element.html'),
  controllerAs: 'uploadElemCtrl',
  bindings: {
    gallery: '<'
  },
  controller: [
    '$log', 'elemService', function($log, ElemService) {
      this.$onInit = () => {
        $log.log('uploadElemController initialized')
        this.elem = {}

        this.uploadElem = () => {
          ElemService.uploadElem(this.song, this.elem)
          .then(() => {
            this.elem.name = null
            this.elem.description = null
            this.elem.file = null
          },
          err => $log.error(err)
          )
        }
      }
    }
  ]
}

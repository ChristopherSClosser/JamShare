'use strict'

require('./_upload-Elem.scss')

module.exports = {
  template: require('./upload-Elem.html'),
  controllerAs: 'uploadElemCtrl',
  bindings: {
    gallery: '<'
  },
  controller: [
    '$log', 'ElemService', function($log, ElemService) {
      this.$onInit = () => {
        $log.log('uploadElemController initialized')
        this.Elem = {}

        this.uploadElem = () => {
          ElemService.uploadElem(this.gallery, this.Elem)
          .then(() => {
            this.Elem.name = null
            this.Elem.description = null
            this.Elem.file = null
          },
          err => $log.error(err)
          )
        }
      }
    }
  ]
}

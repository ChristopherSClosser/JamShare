'use strict';

require('./_element.scss');

module.exports = {
  template: require('./element.html'),
  controllerAs: 'elementCtrl',
  bindings: {
    elem: '<',
    song: '<',
  },
  controller: [
    '$log',
    'elemService',
    function($log, elemService) {
      this.$onInit = () => {
        $log.debug('elementCtrl');

        this.deleteElem = () => {
          $log.debug('#thumbnailCtrl.deleteElem');

          elemService.deleteElem(this.song, this.elem);
        };
      };
    },
  ],
};

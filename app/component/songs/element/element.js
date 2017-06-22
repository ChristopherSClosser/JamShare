'use strict';

require('./_element.scss');

module.exports = {
  template: require('./element.html'),
  controllerAs: 'elementCtrl',
  bindings: {
    element: '<',
    song: '<',
  },
  controller: [
    '$log',
    'elementService',
    function($log, elementService) {
      this.$onInit = () => {
        $log.debug('elementCtrl');

        this.deleteElem = () => {
          $log.debug('#thumbnailCtrl.deleteElem');

          elementService.deleteElem(this.song, this.element);
        };
      };
    },
  ],
};

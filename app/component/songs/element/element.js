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

        this.deletePic = () => {
          $log.debug('#thumbnailCtrl.deleteelement');

          elementService.deleteelement(this.song, this.element);
        };
      };
    },
  ],
};

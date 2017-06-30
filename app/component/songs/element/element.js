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
    '$rootScope',
    'elementService',
    'songService',
    function($log, $rootScope, elementService, songService) {

      this.$onInit = () => {
        $log.debug('elementCtrl');

        this.deleteElement = () => {
          $log.debug('#elementCtrl.deleteElement');
          $log.log('this.song in elementCtrl', this.element);
          // $rootScope.finderloader = false;

          return elementService.deleteElement(this.element.songID, this.element);
        };
      };
    },
  ],
};

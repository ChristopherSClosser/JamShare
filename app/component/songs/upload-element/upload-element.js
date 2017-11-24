'use strict';

require('./_upload-element.scss');

module.exports = {
  template: require('./upload-element.html'),
  controllerAs: 'uploadElementCtrl',
  bindings: {
    song: '<',
  },
  controller: [
    '$log', '$rootScope', 'songService', 'elementService', function($log, $rootScope, songService, elementService) {

      this.$onInit = () => {
        $log.debug('uploadElementController initialized');

        this.element = {};

        this.uploadElement = () => {
          $rootScope.finderloader = true;

          elementService.uploadElement(songService.currentSong, this.element)
          .then(() => {
            this.element.name = null;
            this.element.desc = null;
            this.element.file = null;
            // $rootScope.finderloader = false;
          },
          err => $log.error(err),
          // $rootScope.finderloader = false

          );
        };
      };
    },
  ],
};

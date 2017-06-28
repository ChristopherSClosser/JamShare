'use strict';

require('./_upload-element.scss');

module.exports = {
  template: require('./upload-element.html'),
  controllerAs: 'uploadElementCtrl',
  bindings: {
    song: '<',
  },
  controller: [
    '$log', 'songService', 'elementService', function($log, songService, elementService) {
      this.$onInit = () => {
        $log.debug('uploadElementController initialized');

        this.element = {};

        this.uploadElement = () => {
          elementService.uploadElement(songService.currentSong, this.element)
          .then(() => {
            this.element.name = null;
            this.element.desc = null;
            this.element.file = null;
          },
          err => $log.error(err)
          );
        };
      };
    },
  ],
};

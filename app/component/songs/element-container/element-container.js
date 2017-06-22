'use strict';

require('./_element-container.scss')

module.exports = {
  template: require('./element-container.html'),
  controllerAs: 'elementContainerCtrl',
  binding: {
    song: '<',
  },
  controller: ['$log', '$rootScope', 'songService', function($log, $rootScope, songService){
    this.$onInit = () => {
      $log.debug('Element Container Controller');
    }
  }]
}

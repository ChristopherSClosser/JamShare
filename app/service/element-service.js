'use strict';

module.exports = [
  '$q',
  '$log',
  '$http',
  'Upload',
  'authService',
  function($q, $log, $http, Upload, authService) {
    $log.debug('Element Service');

    let service = {};

    service.uploadElem = function(song, elem) {
      $log.debug('#elemService.uploadElem');

      return authService.getToken()
      .then(token => {
        let url = `${__API_URL__}/api/song/${song._id}/elem`;// eslint-disable-line
        let headers = {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        };

        return Upload.upload({
          url,
          headers,
          method: 'POST',
          data: {
            name: elem.name,
            desc: elem.desc,
            file: elem.file,
          },
        });
      })
      .then(
        res => {
          song.elems.push(res.data);
          return res.data;
        },
        err => {
          $log.error(err.message);
          $q.reject(err);
        }
      );
    };

    service.deleteElem = (song, elem) => {
      $log.debug('#elemService.deleteElem');

      return authService.getToken()
      .then(token => {
        let url = `${__API_URL__}/api/song/${song._id}/elem/${elem._id}`; // eslint-disable-line
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json, text/plain, */*',
          },
        };
        return $http.delete(url, config);
      })
      .then(
        () => {
          $log.log('deleted the elem');

          for(let i = 0; i < song.elems.length; i++) {
            if(song.elems[i]._id === elem._id) {
              song.elems.splice(i, 1);
              break;
            }
          }
        },
        err => {
          $log.error(err.message);
          return $q.reject(err);
        }
      );
    };

    return service;
  },
];

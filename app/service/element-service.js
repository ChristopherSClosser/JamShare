'use strict';

module.exports = [
  '$q',
  '$log',
  '$http',
  'Upload',
  'authService',
  function($q, $log, $http, Upload, authService) {
    $log.debug('element Service');

    let service = {};

    service.uploadelement = function(song, element) {
      $log.debug('#elementService.uploadelement');

      return authService.getToken()
      .then(token => {
        let url = `${__API_URL__}/api/song/${song._id}/element`;// eslint-disable-line
        let headers = {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        };

        return Upload.upload({
          url,
          headers,
          method: 'POST',
          data: {
            name: element.name,
            desc: element.desc,
            file: element.file,
          },
        });
      })
      .then(
        res => {
          song.elements.push(res.data);
          return res.data;
        },
        err => {
          $log.error(err.message);
          $q.reject(err);
        }
      );
    };

    service.deleteelement = (song, element) => {
      $log.debug('#elementService.deleteelement');

      return authService.getToken()
      .then(token => {
        let url = `${__API_URL__}/api/song/${song._id}/element/${element._id}`; // eslint-disable-line
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
          $log.log('deleted the element');

          for(let i = 0; i < song.elements.length; i++) {
            if(song.elements[i]._id === element._id) {
              song.elements.splice(i, 1);
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

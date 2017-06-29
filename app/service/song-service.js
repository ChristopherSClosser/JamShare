'use strict';

module.exports = [
  '$q',
  '$log',
  '$http',
  '$rootScope',
  'authService',
  function($q, $log, $http, $rootScope, authService) {
    $log.debug('song Service');

    let service = {};
    service.songs = [];
    service.allSongs = [];

    service.createSong = (song) => {
      $log.debug('service.createsong');

      return authService.getToken()
      .then(token => {
        let config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        return $http.post(`${__API_URL__}/api/song`, song, config);
      })
      .then(res => {
        $log.log('song created');
        let song = res.data;
        service.songs.unshift(song);
        return song;
      })
      .catch(err => {
        $log.error(err.message);
        return $q.reject(err);
      });
    };

    service.deleteSong = (songId) => {
      $log.debug('#songService.deletesong');
      return authService.getToken()
      .then(token => {
        let url = `${__API_URL__}/api/song/${songId}/`
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*',
          },
        };
        return $http.delete(url, config);
      })
      .then(res => {
        $log.log('song deleted');

        service.songs.filter((ele, idx) => {
          if(ele._id === songId) service.songs.splice(idx, 1);
        });

        return res.status;
      })
      .catch(err => {
        $log.error(err.message);

        return $q.reject(err);
      });
    };

    service.fetchAllSongs =() => {
      $log.debug('fetchAllSongs');

      return $http.get(`${__API_URL__}/api/public/songs`)
      .then(res => {
        service.allSongs = res.data;
        return res.data;
      })
      .catch(err => {
        $log.error(err.message);
        $q.reject(err);
      });
    };

    service.fetchSongs = () => {
      $log.debug('#service.fetchSongs');

      return authService.getToken()
      .then(token => {
        let config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        return $http.get(`${__API_URL__}/api/song`, config);
      })
      .then(res => {
        $log.log('songs retrieved');
        service.songs = res.data;
        return res.data;
      })
      .catch(err => {
        $log.error(err.message);
        $q.reject(err);
      });
    };

    service.updateSong = (songId, song) => {
      $log.debug();

      return authService.getToken()
      .then(token => {
        let url = `${__API_URL__}/api/song/${songId}`;
        let config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        return $http.put(url, song, config);
      })
      .then(res => {
        service.songs.forEach((ele, idx) => {
          if(ele._id === res.data._id) service.songs[idx] = res.data;
        });
        return res.data;
      })
      .catch(err => {
        $log.error(err.message);
        return $q.reject(err);
      });
    };

    return service;
  },
];

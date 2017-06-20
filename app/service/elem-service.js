'use strict'

module.exports = [
  '$q', '$log', '$http', 'Upload', 'authService',
  function($q, $log, $http, Upload, authService) {
    $log.debug('Pic Service')

    let service = {}

    service.uploadElem = function(song, elem) {
      $log.debug('#elemService.uploadElem')

      return authService.getToken()
      .then(token => {
        let url = `${__API_URL__}/api/song/${song._id}/elem`// eslint-disable-line
        let headers = {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
        console.log('token set')
        return Upload.upload({
          url,
          headers,
          method: 'POST',
          data: {
            name: elem.name,
            description: elem.description,
            file: elem.file
          }
        })
      })
      .then(res => {
        song.elems.push(res.data)
        console.log(song);
        return res.data
      },
      err => {
        $log.error(err.message)
        $q.reject(err)
      })
    }
    service.deletePic = (song, elem) => {
      $log.debug('#elemService.deletePic')

      return authService.getToken()
      .then(token => {
        let url = `${__API_URL__}/api/song/${song._id}/elem/${elem._id}` // eslint-disable-line
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json, text/plain, */*'
          }
        }
        return $http.delete(url, config)
      })
      .then(
        () => {
          $log.log('elem deleted')

          for(let i = 0; i < song.elems.length; i++) {
            if(song.elems[i]._id === elem._id) {
              song.elems.splice(i, 1)
              break
            }
          }
        },
        err => {
          $log.error(err.message)
          return $q.reject(err)
        }
      )
    }
    return service
  }
]

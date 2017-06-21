'use strict'

module.exports = [
  '$q',
  '$log',
  '$http',
  '$window',
  function($q, $log, $http, $window, profileService) {//eslint-disable-line
    $log.debug('profileService')

    let service = {}

    service.currentUser = function() {

      let url = `${__API_URL__}/api/profile`// eslint-disable-line
      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      return $http.get(url, config)
      .then(res => {
        $log.log('success', res.data)
        return (res.data)
      })
      .catch(err =>{
        $log.error('failure', err.message)
        return $q.reject(err)
      })
    }
    return service
  }
]

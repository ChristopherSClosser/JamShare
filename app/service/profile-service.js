'use strict'

module.exports = [
  '$q',
  '$log',
  '$http',
  '$window',
  'authService',
  function($q, $log, $http, $window, authService) {//eslint-disable-line
    $log.debug('profileService')

    let service = {}
    let token = null

    service.currentUser = function() {

      let url = `${__API_URL__}/api/profile`// eslint-disable-line
      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      return $http.get(url, config)
      .then(res => {
        $log.log('success', res.data)
        let user = res.data
        return user
      })
      .catch(err =>{
        $log.error('failure', err.message)
        return $q.reject(err)
      })
    }
    return service
  }
]

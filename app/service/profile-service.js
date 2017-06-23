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

    service.currentUser = function() {

      return authService.getToken()
      .then(token => {
        let config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        return $http.get(`${__API_URL__}/api/profile`, config)//eslint-disable-line
      })
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

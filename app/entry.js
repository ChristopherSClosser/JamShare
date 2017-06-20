'use strict'

require('./scss/main.scss')

const path = require('path')
const camelcase = require('camelcase')
const pascalcase = require('pascalcase')
const angular = require('angular')
// require('gridfs')
// require('gridfs-stream')
require('angular-oauth2');
require('@uirouter/angularjs')
require('query-string');
require('angular-cookies');

const jamShare = angular.module('jamShare', ['ui.router'])


let context = require.context('./config/', true, /\.js$/)
context.keys().forEach(path => jamShare.config(context(path)))

context = require.context('./view/', true, /\.js$/)
context.keys().forEach(key => jamShare.controller(pascalcase(path.basename(key, '.js')), context(key)))

context = require.context('./service/', true, /\.js$/)
context.keys().forEach(key => jamShare.service(camelcase(path.basename(key, '.js')), context(key)))

context = require.context('./component/', true, /\.js$/)
context.keys().forEach(key => jamShare.component(camelcase(path.basename(key, '.js')), context(key)))

angular.module(['angular-oauth2'])
.run(['OAuth', function(OAuth) {
  OAuth.configure({
    baseUrl: 'https://api.website.com',
    clientId: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET' // optional
  });
}]);

angular.module(['angular-oauth2'])
.config(['OAuthProvider', function(OAuthProvider){
  OAuthProvider.configure({
    baseUrl: 'https://api.github.com',
    clientId: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET'
  })
}])

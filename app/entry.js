'use strict'

require('./scss/main.scss')

const path = require('path')
const camelcase = require('camelcase')
const pascalcase = require('pascalcase')
const angular = require('angular')
require('@uirouter/angularjs')

const jamShare = angular.module('jamShare', ['ui.router'])

let context = require.context('./config/', true, /\.js$/)
context.keys().forEach(path => jamShare.config(context(path)))

context = require.context('./view/', true, /\.js$/)
context.keys().forEach(key => jamShare.controller(pascalcase(path.basename(key, '.js')), context(key)))

context = require.context('./service/', true, /\.js$/)
context.keys().forEach(key => jamShare.service(camelcase(path.basename(key, '.js')), context(key)))

context = require.context('./component/', true, /\.js$/)
context.keys().forEach(key => jamShare.component(camelcase(path.basename(key, '.js')), context(key)))

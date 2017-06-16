'use strict';

const path = require('path');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const angular = require('angular');
require('@uirouter/angularjs');

const cfgram = angular.module('jamshare', ['ui.router']);

let context = require.context('./config/', true, /\.js$/);
context.keys().forEach(key => jamshare.config(context(path)));

context = require.context('./view/', true, /\.js$/);
context.keys().forEach(key => jamshare.controller(pascalcase(path.basename(key, '.js')), context(key)));

context = require.context('./service/', true, /\.js$/);
context.keys().forEach(key => cfgram.service(camelcase(path.basename(key, '.js')), context(key)));

context = require.context('./component/', true, /\.js$/);
context.keys().forEach(key => jamshare.component(camelcase(path.basename(key, '.js')), context(key)));

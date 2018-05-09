'use strict';

var meta = module.parent.require('./meta');

var controllers = require('./lib/controllers');

var plugin = {};

plugin.init = function (params, callback) {
	var router = params.router;
	var hostMiddleware = params.middleware;
	var hostControllers = params.controllers;

	router.get('/admin/plugins/quickstart', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/quickstart', controllers.renderAdminPage);

	plugin.syncSettings(callback);
};

plugin.syncSettings = function (callback) {
	meta.settings.get('quickstart', function (err, settings) {
		if (err) {
			return callback(err);
		}

		plugin.settings = Object.assign((plugin.settings || {}), settings);
		callback();
	});
};

plugin.onSettingsChange = function (data) {
	if (data.plugin === 'quickstart') {
		plugin.settings = Object.assign((plugin.settings || {}), data.settings);
	}
};

plugin.addAdminNavigation = function (header, callback) {
	header.plugins.push({
		route: '/plugins/quickstart',
		icon: 'fa-tint',
		name: 'Quickstart',
	});

	callback(null, header);
};

module.exports = plugin;

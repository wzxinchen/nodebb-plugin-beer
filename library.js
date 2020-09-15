'use strict';

const meta = require.main.require('./meta');
const controllers = require('./lib/controllers');

const plugin = {};

plugin.init = async (params) => {
	const router = params.router;
	const hostMiddleware = params.middleware;
	// const hostControllers = params.controllers;

	router.get('/admin/plugins/quickstart', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/quickstart', controllers.renderAdminPage);

	await plugin.syncSettings();
};

plugin.syncSettings = async () => {
	Object.assign(plugin.settings || {}, await meta.settings.get('quickstart'));
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

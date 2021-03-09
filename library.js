'use strict';

const meta = require.main.require('./src/meta');
const controllers = require('./lib/controllers');

const plugin = {
	_defaults: {},	// set default settings here, if needed
};

plugin.init = async (params) => {
	const { router, middleware/* , controllers */ } = params;
	const routeHelpers = require.main.require('./src/routes/helpers');

	// routeHelpers.setupPageRoute(router, '/quickstart', middleware, [], (req, res) => {
	// 	res.sendStatus(200);
	// });
	routeHelpers.setupAdminPageRoute(router, '/admin/plugins/quickstart', middleware, [], controllers.renderAdminPage);
};

plugin.syncSettings = async () => {
	plugin.settings = Object.assign({}, plugin.settings || plugin._defaults, await meta.settings.get('quickstart'));
};

plugin.onSettingsChange = function (data) {
	if (data.plugin === 'quickstart') {
		plugin.settings = Object.assign({}, plugin.settings || plugin._defaults, data.settings);
	}
};

plugin.addRoutes = async ({ router, middleware, helpers }) => {
	router.get('/quickstart/:param1', middleware.authenticate, (req, res) => {
		helpers.formatApiResponse(200, res, {
			foobar: req.params.param1,
		});
	});
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

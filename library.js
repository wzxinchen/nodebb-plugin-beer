'use strict';

const meta = require.main.require('./src/meta');
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

/**
 * If you wish to add routes to NodeBB's RESTful API, listen to the `static:app.routes` hook.
 * Define your routes similarly to above, and allow core to handle the response via the
 * built-in helpers.formatApiResponse() method.
 *
 * In this example route, the `authenticate` middleware is added, which means a valid login
 * session or bearer token (which you can create via ACP > Settings > API Access) needs to be
 * passed in.
 *
 * To call this example route:
 *   curl -X GET \
 * 		http://example.org/api/v3/plugins/foobar/test \
 * 		-H "Authorization: Bearer some_valid_bearer_token"
 *
 * Will yield the following response JSON:
 * 	{
 *		"status": {
 *			"code": "ok",
 *			"message": "OK"
 *		},
 *		"response": {
 *			"foobar": "test"
 *		}
 *	}
 */
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

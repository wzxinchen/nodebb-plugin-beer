'use strict';

/* globals $, app, socket, define */

define('admin/plugins/quickstart', ['settings', 'uploader', 'admin/modules/colorpicker'], function (settings) {
	var ACP = {};

	ACP.init = function () {
		settings.load('quickstart', $('.quickstart-settings'));
		$('#save').on('click', saveSettings);
	};

	function saveSettings() {
		settings.save('quickstart', $('.quickstart-settings'), function () {
			app.alert({
				type: 'success',
				alert_id: 'quickstart-saved',
				title: 'Settings Saved',
				message: 'Please reload your NodeBB to apply these settings',
				clickfn: function () {
					socket.emit('admin.reload');
				},
			});
		});
	}

	return ACP;
});

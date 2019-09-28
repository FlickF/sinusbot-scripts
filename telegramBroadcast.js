registerPlugin({
	name: 'Telegram Broadcast',
	version: '1.0',
	description: 'This plugin will let a Telegram bot send a message when a user joins the TeamSpeak server.',
	author: 'Frank Flick <frank@flick-it.de>',
	requiredModules: ['http'],
	vars: [{
		name: 'message',
		title: 'The message that should be displayed. (%n = nickname)',
		type: 'string'
	}, {
		name: 'token',
		title: 'Token of Telegram bot',
		type: 'string'
	}, {
		name: 'chatID',
		title: 'Chat ID of Telegram bot',
		type: 'string'
	}]
}, (_, { message, token, chatID }) => {
	/* Core requirements */
	const engine  = require('engine');
	const event   = require('event');

	/* Third party requirements */
	const http    = require('http');

	/* Telegram API URL */
	const apiURL  = 'https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + chatID + '&text=#msg#';

	/**
	 * Send a message to Telegram via Bot.
	 * @param {string} msg The message to send to Telegram.
	 */
	function sendTelegramMessage(msg) {
		http.simpleRequest({
			'method': 'GET',
			'url': encodeURI(apiURL.replace('#msg#', msg))
		}, function(error, response) {
			if (error) {
				engine.log('Error: ' + error);
				return;
			}

			if (response.statusCode !== 200) {
				engine.log('HTTP Error: ' + response.status);
				return;
			}

			engine.log('Message "' + msg + '" to Telegram sent.');
		});
	}

	/**
	 * Event listener on moved clients.
	 */
	event.on('clientMove', ({ client, fromChannel }) => {
		if (client.isSelf() || fromChannel) {
			return;
		}

		const msg = message.replace('%n', client.name());

		sendTelegramMessage(msg);
	});
});

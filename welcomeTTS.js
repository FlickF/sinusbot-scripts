registerPlugin({
	name:        'Welcome TTS!',
	version:     '1.0',
	description: 'Greeting plugin with TTS-Support.',
	author:      'Florian Zier <florianzier@users.noreply.github.com>',
	requiredModules: [],
	vars: [{
		name  : 'messages',
		title : 'Greeting Messages (%n = nickname)',
		type  : 'array',
		vars  : [{
			name        : 'uid',
			title       : 'Users UniqueID',
			type        : 'string',
			placeholder : 'default'
		}, {
			name        : 'message',
			title       : 'Message to display/say',
			type        : 'string',
			placeholder : '%n'
		}]
	}, {
		name    : 'type',
		title   : 'Message type',
		type    : 'select',
		options : [
			'Chat',
			'Poke',
			'TTS'
		]
	}, {
		name        : 'locale',
		title       : 'TTS Locale',
		type        : 'string',
		placeholder : 'en-EN | de-DE'
	}, {
		name  : 'trigger',
		title: 'Trigger always (or only direct join)',
		type  : 'checkbox'
	}]
}, (_, { messages, type, locale, trigger }) => {
	const event   = require('event');
	const audio   = require('audio');
	const backend = require('backend');

	event.on('clientMove', ({ client, fromChannel, toChannel }) => {
			// exclude the bot
			if (client.isSelf()) {
					return false;
			}

			let message = '%n';

			for (const greeting of messages) {
					// pick up any default entry ...
					if (greeting.uid === 'default') {
							message = greeting.message;
					} else if (greeting.uid === client.uid()) {
							// ... or a message for a specific user
							message = greeting.message;
							break;
					}
			}

			// replace variables in the message
			message = message.replace('%n', client.name());


			const botChannel = backend.getCurrentChannel();

			// greet user
			if (!fromChannel || (trigger && toChannel && (toChannel.id() === botChannel.id()))) {
					if (type == 0) {
							client.chat(message);
					} else if (type == 1) {
							client.poke(message);
					} else {
							audio.say(message, locale);
					}
			}
	});
});

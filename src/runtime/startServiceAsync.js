import curry from 'curry';
import handleReefMessage from './handleReefMessage';
import hookNewSocketFlow from './hookNewSocketFlow';

export default async function (config, state) {

	let { bunyan, reefClient, reefService, socketServer } = state;

	bunyan.info('starting up reef client');

	await reefClient.start();

	bunyan.info('hooking reef runners');

	reefService.addRunner('RELAY_MESSAGE', async (cmdParams) => {

		try {

			return await handleReefMessage(config, state, cmdParams);

		} catch (err) {

			bunyan.error(err, 'error while handling reef message');

			throw err;

		}

	});

	bunyan.info('starting up reef service');

	await reefService.start();

	bunyan.info('reef service listening');

	socketServer.on('connection', (socket) => hookNewSocketFlow(config, state, socket));

	bunyan.info('web socket server listening');

}

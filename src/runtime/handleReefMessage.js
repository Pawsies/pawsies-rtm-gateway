import { socketSendAsync } from '../utils';

export default async function (config, state, cmdParams) {

	let { bunyan, socketDirectory } = state;

	bunyan.info('processing [RELAY_MESSAGE] command', cmdParams);

	let { socketId } = cmdParams;

	bunyan.info('searching socket context in directory', { socketId });

	let socketContext = socketDirectory.getSocket(socketId);

	if (!socketContext) {
		throw new Error('No socket found for specified id');
		return;
	}

	let { socket } = socketContext;

	bunyan.info('stringifying message payload');

	let message = JSON.stringify(cmdParams);

	bunyan.info('sending message through socket');

	try {

		await socketSendAsync(socket, message);

		bunyan.info('socket message relayed succesfully');

		return { success: true };

	} catch (err) {

		throw err;

	}

}

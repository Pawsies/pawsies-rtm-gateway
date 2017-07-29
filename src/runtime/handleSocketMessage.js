
export default async function (config, state, socketId, message) {

	let { RTM_ID } = config;

	let { bunyan, reefClient, socketDirectory } = state;

	bunyan.info('handling socket message', { socketId, message });

	let socketContext = socketDirectory.getSocket(socketId);

	let { token, lane } = socketContext;

	let parsedMessage = JSON.parse(message);

	let {
		_command,
		...payload
	} = parsedMessage;

	if (!_command) throw new Error('No _command key specified in socket message');

	bunyan.info('relaying message to reef service', { parsedMessage });

	await reefClient
		.fireAndForget('pawsies-director', lane, _command, {
			token,
			rtmId: RTM_ID,
			socketId: socketId,
			...payload
		});

	bunyan.info('socket message handled succesfully');

}

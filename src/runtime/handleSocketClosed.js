
export default async function (config, state, socketId) {

	let { RTM_ID } = config;

	let { bunyan, reefClient, socketDirectory } = state;

	bunyan.info('processing socket closure', { socketId });

	let socketContext = socketDirectory.getSocket(socketId);

	let { token, lane } = socketContext;

	bunyan.info('sending CHECKOUT_SOCKET command to reef service', { token, lane, socketId, RTM_ID });

	await reefClient
		.fireAndForget('pawsies-director', lane, 'CHECKOUT_SOCKET', {
			token,
			socketId,
			rtmId: RTM_ID
		});

	bunyan.info('removing socket from local directory', { socketId });

	socketDirectory.removeSocket(socketId);

}

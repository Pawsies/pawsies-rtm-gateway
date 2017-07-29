import { parseSocketUrl } from '../utils';

export default async function (config, state, socketId, socket) {

	let { RTM_ID } = config;

	let { bunyan, socketDirectory, reefClient } = state;

	let {
		upgradeReq: {
			url
		}
	} = socket;

	try {

		bunyan.info('parsing socket url', { url })

		let {
			token,
			lane
		} = parseSocketUrl(url);

		bunyan.info('adding socket to local directory', { socketId, lane, token });

		socketDirectory.addSocket(socketId, socket, token, lane);

		bunyan.info('sending CHECKIN_SOCKET command to reef service', { lane, socketId, RTM_ID });

		await reefClient
			.fireAndForget('pawsies-director', lane, 'CHECKIN_SOCKET', {
				token,
				socketId,
				rtmId: RTM_ID
			});

	} catch (err) {

		throw err;

	}

}

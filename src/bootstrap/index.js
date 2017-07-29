import setupBunyanLog from './setupBunyanLog';
import setupReefClientAsync from './setupReefClientAsync';
import setupReefServiceAsync from './setupReefServiceAsync';
import setupSocketServerAsync from './setupSocketServerAsync';
import SocketsDirectory from '../infrastructure/SocketsDirectory';

export async function setupStateAsync(config) {

	let bunyan = setupBunyanLog({
		level: config.LOG_LEVEL || 'info',
		stream: config.LOG_STREAM,
		name: 'pawsies-rtm-gateway'
	});

	let reefClient = await setupReefClientAsync({
		region: config.AWS_REGION,
		accessKeyId: config.AWS_ACCESSKEYID,
		secretAccessKey: config.AWS_SECRETACCESSKEY,
		clientDomain: 'pawsies-rtm-gateway',
		clientLane: config.RTM_ID
	}, bunyan);

	let reefService = await setupReefServiceAsync({
		region: config.AWS_REGION,
		accessKeyId: config.AWS_ACCESSKEYID,
		secretAccessKey: config.AWS_SECRETACCESSKEY,
		serviceDomain: 'pawsies-rtm-gateway',
		serviceLane: config.RTM_ID
	}, bunyan);

	let socketServer = await setupSocketServerAsync({
		port: config.PORT
	}, bunyan);

	let socketDirectory = new SocketsDirectory();

	return { bunyan, reefClient, reefService, socketServer, socketDirectory };

}

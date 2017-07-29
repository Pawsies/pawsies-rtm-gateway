import { Server } from 'ws';

export default async function (config, bunyan) {

	const { port } = config;

	bunyan.info('setting up socket server');

	return new Server({ port: config.port });

}

import dotenv from 'dotenv';

import { setupStateAsync } from './bootstrap';
import { startServiceAsync } from './runtime';

async function start() {

	dotenv.load({ silent: true });

	const config = {
		LOG_LEVEL: process.env.LOG_LEVEL || 'info',
		LOG_STREAM: process.stdout,
		AWS_REGION: process.env.AWS_REGION,
		AWS_ACCESSKEYID: process.env.AWS_ACCESSKEYID,
		AWS_SECRETACCESSKEY: process.env.AWS_SECRETACCESSKEY,
		RTM_ID: process.env.RTM_ID,
		PORT: process.env.PORT			
	};

	let state = await setupStateAsync(config);

	await startServiceAsync(config, state);

}

start().catch((err) => {
	console.error(err);
	console.error(err.stack);
	process.exit(1);
});

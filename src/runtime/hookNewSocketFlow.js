import uuid from 'node-uuid';
import handleSocketOpened from './handleSocketOpened';
import handleSocketMessage from './handleSocketMessage';
import handleSocketClosed from './handleSocketClosed';

export default async function (config, state, socket) {

  let { bunyan } = state;

	let socketId = uuid.v1();

	try {

		await handleSocketOpened(config, state, socketId, socket);

		socket.on('close', async () => {

      try {

        await handleSocketClosed(config, state, socketId);

      } catch (err) {

        bunyan.error(err, 'error while closing socket');

      }

    });

		socket.on('message', async (message) => {

      try {

        await handleSocketMessage(config, state, socketId, message);

      } catch (err) {

        bunyan.error(err, 'error while handling socket message');

      }

    });

	} catch (err) {

		bunyan.error(err, 'error while hooking new socket');

	}

}

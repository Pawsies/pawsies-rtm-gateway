	
export default function (socket, message) {

  	return new Promise((resolve, reject) => {

			socket.send(message, (err) => {

				if (err) {
					reject(err);
					return;
				}

				resolve();

			});

	});

}

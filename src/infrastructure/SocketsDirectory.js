import HashTable from 'hashtable';

export default class SocketsDirectory {

	constructor() {
		this._table = new HashTable();
	}

	addSocket(id, socket, token, lane) {
		this._table.put(id, { socket, token, lane });
	}

	removeSocket(id) {
		this._table.remove(id);
	}

	getSocket(id) {
		return this._table.get(id);
	}

}

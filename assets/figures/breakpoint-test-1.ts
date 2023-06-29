export default function () {
	const domain = __ENV.HOSTNAME || 'localhost:4000';
	const prefix = __ENV.PROD ? 'wss' : 'ws';
	const url = `${prefix}://${domain}/socket.io/?EIO=4&transport=websocket`;

	const socket = new K6SocketIo(url);
	socket.setOnConnect(() => onConnect(socket));
	socket.connect();

	socket.on('error', () => {
		CounterErrors.add(1);
	});
}

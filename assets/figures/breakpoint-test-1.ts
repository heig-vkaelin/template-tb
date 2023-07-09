export default function () {
	const socket = new K6SocketIo(getSocketUrl());
	socket.setOnConnect(() => drawMaxRandomPixels(socket, CounterPixels));
	socket.connect();

	socket.on('error', (_error) => {
		CounterErrors.add(1);
	});
}
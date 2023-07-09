export async function drawMaxRandomPixels(
	socket: K6SocketIo,
	CounterPixels: Counter,
	sleepBetweenPixels = 3,
	sleepAfter = 30,
) {
	socket.setEventMessageHandle(ServerEvent.UPDATE_BOARD, () => {});

	const { initialState } = await joinRoom(socket);
	const { canvasSize, colors, maxPixels } = initialState;

	for (let i = 0; i < maxPixels; i++) {
		sleep(random(sleepBetweenPixels));
		CounterPixels.add(1);
		socket.send(
			ClientEvent.PIXEL_FROM_PLAYER,
			randomPixel(canvasSize, colors.length),
			null,
		);
	}

	const protocol = __ENV.PROD === 'true' ? 'https' : 'http';
	http.get(`${protocol}://${__ENV.FRONTEND}`);
	sleep(sleepAfter);

	socket.close();
}
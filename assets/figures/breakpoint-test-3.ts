async function onConnect(socket: K6SocketIo) {
	socket.setEventMessageHandle(ServerEvent.PIXEL_TO_PLAYERS, () => {});

	const { data } = await socket.sendWithAck<JoinResponse>(
		ClientEvent.JOIN,
		uuidv4(),
	);

	const { canvasSize, colors, maxPixels } = data.initialState;

	for (let i = 0; i < maxPixels; i++) {
		sleep(random(3));
		CounterPixels.add(1);
		socket.send(
			ClientEvent.PIXEL_FROM_PLAYER,
			randomPixel(canvasSize, colors.length),
			null,
		);
	}
	sleep(10);
	socket.close();
}

private broadcastBoardUpdates = () => {
  if (this.pixels.size === 0) return;

  const pixels = Array.from(this.pixels.values());
  const array = pixels.map((pixel) => [pixel.x, pixel.y, pixel.color]).flat();
  const buffer = array.toString();

  this.server.emit(ServerEvent.UPDATE_BOARD, buffer);
  this.pixels.clear();
};
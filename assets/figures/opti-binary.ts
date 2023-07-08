private broadcastBoardUpdates = () => {
  const pixels = Array.from(this.pixels.values());

  const BYTES_PER_VALUE = 2;
  const VALUES_PER_PIXEL = 3;
  const buffer = new ArrayBuffer(
    BYTES_PER_VALUE * VALUES_PER_PIXEL * pixels.length,
  );
  const view = new Uint16Array(buffer);
  for (let i = 0; i < pixels.length; i++) {
    view[i * VALUES_PER_PIXEL] = pixels[i].x;
    view[i * VALUES_PER_PIXEL + 1] = pixels[i].y;
    view[i * VALUES_PER_PIXEL + 2] = pixels[i].color;
  }

  this.server.emit(ServerEvent.UPDATE_BOARD, buffer);
  this.pixels.clear();
};
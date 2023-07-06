class BoardGateway {
  private server: BeePlaceSocketServer;
  private pixels: Map<Coord, Pixel> = new Map();
  private interval?: NodeJS.Timer;

  // ...

  private broadcastBoardUpdates = () => {
    if (this.pixels.size === 0) return;

    const pixels = Array.from(this.pixels.values());

    this.server.emit(ServerEvent.UPDATE_BOARD, pixels);
    this.pixels.clear();
  };

  onModuleInit() {
    const refreshRate = this.configService.get(BOARD_REFRESH_RATE);
    this.interval = setInterval(this.broadcastBoardUpdates, refreshRate);
  }

  onModuleDestroy() {
    clearInterval(this.interval);
  }

  @SubscribeMessage(ClientEvent.PIXEL_FROM_PLAYER)
  async addPixel(@MessageBody() pixel: Pixel) {
    // ...
    this.pixels.set({ x: pixel.x, y: pixel.y }, pixel);
  }
}
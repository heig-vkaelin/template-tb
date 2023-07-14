class BoardGateway {
  private server: BeePlaceSocketServer;
  private pixels: Map<Coordinate, Pixel> = new Map();

  // ...

  private broadcastBoardUpdates = () => {
    if (this.pixels.size === 0) return;

    const pixels = Array.from(this.pixels.values());

    this.server.emit(ServerEvent.UPDATE_BOARD, pixels);
    this.pixels.clear();
  };

  onModuleInit() {
    const refreshRate = this.configService.get(BOARD_REFRESH_RATE);
    const interval = setInterval(this.broadcastBoardUpdates, refreshRate);
    this.schedulerRegistry.addInterval(INTERVAL_NAME, interval);
  }

  onModuleDestroy() {
    this.schedulerRegistry.deleteInterval(INTERVAL_NAME);
  }

  @SubscribeMessage(ClientEvent.PIXEL_FROM_PLAYER)
  async addPixel(@MessageBody() pixel: Pixel) {
    // ...
    this.pixels.set({ x: pixel.x, y: pixel.y }, pixel);
  }
}
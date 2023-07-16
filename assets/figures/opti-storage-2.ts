class BoardGateway {
  // ...

  @SubscribeMessage(ClientEvent.JOIN)
  async join() {
    // ...
    return {
      initialState: {
        board: this.board,
        // ...
      },
    };
  }

  @SubscribeMessage(ClientEvent.PIXEL_FROM_PLAYER)
  async addPixel(@MessageBody() pixel: Pixel) {
    // ...

    // Add to the board cache to prevent Redis calls
    const offset = pixel.y * this.configService.get(BOARD_SIZE) + pixel.x;
    this.board[offset] = pixel.color;
  }
}
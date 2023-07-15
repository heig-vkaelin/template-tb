class BoardGateway {
  // ...
  private pixels: Map<Coordinate, Pixel> = new Map();
  private board: number[] | null = null;

  async onModuleInit() {
    // ...

    // Init board
    await this.boardService.setupBoard();
    this.board = await this.boardService.getBoard();
  }

  // ...
}
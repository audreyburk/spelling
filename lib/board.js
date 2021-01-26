import Tile from './tile'
import NullTile from './null_tile'

class Board {
  constructor (game, ctx) {
    this.game = game
    this.ctx = ctx

    this.offsetX = 500
    this.offsetY = 350
    this.rows = 5
    this.columns = 4

    this.getTile = this.getTile.bind(this)

    this.fill()
  }

  fill () {
    this.board = []

    // max 3 of a letter at once?
    for (let y = 0; y < this.rows; y++) {
      this.board.push([])
      for (let x = 0; x < this.columns; x++) {
        const tile = new Tile(this.ctx, this, x, y)
        this.board[y].push(tile)
      }
    }
  }

  refill () {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        if (!this.board[y][x].letter) {
          const tile = new Tile(this.ctx, this, x, y)
          this.board[y][x] = tile
        }
      }
    }
  }

  hitTest (x, y) {
    const size = Tile.size
    const bounds = {
      left: this.offsetX,
      right: this.offsetX - 1 + this.columns * size,
      top: this.offsetY,
      bottom: this.offsetY - 1 + this.rows * size
    }

    const { top, bottom, left, right } = bounds
    return x >= left && x <= right && y >= top && y <= bottom
  }

  boundaries () {
    const size = Tile.size
    return {
      left: this.offsetX,
      right: this.offsetX - 1 + this.columns * size,
      top: this.offsetY,
      bottom: this.offsetY - 1 + this.rows * size
    }
  }

  getTile (x, y) {
    const size = Tile.size
    const col = Math.floor((x - this.offsetX) / size)
    const row = Math.floor((y - this.offsetY) / size)

    let tile
    try {
      tile = this.board[row][col]
      if (!tile) {
        console.info('Board.getTile invalid row!!!:', x, y)
      }
    } catch (err) {
      console.info('Board.getTile invalid column!!!:', x, y)
    }
    return tile
  }

  removeTile (tile) {
    tile.boardX = tile.x
    tile.boardY = tile.y
    this.board[tile.y][tile.x] = new NullTile(this, tile.x, tile.y)
  }

  receiveTiles (tiles) {
    tiles.forEach(tile => {
      tile.parent = this
      tile.x = tile.boardX
      tile.y = tile.boardY
      this.board[tile.y][tile.x] = tile
    })
  }

  click (x, y) {
    const tile = this.getTile(x, y)
    if (tile.letter) {
      this.removeTile(tile)
      this.game.sendToStage(tile)
      tile.click()
    }
  }

  hover (x, y) {
    const tile = this.getTile(x, y)
    tile.hover()
  }

  unHover (x, y) {
    const tile = this.getTile(x, y)
    tile.unHover()
  }

  render () {
    this.board.forEach(row => {
      row.forEach(tile => {
        tile.render()
      })
    })
  }
}

export default Board

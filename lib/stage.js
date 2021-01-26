import Tile from './tile'
import Word from './word'
import { INFO } from './info'

class Stage {
  constructor (game, ctx) {
    this.game = game
    this.ctx = ctx

    this.word = new Word
    // this.tiles = []
    this.offsetX = 500
    this.offsetY = 150
  }

  receiveTile (tile) {
    tile.parent = this
    tile.x = this.word.length
    tile.y = 0
    this.word.push(tile)
  }

  clear () {
    console.info('clearing stage')
    this.word = new Word
  }

  hitTest (x, y) {
    const size = Tile.size
    const bounds = {
      left: this.offsetX,
      right: this.offsetX - 1 + this.word.length * size,
      top: this.offsetY,
      bottom: this.offsetY - 1 + size
    }

    const { top, bottom, left, right } = bounds
    return x >= left && x <= right && y >= top && y <= bottom
  }

  getTile (x, y) {
    const col = Math.floor((x - this.offsetX) / Tile.size)

    const tile = this.word.getTile(col)
    if (!tile) {
      console.info('Stage.getTile invalid column!!!:', x, y)
    }
    return tile
  }

  click (x, y) {
    // shoooot we gotta handle other things too
    // or should buttons, etc, be their own components? hm
    // ugh should UI be completely divorced from info?
    const tile = this.getTile(x, y)
    if (tile) {
      const tilesToMove = this.word.slice(tile.x)

      // modifies in place; removes all tiles to the right, inclusive
      this.word.splice(tile.x)
      this.game.sendToBoard(tilesToMove)
      tile.click()
    }
  }

  hover (x, y) {
    const tile = this.getTile(x, y)
    tile && tile.hover()
  }

  unHover (x, y) {
    const tile = this.getTile(x, y)
    tile && tile.unHover()
  }

  render () {
    // do we actuallyprocess things here? seems a bit odd, but...
    // eg, do the checks for the spells, total value/damage, etc

    // const val = this.tiles.reduce((a, b) => {
    //   return a + INFO[b.letter].value
    // }, 0)

    this.ctx.font = '60px serif'
    this.ctx.fillStyle = 'rgb(200, 200, 250)'
    if (this.word.length > 0) {
      this.ctx.fillText(this.word.value, 415, 190)
    }

    // hmmm we pass validity in here to render nicely?
    const valid = this.word.valid
    this.word.tiles.forEach(tile => {
      tile.render({ valid })
    })
  }
}

export default Stage

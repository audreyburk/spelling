import letters, { INFO } from './info'

class Tile {
  constructor (ctx, parent, x, y, letter) {
    this.ctx = ctx
    this.parent = parent
    this.x = x
    this.y = y

    if (letter) {
      this.letter = letter
    } else {
      const rand = Math.floor(Math.random() * letters.length)
      this.letter = letters[rand]
    }

    this.isHovered = false
  }

  getCoordinates () {
    return {
      x: this.parent.offsetX + 80 * this.x,
      y: this.parent.offsetY + 80 * this.y
    }
  }

  click () {
    this.unHover()
  }

  hover () {
    this.isHovered = true
  }

  unHover () {
    this.isHovered = false
  }

  render (options = {}) {
    const { valid } = options
    const { x, y } = this.getCoordinates()

    this.ctx.font = '60px serif'
    this.ctx.fillStyle = this.isHovered
      ? 'rgb(220, 220, 255)'
      : 'rgb(200, 200, 250)'
    this.ctx.strokeStyle = this.isHovered
      ? 'rgb(220, 220, 255)'
      : 'rgb(210, 210, 255)'
    this.ctx.lineWidth = 4
    this.ctx.fillRect(x, y, 70, 70)
    this.ctx.strokeRect(x, y, 70, 70)

    this.ctx.textBaseline = 'middle'
    this.ctx.textAlign = 'center'
    this.ctx.fillStyle = valid
      ? 'rgb(20, 100, 100)'
      : 'rgb(0, 10, 30)'
    this.ctx.fillText(this.letter, x + 35, y + 40)

    this.ctx.font = '14px serif'
    this.ctx.fillText(INFO[this.letter].value, x + 63, y + 60)
  }
}

Tile.size = 80

export default Tile

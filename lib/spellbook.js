import spellData from './data/spell_data'

class Spellbook {
  constructor (game, ctx, player, stage, x, y) {
    this.game = game
    this.ctx = ctx
    this.player = player
    this.stage = stage
    this.x = x
    this.y = y
    this.hovered = null
  }

  getSpell (x, y) {
    const depth = y - this.y + 22
    const eek = Math.floor(depth / 60)
    return eek
  }

  hitTest (x, y) {
    const bounds = {
      left: this.x,
      right: this.x - 1 + 320,
      top: this.y,
      bottom: this.y - 1 + 60 * this.player.spells.length
    }

    const { top, bottom, left, right } = bounds
    return x >= left && x <= right && y >= top && y <= bottom
  }

  unHover () {
    this.hovered = null
  }

  hover (x, y) {
    this.hovered = this.getSpell(x, y)
  }

  click (x, y) {
    const i = this.getSpell(x, y)
    const spell = this.player.spells[i]
    this.game.cast(spell)
  }

  render () {
    const { x, y } = this
    const valid = this.stage.word.valid

    this.ctx.textBaseline = 'middle'
    this.ctx.textAlign = 'left'

    this.player.spells.forEach((spell, i) => {
      const { name, letters } = spell
      const { text } = spellData[name]
      const castable = valid && spell.check(this.stage.word)

      if (castable) {
        this.ctx.fillStyle = i === this.hovered
          ? 'rgb(220, 220, 255)'
          : 'rgb(210, 210, 255)'
        this.ctx.fillRect(x - 10, y + 60 * i - 22, 320, 60)
      }

      this.ctx.fillStyle = castable
        ? 'rgb(20, 100, 100)'
        : 'rgb(210, 210, 255)'

      this.ctx.font = 'bold 48px serif'
      this.ctx.fillText(letters.join(' '), x, y + 60 * i + 12)

      this.ctx.font = 'bold 18px serif'
      this.ctx.fillText(name, x + 110, y + 60 * i)

      this.ctx.font = '16px serif'
      this.ctx.fillText(text, x + 110, y + 60 * i + 24)
    })
  }
}

export default Spellbook

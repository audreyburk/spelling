import Spell from './spell'

class Player {
  constructor (game, ctx) {
    this.game = game
    this.ctx = ctx

    this.x = 100
    this.y = 150

    this.name = 'Evelyn'
    this.spells = []
    this.curses = []
    this.cantrip = null
    this.maxhp = 60
    this.hp = this.maxhp
    this.armor = 0
  }

  init () {
    // generate a couple random spells and toss em in book for now
    this.spells.push(
      new Spell(this.game, [], 'Cantrip!'),
      new Spell(this.game, [ 'b', 'r' ], 'Death Ray'),
      new Spell(this.game, [ 'a', 'e' ], 'Fireball'),
      new Spell(this.game, [ 'c', 'd' ], 'Lesser Heal'),
      new Spell(this.game, [ 'i', 'r' ], 'Electrocute')
    )
  }

  die () {
    console.info('oh NO i DIE')
    console.info(':(')
  }

  heal (amount) {
    this.hp += amount
    if (this.hp > this.maxhp) {
      this.hp = this.maxhp
    }
  }

  takeDamage (damage) {
    const { amount, type } = damage
    console.info(`${this.name} takes ${amount} ${type} damage`)
    this.hp -= amount
    if (this.hp <= 0) {
      this.hp = 0
      this.die()
    }
  }

  render () {
    const { ctx, x, y, name, hp, maxhp } = this

    ctx.font = '60px serif'
    ctx.textAlign = 'left'
    ctx.fillStyle = 'rgb(200, 200, 250)'
    ctx.fillText(name, x, y)

    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillRect(x, y + 35, 200, 20)

    ctx.fillStyle = 'rgb(0, 255, 120)'
    ctx.fillRect(x, y + 35, 200 * hp/maxhp, 20)

    ctx.fillStyle = 'rgb(200, 200, 250)'
    ctx.font = '18px serif'
    ctx.fillText(`${hp} / ${maxhp}`, x, y + 70)
  }
}

export default Player

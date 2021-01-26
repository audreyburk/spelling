import ENEMY_DATA from './data/enemy_data'

class Enemy {
  constructor (game, ctx) {
    this.name = 'sadsack'
    this.data = ENEMY_DATA[this.name]

    this.game = game
    this.ctx = ctx
    this.hp = this.data.maxhp
    this.round = 0

    // hmm this is simultaneously "enemy" and "enemies"
    this.x = 850
    this.y = 413
  }

  die () {
    console.log(`oh no, ${this.name} has passed away!`)
    this.data.die()
    this.game.removeEnemy(this)
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

  heal (amount) {
    this.hp += amount
    if (this.hp > this.data.maxhp) {
      this.hp = this.data.maxhp
    }
  }

  act () {
    const i = this.round % this.data.actions.length
    this.data.actions[i](this, this.game)
    this.round++
  }

  render (i) {
    const { ctx, name, x, y, hp, data } = this
    const { maxhp } = data
    const height = 120

    // accept an argument for where it renders?
    // or.... Enemy does not render
    // Enemycard does, Enemychoice,etc
    // AKA this is strictly informational, and the presentational layer wraps it
    // idk, i think enemy will render, but we'll need an info panel to display other enemy info
    // can send that stuff over onHover, pass Enemy to Panel

    ctx.font = '60px serif'
    ctx.fillStyle = 'rgb(200, 200, 250)'
    ctx.fillText(name, x, y - 33 + height*i)

    // ctx.font = '18px serif'
    // ctx.fillText(ENEMY_DATA[name].text, 850, 420)

    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillRect(x, y + height*i, 200, 20)

    ctx.fillStyle = 'rgb(0, 255, 120)'
    ctx.fillRect(x, y + height*i, 200 * hp/maxhp, 20)

    ctx.font = '18px serif'
    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillText(this.hp, x + 5, y + 11 + height*i)
  }
}

export default Enemy

import Board from './board'
import Canvas from './canvas'
import Stage from './stage'
import Player from './player'
import Spellbook from './spellbook'
import Enemy from './enemy'
import Listener from './listener'

class Game {
  constructor () {
    this.cast = this.cast.bind(this)
    this.render = this.render.bind(this)

    this.canvas = new Canvas
    const ctx = this.canvas.ctx

    this.board = new Board(this, ctx)
    this.stage = new Stage(this, ctx)
    this.player = new Player(this, ctx)
    this.spellbook = new Spellbook(this, ctx, this.player, this.stage, 100, 400)
    this.player.init()

    this.enemies = []
    this.enemies.push(
      new Enemy(this, ctx),
      new Enemy(this, ctx),
      new Enemy(this, ctx)
    )

    this.listener = new Listener(this, this.canvas, this.board, this.stage, this.spellbook)

    this.oldTime = performance.now()
  }

  static init () {
    const game = new Game
    game.run(performance.now())
  }

  sendToStage (tile) {
    this.stage.receiveTile(tile)
  }

  sendToBoard (tiles) {
    this.board.receiveTiles(tiles)
  }

  removeEnemy (enemy) {
    const i = this.enemies.indexOf(enemy)
    this.enemies.splice(i, 1)
  }

  // unless Quick, signifies a turn
  async cast (spell) {
    const word = this.stage.word
    if (word.valid) {
      // needs to be async and cancellable
      // for targetting, and lack thereof
      try {
        await spell.cast(word, this.player, this.enemies)
        this.enemies.forEach(x => x.act())
        this.stage.clear()
        this.board.refill()
      } catch (err) {
        // didnt cast!
      }
      // then sleep for a second
    }
  }

  render (delta) {
    this.canvas.render()
    this.board.render()
    this.stage.render()
    this.player.render()
    this.spellbook.render()
    this.enemies.forEach((x, i) => x.render(i))
  }

  run (time) {
    const delta = (time - this.oldTime) / 16.6
    this.oldTime = time

    // Color.step(delta)
    // Environment.step(delta)

    this.render(delta)
    // window.requestAnimationFrame(time => this.run(time))
  }
}

export default Game

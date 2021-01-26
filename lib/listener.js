class Listener {
  constructor (game, canvas, board, stage, spellbook) {
    this.handleClick = this.handleClick.bind(this)
    this.handleHover = this.handleHover.bind(this)
    this.sendClick = this.sendClick.bind(this)
    this.sendHover = this.sendHover.bind(this)
    this.unHover = this.unHover.bind(this)

    canvas.self.addEventListener('click', this.handleClick, false)
    canvas.self.addEventListener('mousemove', this.handleHover, false)

    this.game = game
    this.items = [ board, stage, spellbook ]

    this.currentHover = null
    this.hoverX = 0
    this.hoverY = 0
  }

  setHover (item, x, y) {
    this.currentHover = item
    this.hoverX = x
    this.hoverY = y
  }

  unHover () {
    if (this.currentHover) {
      this.currentHover.unHover(this.hoverX, this.hoverY)
      this.game.render()
    }
    this.currentHover = null
    this.hoverX = 0
    this.hoverY = 0
  }

  sendHover (item, x, y) {
    this.setHover(item, x, y)
    item.hover(x, y)
    requestAnimationFrame(this.game.render)
  }

  sendClick (item, x, y) {
    item.click(x, y)
    requestAnimationFrame(this.game.render)
  }

  handleClick (e) {
    const x = e.pageX
    const y = e.pageY

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      if (item.hitTest(x, y)) {
        this.sendClick(item, x, y)
        return
      }
    }
  }

  handleHover (e) {
    const x = e.pageX
    const y = e.pageY

    this.unHover()

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      if (item.hitTest(x, y)) {
        this.sendHover(item, x, y)
        return
      }
    }
  }
}

export default Listener

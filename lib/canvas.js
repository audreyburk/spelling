class Canvas {
  constructor () {
    this.self = document.getElementById('canvas')

    this.self.width = window.innerWidth
    this.self.height = window.innerHeight

    this.width = this.self.width
    this.height = this.self.height
    this.ctx = this.self.getContext('2d')
  }

  render () {
    this.self.style.background = 'rgb(20, 50, 100)'
    this.ctx.clearRect(0, 0, this.width, this.height)
  }
}

export default Canvas

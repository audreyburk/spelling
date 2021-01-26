import { INFO } from './info'
import words from './words'

class Word {
  static isValid (string) {
    return words.has(string)
  }

  constructor (tiles = []) {
    this.tiles = tiles
    this.compute()
  }

  compute () {
    this.length = this.tiles.length
    this.string = this.tiles.map(x => x.letter).join('')
    this.valid = Word.isValid(this.string)
    this.value = this.tiles.reduce((a, b) => {
      return a + INFO[b.letter].value
    }, 0)
  }

  clear () {
    this.tiles = []
    this.length = 0
    this.string = ''
    this.valid = false
    this.value = 0
  }

  slice (i) {
    return this.tiles.slice(i)
  }

  splice (i) {
    this.tiles.splice(i)
    this.compute()
  }

  getTile (i) {
    return this.tiles[i]
  }

  push (tile) {
    // should maybe be "add", and also set tile.word = this
    // which maybe is a method of Tile? idk
    this.tiles.push(tile)
    this.compute()
  }
}

export default Word

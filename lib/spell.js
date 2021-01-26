import SPELL_DATA from './data/spell_data'

class Spell {
  constructor (game, letters, name) {
    this.game = game
    this.letters = letters.map(x => x.toUpperCase()) // [ 'a', 'e' ]
    this.name = name
    this.data = SPELL_DATA[this.name]
  }

  static random (rarity) {
    const spell = new Spell(rarity)
    return spell
  }

  check (word) {
    let previousIndex = -1
    for (let n = 0; n < this.letters.length; n++) {
      const index = word.string.indexOf(this.letters[n])
      if (index <= previousIndex) {
        return false
      }
      previousIndex = index
    }
    return true
  }

  async cast (word, player, enemies) {
    const { targeted, effect } = this.data
    let target
    if (targeted) {
      // const readKey = () => new Promise(resolve => window.addEventListener('keypress', resolve, { once: true }));

      // shuold probably be a Listener method?
      // and means we need to pass enemies to Listener
      // we basically need to activate a global "targetting"  mode
      // so we know to show target hover states when hovering enemies
      target = 2
    }
    effect(this.game, target)
  }

  render () {
    // accept an argument for where it renders?
    // or.... Spell does not render
    // Spellcard does, Spellchoice,etc
    // AKA this is strictly informational, and the presentational layer wraps it
  }
}

export default Spell

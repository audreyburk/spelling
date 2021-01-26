class Damage {
  constructor (amount, type) {
    this.amount = Math.floor(amount)
    this.type = type
  }
}

Damage.types = new Set([
  'fire',
  'arcane'
])

export default Damage

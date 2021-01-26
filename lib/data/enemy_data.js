import Damage from '../damage'

// should these actually all be instances of a new class?
export default {
  'sadsack': {
    maxhp: 55,
    die: () => {},
    actions: [
      (self, game) => {
        console.info('WHACK')
        const dmg = new Damage(7, 'physical')
        game.player.takeDamage(dmg)
      },
      (self, game) => {
        console.info('BONK')
        const dmg = new Damage(4, 'physical')
        game.player.takeDamage(dmg)
      },
      (self, game) => {
        console.info('burblurble')
        self.heal(5)
      },
    ]
  }
}

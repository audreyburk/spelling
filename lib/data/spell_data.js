// should these actually all be instances of a new class?
// i dont think there's any reason for that...

import Damage from '../damage'

export default {
  'Cantrip!': {
    text: 'When nothing else makes sense',
    effect (game, target) {
      console.info('boop!')
      const value = game.stage.word.value
      const dmg = new Damage(value, 'arcane')
      game.enemies[0].takeDamage(dmg)
    }
  },
  'Death Ray': {
    text: 'Big zaps',
    effect (game, target) {
      console.info('cast deathray ZAP!')
      const value = 3 * game.stage.word.value
      const dmg = new Damage(value, 'arcane')
      game.enemies[0].takeDamage(dmg)
    }
  },
  'Electrocute': {
    targeted: true,
    text: 'OW OW OW',
    effect (game, target) {
      console.info('bzzzzzt')
      const value = 2 * game.stage.word.value
      const dmg = new Damage(value, 'lightning')
      game.enemies[target].takeDamage(dmg)
    }
  },
  'Fireball': {
    text: 'Cast a big old ball of fire!!',
    effect (game, target) {
      console.info('cast fireball wheeehoo!')
      const value = game.stage.word.value + game.stage.word.length
      const dmg = new Damage(value, 'fire')
      game.enemies.forEach(enemy => {
        enemy.takeDamage(dmg)
      })
    }
  },
  'Lesser Heal': {
    text: 'bandaids & leeches',
    effect (game, target) {
      console.info('ahhhhhh much better')
      const value = game.stage.word.value
      game.player.heal(value)
    }
  },
}

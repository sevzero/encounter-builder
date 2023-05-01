import { defineStore } from 'pinia';
import { PartyStore } from 'stores/party';
import { v4 } from 'uuid';

function calculateXP(creature, qty, strength, partyLevel) {
  qty = qty || 1;
  strength = strength || 0;
  let xpProgression = [10, 15, 20, 30, 40, 60, 80, 120, 160];
  let levelOffset = (creature.level + strength - partyLevel);
  levelOffset = levelOffset < -4 ? -4 : levelOffset > 4 ? 4 : levelOffset;
  return xpProgression[levelOffset + 4] * qty;
}

export const EncounterStore = defineStore('encounter', {
  state: () => ({
    _party: PartyStore(),
    _creatures: []
  }),

  getters: {
    creatures (state) {
      return state._creatures.map(creature => {
        creature.xp = calculateXP(creature.data, creature.qty, creature.strength, this._party.level);
        return creature;
      });
    }
  },

  actions: {
    addCreature (creature) {
      this._creatures.push({id: v4(), qty: 1, data: creature, strength: 0});
    },
    removeCreature(creature) {
      let index = this._creatures.findIndex(i => i.id == creature.id);
      this._creatures.splice(index, 1);
    },
    changeQty(qty, item) {
      item.qty = qty;
    },
    changeStrength(strength, item) {
      item.strength = ['weak', 'base', 'elite'].indexOf(strength) - 1;
    },
  }
})

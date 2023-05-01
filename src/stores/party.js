import { defineStore } from 'pinia';

export const PartyStore = defineStore('party', {
  state: () => ({
    _size: 4,
    _level: 1
  }),

  getters: {
    size () {
      return this._size;
    },
    level () {
      return this._level;
    },
  },

  actions: {
    setSize (size) {
      console.log()
      this._size = size;
    },
    setLevel (level) {
      this._level = level;
    }
  }
})

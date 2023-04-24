<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-dark text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Kobold Encounter Builder
        </q-toolbar-title>
        <q-space></q-space>
        <q-btn @click="toggleDarkTheme(this)" round :icon="darkMode" :ripple="false"></q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
        <div clas="row">
          <DifficultyBar
            :partySize="partySize"
            :partyLevel="partyLevel"
            :encounter="encounter">
          </DifficultyBar>
        </div>
        <div class="row">
          <div class="col">
            <div class="row">
              <FilterBar
                @partyLevelChange="updatePartyLevel"
                @partySizeChange="updatePartySize"
                @updateFilter="updateFilter"
                :partySize="partySize"
                :partyLevel="partyLevel"
              ></FilterBar>
            </div>
            <CreatureTable 
              @creature-added="addEncounterListItem"
              :filter="creatureFilter"
            ></CreatureTable>
          </div>
          <div class="col-md-4">
            <EncounterPanel
              :encounter="encounter"
              :partySize="partySize"
              :partyLevel="partyLevel"
              @removeEncounterListItem="removeEncounterListItem"
              @changeStrength="changeStrength"
              @changeQty="changeQty"
            ></EncounterPanel>
          </div>
        </div>
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref } from 'vue'
import { v4 } from 'uuid';
import CreatureTable from 'src/components/CreatureTable.vue';
import DifficultyBar from 'src/components/DifficultyBar.vue';
import FilterBar from 'src/components/FilterBar.vue';
import EncounterPanel from 'src/components/EncounterPanel.vue'
import { Dark } from 'quasar'

export default {
  setup () {
    const theme = localStorage.getItem("dark_theme") || false;
    Dark.set(theme == 'true');
  },
  mounted() {
    this.partySize = parseInt(localStorage.getItem('partySize') || 4);
    this.partyLevel = parseInt(localStorage.getItem('partyLevel') || 1);
  },
  components: { CreatureTable, DifficultyBar, FilterBar, EncounterPanel },
  computed: {

  },
  methods: {
    generateId() {
      return v4();
    },
    toggleDarkTheme(btn) {
      Dark.toggle();
      localStorage.setItem("dark_theme", Dark.isActive);
    },
    addEncounterListItem(creature) {
      this.encounter.push({id: this.generateId(), qty: 1, data: creature, strength: 0, xp: this.calculateXP(creature)});
    },
    removeEncounterListItem(item) {
      let index = this.encounter.findIndex(i => i.id == item.id);
      this.encounter.splice(index, 1);
    },
    changeStrength(strength, item) {
      item.strength = ['weak', 'base', 'elite'].indexOf(strength) - 1;
      item.xp = this.calculateXP(item.data, item.qty, item.strength);
    },
    changeQty(qty, item) {
      item.qty = qty;
      item.xp = this.calculateXP(item.data, item.qty, item.strength);
    },
    updatePartyLevel(level) {
      this.partyLevel = level;
      localStorage.setItem('partyLevel', level);
      this.encounter.forEach(item => item.xp = this.calculateXP(item.data, item.qty, item.strength));
    },
    updatePartySize(size) {
      this.partySize = size;
      localStorage.setItem('partySize', size);
    },
    calculateXP(creature, qty, strength) {
      qty = qty || 1;
      strength = strength || 0;
      let xpProgression = [10, 15, 20, 30, 40, 60, 80, 120, 160];
      let levelOffset = (creature.level + strength - this.partyLevel);
      levelOffset = levelOffset < -4 ? -4 : levelOffset > 4 ? 4 : levelOffset;
      return xpProgression[levelOffset + 4] * qty;
    },
    updateFilter(filter) {
      Object.assign(this.creatureFilter, filter);
    }
  },
  data: () => ({
    darkMode: 'dark_mode',
    encounter: [],
    partyLevel: null,
    partySize: null,
    creatureFilter: {'filter': '', levelRange: {min: -1, max: 25}}
  })
}

</script>
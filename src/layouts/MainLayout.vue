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
                @updateFilter="updateFilter"
              ></FilterBar>
            </div>
            <CreatureTable 
              :filter="creatureFilter"
            ></CreatureTable>
          </div>
          <div class="col-md-4">
            <EncounterPanel
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
import { PartyStore } from 'stores/party';

export default {
  setup () {
    const party = PartyStore();
    const theme = localStorage.getItem("dark_theme") || false;
    Dark.set(theme == 'true');
    return { party }
  },

  mounted() {
    this.party.setSize(parseInt(localStorage.getItem('partySize') || 4));
    this.party.setLevel(parseInt(localStorage.getItem('partyLevel') || 1));
  },

  components: { CreatureTable, DifficultyBar, FilterBar, EncounterPanel },
  computed: {

  },
  methods: {
    toggleDarkTheme(btn) {
      Dark.toggle();
      localStorage.setItem("dark_theme", Dark.isActive);
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
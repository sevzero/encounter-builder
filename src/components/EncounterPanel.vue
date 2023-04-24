<template>
    <div>
        <q-banner inline-actions class="bg-dark text-white">
            Encounter Cost: {{ encounterCost }}
            <div v-if="partySize != 4"><small>Awarded XP: {{ Math.floor(encounterCost * 4 / partySize) }}</small></div>
            <template v-slot:action>
                
            </template>
        </q-banner>
        <div class="encounter-container">
            <EncounterListItem 
                v-for="creature in encounter"
                :key="creature.id"
                :creature="creature"
                @removeCreature="item => $emit('removeEncounterListItem', item)"
                @changeStrength="(val, item) => $emit('changeStrength', val, item)"
                @changeQty="(val, item) => $emit('changeQty', val, item)"
            ></EncounterListItem>
        </div>
    </div>
</template>
  
<script>
    
    import EncounterListItem from 'src/components/EncounterListItem.vue';
    
    export default {
        mounted() {
    },
    
    methods: {

    },
    
    computed: {
        encounterCost() {
            return this.encounter.reduce((acc, curr) => acc + curr.xp, 0);
        }   
    },

    data: () => ({
        components: { EncounterListItem },
    }),
    
    props: ['encounter', 'partySize'],

    components: { EncounterListItem }
}
</script>
  
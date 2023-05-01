<template>
    <div>
        <q-banner inline-actions class="bg-dark text-white">
            Encounter Cost: {{ encounterCost }}
            <div v-if="party.size != 4"><small>Awarded XP: {{ Math.floor(encounterCost * 4 / party.size) }}</small></div>
            <template v-slot:action>
                
            </template>
        </q-banner>
        <div class="encounter-container">
            <EncounterListItem 
                v-for="creature in encounter.creatures"
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
    import { PartyStore } from 'stores/party';
    import { EncounterStore } from 'stores/encounter';

    export default {

        setup() {
            const party = PartyStore();
            const encounter = EncounterStore();
            return { party, encounter }
        },

        mounted() {
        
        },
    
        methods: {

        },
        
        computed: {
            encounterCost() {
                return this.encounter.creatures.reduce((acc, curr) => acc + curr.xp, 0);
            }   
        },

        data: () => ({
            components: { EncounterListItem },
        }),
        
        props: [],

        components: { EncounterListItem }
    }
</script>
  
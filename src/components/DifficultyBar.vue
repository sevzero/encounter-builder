<template>
    <div class="column difficulty-container">
        <q-linear-progress
        :animation-speed="250"
        stripe
        rounded
        size="20px"
        :value="difficulty"
        :color="barColor"
        class="q-mt-sm difficulty-bar">
            <div class="absolute-full flex flex-center">
                <div class="flex" style="position: absolute; left: 25%; width: 0px;">
                    <q-badge class="difficulty-bar-label" style="transform: translateX(-50%);" color="blue">trivial {{ party.size * 40 * 0.25}}</q-badge>
                </div>
                <div class="flex" style="position: absolute; left: 37.5%; width: 0px;">
                    <q-badge class="difficulty-bar-label" style="transform: translateX(-50%);" color="green">low {{ party.size * 40 * 0.375}}</q-badge>
                </div>
                <div class="flex" style="position: absolute; left: 50%; width: 0px;">
                    <q-badge class="difficulty-bar-label" style="transform: translateX(-50%);" color="yellow">moderate {{ party.size * 40 * 0.5}}</q-badge>
                </div>
                <div class="flex" style="position: absolute; left: 75%; width: 0px;">
                    <q-badge class="difficulty-bar-label" style="transform: translateX(-50%);" color="orange">severe {{ party.size * 40  * 0.75}}</q-badge>
                </div>
                <div class="flex" style="position: absolute; left: 100%; width: 0px;">
                    <q-badge class="difficulty-bar-label" style="transform: translateX(-100%);" color="red">extreme {{ party.size * 40 }}</q-badge>
                </div>
            </div>
        </q-linear-progress>
    </div>
</template>
  
<script>

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

        computed: {
            difficulty() {
                let totalXp = this.encounter.creatures.reduce((acc, curr) => acc + curr.xp, 0);
                return totalXp / (this.party.size * 40);
            },
            barColor() {
                const difficulty = this.difficulty;
                return  difficulty > 0.75 ? 'red' :
                        difficulty > 0.5 ? 'orange' :
                        difficulty > 0.375 ? 'yellow' :
                        'green';
            }
        },

        methods: {

        },

        data: () => ({

        }),

        props: []
    }
</script>
  
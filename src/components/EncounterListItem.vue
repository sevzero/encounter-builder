<template>
    <div>
        <q-item>
            <q-item-section avatar>
                <ButtonCounter :value="1" @change="qtyChanged"></ButtonCounter>
            </q-item-section>
            <q-item-section>
                <div>
                    {{creature.data.name}}
                    <q-badge style="float:right" outline color="primary" :label="`${creature.xp}xp`"></q-badge>
                </div>
            </q-item-section>
            <q-item-section side>
                <q-btn-toggle
                    v-model="strength"
                    flat
                    toggle-color="primary"
                    :ripple="false"
                    :options="[
                        {label: 'WEAK', value: 'weak'},
                        {label: 'BASE', value: 'base'},
                        {label: 'ELITE', value: 'elite'}
                    ]"
                ></q-btn-toggle>
            </q-item-section>
        </q-item>
    </div>
</template>
  
<script>

    import ButtonCounter from 'src/components/utility/ButtonCounter.vue';
    import { EncounterStore } from 'stores/encounter';

    export default {

        setup() {
            const encounter = EncounterStore();
            return { encounter }
        },

        mounted() {
            this.qty = this.creature.qty
        },

        methods: {
            qtyChanged(val) {
                if (val <= 0) {
                    this.encounter.removeCreature(this.creature);
                }
                else {
                    this.encounter.changeQty(val, this.creature);
                }
            }
        },

        props: ['creature'],

        computed: {
            strength: {
                get() { 
                    return ['weak', 'base', 'elite'][this.creature.strength + 1];
                },
                set(val) {
                    this.encounter.changeStrength(val, this.creature);
                }
            },
        },

        watch: {
            'creature.qty'(newVal) {
                this.qty = newVal;
            }
        },

        data: () => ({
            qty: null,
        }),

        components: { ButtonCounter }
    }
</script>
  
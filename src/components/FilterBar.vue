<template>
    <q-toolbar class="d-flex justify-content-between" :class="$q.dark.isActive ? 'bg-grey-9 text-white' : 'bg-grey-3'">
        <q-btn flat round dense icon="search"></q-btn>
        <q-input style="width: 30%; padding-right: 20px;" dense v-model="filter" label="filter" @update:model-value="val => $emit('updateFilter', {filter: val})"></q-input>
        <q-separator vertical inset></q-separator>
        <span style="padding-left: 10px;">Level range:</span>
        <q-range
            v-model="levelRange"
            style="width: 30%; margin-left: 25px;"
            :min="-1"
            :max="25"
            :markers="3"
            label
            marker-labels
            @change="$emit('updateFilter', {levelRange: levelRange})"
        ></q-range>
        <q-space></q-space>
        <q-btn icon="group" style="margin-right: 8px;">
            <q-menu>
                <q-list style="min-width: 100px">
                    <q-item>
                        <q-item-section>
                            <div style="text-align: center">Party Level</div>
                            <button-counter :min="1" :value="party.level" label="Party Level" type="number" @change="val => setLevel(val)"></button-counter>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <div style="text-align: center">Party Size</div>
                            <button-counter :min="1" :value="party.size" label="Party Size" type="number" @change="val => setSize(val)"></button-counter>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
        <q-btn icon="layers">
            <q-menu>
                <q-list bordered separator>
                    <q-item clickable :active="active" v-for="source in sources" v-bind:key="source">
                        <q-item-section>{{ source }}</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
    </q-toolbar>
</template>
  
<script>

    import ButtonCounter from 'src/components/utility/ButtonCounter.vue';
    import { PartyStore } from 'stores/party';

    export default {

        setup() {
            const party = PartyStore();
            return { party }
        },

        mounted() {
            //this.levelRange = {min: this.partyLevel - 4, max: this.partyLevel + 4};
            this.$emit('updateFilter', {levelRange: this.levelRange});
        },

        methods: {
            setLevel(level) {
                localStorage.setItem('partyLevel', level);
                this.party.setLevel(level);
            },
            setSize(size) {
                localStorage.setItem('partySize', size);
                this.party.setSize(size);
            }
        },

        data: () => ({
            filter: '',
            levelRange: {min: -1, max: 25},
        }),

        components: { ButtonCounter },

        props: ['partySize', 'partyLevel', 'sources']
    }
</script>
  
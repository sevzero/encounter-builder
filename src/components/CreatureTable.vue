<template>
    <div>
    <q-table
        v-if="creatureData.length != 0"
        :rows="creatureData"
        :filter="filter"
        :filter-method="filterData"
        virtual-scroll
        :columns="columns"
        row-key="name"
        :pagination="{
            page: 1,    
            rowsPerPage: 0 // all rows    
         }"
        dense
        class="creature-table"
        @row-click="(evt, row, index) => encounter.addCreature(row)"
        selection="single"
        hide-bottom
        style="bottom: 0;"
    >
        <template v-slot:body-selection="scope">
            <a class="table-btn" :href="`https://2e.aonprd.com/Monsters.aspx?ID=${scope.row.id}`" target="_blank" @click="e => e.stopPropagation()"><q-btn round dense icon="search"></q-btn></a>
        </template>
    </q-table>
    </div>
</template>

<script>
    import { EncounterStore } from 'stores/encounter';
    
    export default {

        setup() {
            const encounter = EncounterStore();
            return { encounter }
        },

        mounted() {
            this.fetchData();
        },

        methods: {
            fetchData() {
                const self = this;
                fetch('creatures.json')
                    .then(response => response.json())
                    .then(data => self.creatureData = data.creatures);
            },
            filterData(rows, terms) {
                let filtered = rows.filter(row => row.level >= terms.levelRange.min && row.level <= terms.levelRange.max);
                return filtered.filter(row => Object.values(row).toString().toLowerCase().includes(terms.filter.toLowerCase()));
            }
        },
        props: ['filter'],
        data: () => ({
                creatureData: [],
                columns: [
                    {
                        name: 'name',
                        required: true,
                        label: 'Name',
                        align: 'left',
                        field: 'name',
                        sortable: true,
                    },
                    {
                        name: 'level',
                        required: true,
                        label: 'Level',
                        align: 'right',
                        field: 'level',
                        sortable: true,
                    },
                    {
                        name: 'size',
                        required: true,
                        label: 'Size',
                        align: 'right',
                        field: 'size',
                        sortable: true,
                    },
                    {
                        name: 'family',
                        required: true,
                        label: 'Family',
                        align: 'left',
                        field: 'family',
                        sortable: true,
                    },
/*                    {
                        name: 'traits',
                        required: true,
                        label: 'Traits',
                        align: 'right',
                        field: 'traits',
                        sortable: true,
                    }*/,
                ],
        })
    }
</script>
  
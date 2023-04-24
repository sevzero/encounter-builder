<template>
        <div style="width: 8em; max-width: 100%">
            <q-btn-group shrink :class="['button-counter', 'text-white', 'rounded-borders', color]">
                <q-btn :ripple="false" round dense flat icon="remove" class="q-mr-xs" @click="minusBtnClick"></q-btn>
                <q-input readonly dense dark borderless v-model="counter" input-class="text-center"></q-input>
                <q-btn :ripple="false" round dense flat icon="add" class="q-mr-xs" @click="plusBtnClick"></q-btn>
            </q-btn-group>
        </div>
</template>
  
<script>
    export default {

        mounted() {
            console.log(this.min, this.max)
            this.counter = this.value || 0;
        },

        methods: {
            plusBtnClick() {
                if (this.max !== undefined && this.counter == this.max)
                    return;
                this.counter++;
                this.$emit('change', this.counter, this.$el);
            },
            minusBtnClick() {
                if (this.min != undefined && this.counter == this.min)
                    return;
                this.counter--;
                this.$emit('change', this.counter, this.$el);
            }
        },

        data() {
            return {
                counter: this.value
            }
        },

        props: ['value', 'color', 'min', 'max']
    }
</script>
  
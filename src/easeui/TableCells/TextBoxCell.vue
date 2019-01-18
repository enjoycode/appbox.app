<template>
    <e-input :autofocus="true" v-if="editing" :value="value" @change="updateValue" style="width:100%;" size="small"></e-input>
    <div v-else>{{value}}</div>
</template>

<script>
    import initBehavior from './TableEditBehavior'
    export default {
        props: ['value'],
        data() {
            return {
                editing: false
            }
        },
        methods: {
            updateValue(value) {
                this.$emit('input', value)
            }
        },
        mounted() {
            initBehavior(this.$parent)
        }
    }

</script>
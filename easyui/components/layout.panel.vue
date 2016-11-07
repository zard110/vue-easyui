<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import LayoutEvents from './layout.events'

  export default {
    name: 'ce-layout-panel',

    props: {
      size: Number,
      region: {
        type: String,
        required: true
      }
    },

    computed: {
      width() {
        return ['west', 'east'].indexOf(this.region) > -1 ? this.size : undefined
      },
      height() {
        return ['north', 'south'].indexOf(this.region) > -1 ? this.size : undefined
      }
    },

    mounted() {
      LayoutEvents.$emit('add', this.$parent.$parent, this.region, {
        width: this.width,
        height: this.height
      })
      console.log('child mounted', this, this.region, this.size)
    },

    beforeMount() {
      console.log('child beforeMount', this.region, this.size)
    },

    created() {
      console.log('child created', this.region, this.size)
    },

    beforeCreate() {
      console.log('child beforeCreate', this.region, this.size)
    }

  }
</script>

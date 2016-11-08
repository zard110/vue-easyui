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
      /**
       *
       */
      size: Number,

      /**
       * 
       */
      region: {
        type: String,
        required: true
      }
    },

    computed: {
      width() {
        return ~['west', 'east'].indexOf(this.region) ? this.size : undefined
      },
      height() {
        return ~['north', 'south'].indexOf(this.region) ? this.size : undefined
      }
    },

    mounted() {
      LayoutEvents.$emit('add', this.$parent.$parent, this.region, {
        width: this.width,
        height: this.height
      })
    },

    beforeMount() {
    },

    created() {
    },

    beforeCreate() {
    }

  }
</script>

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
       * east 和 west 的值将转换成 width
       * north 和 south 的值将转换成 height
       */
      size: Number,

      /**
       * 面板所在方位，可选值：east west south north center
       */
      region: {
        type: String,
        required: true
      },

      /**
       * True to show a split bar which user can change the panel size.
       */
      split: Boolean
    },

    computed: {
      /**
       * 面板宽度
       */
      width() {
        return ~['west', 'east'].indexOf(this.region) ? this.size : undefined
      },

      /**
       * 面板高度
       */
      height() {
        return ~['north', 'south'].indexOf(this.region) ? this.size : undefined
      },

      splitClass() {
        return this.split ? 'layout-split-' + this.region : undefined
      }

    },

    mounted() {
    },

    beforeMount() {
    },

    created() {
      // 触发父容器添加面板事件
      LayoutEvents.$emit('add', this.$parent.$parent, this.region, {
        width: this.width,
        height: this.height,
        split: this.split,
        splitClass: this.splitClass
      })
    },

    beforeCreate() {
    }

  }

</script>

<template>
  <ce-panel
    class="layout-panel"
    v-show="!collapsed"
    :id="id"
    :title="title"
    :iconClass="iconClass"
    :do-size="!collapsed"
    :class="[regionClass, splitClass]"
    :width="width" :height="height" :left="left" :top="top"
    :tools="tools"
    body-class="layout-body">
    <div slot="tools" v-if="collapsible">
      <a href="javascript:void(0);" :class="[collapseToolClass]" @click="collapse"></a>
    </div>
    <slot></slot>
  </ce-panel>
</template>

<script>
  import LayoutEvents from './layout.events'

  export default {
    name: 'ce-layout-panel',

    data() {
      return {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        collapsed: false
      }
    },

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

      title: String,

      iconClass: String,

      /**
       * True to show a split bar which user can change the panel size.
       */
      split: Boolean,

      collapsible: Boolean,

      collapsedSize: {
          type: Number,
          default: 28
      }
    },

    methods: {
      collapse,
      expand,
      layout
    },

    computed: {
      tools() {
        return this.collapsible ? [] : undefined
      },
      splitClass() {
        return this.split ? 'layout-split-' + this.region : undefined
      },

      regionClass() {
        return 'layout-panel-' + this.region
      },

      expandClass() {
        return this.collapsible ? 'layout-expand-' + this.region : undefined
      },

      expandToolClass() {
        if (!this.collapsible) return

        switch (this.region) {
          case 'west':
            return 'layout-button-right'
          case 'east':
            return 'layout-button-left'
          case 'north':
            return 'layout-button-down'
          case 'south':
            return 'layout-button-up'
          default:
        }
      },

      collapseToolClass() {
        if (!this.collapsible) return

        switch (this.region) {
          case 'west':
            return 'layout-button-left'
          case 'east':
            return 'layout-button-right'
          case 'north':
            return 'layout-button-up'
          case 'south':
             return 'layout-button-down'
          default:
        }
      },

      splitHandles() {
        if (!this.split) return

        switch (this.region) {
          case 'west':
            return 'e'
          case 'east':
            return 'w'
          case 'north':
            return 's'
          case 'south':
            return 'n'
          default:
            return
        }
      },
    },

    created() {
      let parent = this.$parent
      while (parent && !parent['addLayoutPanel']) {
          parent = parent.$parent
      }

      if (!parent) {
          throw new Error('layout.panel MUST BE in layout!')
      }

      this['_parent'] = parent
      if (parent['id']) {
        this.id = parent['id'] + '_' + this.region
      }
      parent['addLayoutPanel'](this)
    }
  }

  function layout(top, left, width, height) {
    if (top == this.top && left == this.left && width == this.width && height == this.height) return

    console.log('layout: ', this.id, top, left, width, height)
    this.top = top
    this.left = left
    this.width = width
    this.height = height
  }

  function collapse() {
    this.collapsed = true
    this['_parent'].collapse(this.region)
  }

  function expand() {
    this.collapsed = false
  }
</script>

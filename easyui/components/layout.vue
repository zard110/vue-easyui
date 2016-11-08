<template>
  <ce-panel
    class="layout"
    :id="id"
    :fit="true" :parent-el="parentEl"
    :border="false"
    @resize="doLayout">

    <ce-panel
      class="layout-panel"
      v-for="(panel, region) in panels"
      v-show="panel.show"
      :id="panel.id"
      :ref="region"
      :title="panel.title"
      :icon-class="panel.iconClass"
      :do-size="panel.show" :width="panel.width" :height="panel.height" :left="panel.left" :top="panel.top"
      :class="[panel.regionClass]"
      body-class="layout-body">
      <slot :name="region"></slot>
    </ce-panel>

  </ce-panel>
</template>

<style>
  .layout {
    position: absolute;
  }
</style>

<script>
  import $ from 'jquery'
  import LayoutEvents from './layout.events'

  export default {
    name: 'ce-layout',

    props: {
      id: String
    },

    computed: {
      parentEl() {
        return $(this.$el).parent()
      }
    },

    data() {
      return {
        panels: ['north', 'east', 'south', 'west', 'center'].reduce((panels, region) => {
          panels[region] = {
            show: false,
            regionClass: 'layout-panel-' + region,
            id: this.id + '_' + region,
            width: 1, height: 1, left: 0, top: 0
          }

          return panels
        }, {})

      }
    },

    methods: {
      addLayoutPanel,
      doLayout
    },

    mounted() {
    },

    updated() {

    },

    beforeMount() {

    },

    created() {
      LayoutEvents.$on('add', this.addLayoutPanel)
    },

    beforeCreate() {
    }
  }

  function addLayoutPanel(layout, region, size) {
    if (layout.$el !== this.$el) return

    let panel = this.panels[region]
    if (!panel) return

    panel.show = true
    panel.width = size.width ? size.width : 0
    panel.height = size.height ? size.height : 0
  }

  function doLayout(width, height) {

    let north = this.panels['north'],
      south = this.panels['south'],
      west = this.panels['west'],
      east = this.panels['east'],
      center = this.panels['center']

    // size
    north.width = south.width = width;
    west.height = east.height = center.height = height - (north.show ? north.height - 1 : 0) - (south.show ? south.height - 1 : 0)
    center.width = width - (east.show ? east.width - 1 : 0) - (west.show ? west.width - 1 : 0)

    // position
    west.top = east.top = center.top = north.show ? north.height - 1 : 0
    center.left = west.show ? west.width - 1 : 0
    south.top = center.top + center.height - 1
    east.left = center.left + center.width - 1

    //

    console.log('doLayout', width, height)
  }
</script>

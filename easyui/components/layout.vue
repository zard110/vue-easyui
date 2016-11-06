<template>
  <ce-panel class="layout" :fit="true" :border="false">

    <ce-panel
      class="layout-panel"
      v-for="(panel, region) in panels"
      v-show="panel.show"
      :ref="region"
      :do-size="panel.show" :width="panel.width" :height="panel.height" :left="panel.left" :top="panel.top"
      :class="[panel.regionClass]"
      body-class="layout-body">
      <slot :name="region"></slot>
    </ce-panel>

  </ce-panel>
</template>

<script>
  import $ from 'jquery'
  import LayoutEvents from './layout.events'

  export default {
    name: 'ce-layout',

    data() {
      return {
        panels: ['north', 'east', 'south', 'west', 'center'].reduce((panels, region) => {
          panels[region] = {
            show: false,
            regionClass: 'layout-panel-' + region,
            width: 0, height: 0, left: 0, top: 0
          }

          return panels
        }, {})
      }
    },

    methods: {
      addLayoutPanel(region, size) {
        console.log('in', this, region, size)
        let panel = this.panels[region]
        if (!panel) return

        panel.show = true
        panel.width = size.width ? size.width : 0
        panel.height = size.height ? size.height : 0
      },
      doLayout() {

        console.log('!!!!!!!!!!!!!!!!!! doLayout   !!!!!!!!!!!!!!')

        let el = $(this.$el),

          width = el.width(),
          height = el.height(),

          north = this.panels['north'],
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
      }
    },

    mounted() {
      console.log('parent mounted', this.panels)
      this.$nextTick(() => this.doLayout())
    },

    updated() {
      console.log('parent updated', this.panels)
      //this.$nextTick(() => this.doLayout())
    },

    beforeMount() {
      console.log('parent beforeMount', this.panels)

    },

    created() {
      LayoutEvents.$on('add', this.addLayoutPanel)
      LayoutEvents.$on('doLayout', this.doLayout)
      console.log('parent created', this.panels)
    },

    beforeCreate() {
      console.log('parent beforeCreate', this.panels)
    }
  }

</script>

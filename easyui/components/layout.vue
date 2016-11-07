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
      :region="region"
      :ref="region"
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
            width: 0, height: 0, left: 0, top: 0
          }

          return panels
        }, {})

      }
    },

    methods: {
      addLayoutPanel(layout, region, size) {
        if (layout.$el !== this.$el) return

        console.log('in', this, region, size)
        let panel = this.panels[region]
        if (!panel) return

        panel.show = true
        panel.width = size.width ? size.width : 0
        panel.height = size.height ? size.height : 0
      },
      doLayout2(width, height) {
        console.log('$on doLayout parent2', width, height)
      },
      doLayout(width, height) {

        console.log('$on doLayout parent2', this.id, width, height)

        let parent = $(this.$parent.$el),

//          width = parent.width(),
//          height = parent.height(),

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
      console.log('!!!!!!!', this.id, $(this.$parent.$el))
    },

    updated() {
      console.log('parent updated', this.panels)
      //this.$nextTick(() => this.doLayout())
    },

    beforeMount() {
//      this.$nextTick(() => this.doLayout())
      console.log('parent beforeMount', this.panels)

    },

    created() {
      LayoutEvents.$on('add', this.addLayoutPanel)
//      LayoutEvents.$on('doLayout', this.doLayout)
      console.log('parent created', this.panels)
    },

    beforeCreate() {
      console.log('parent beforeCreate', this.panels)
    }
  }

</script>

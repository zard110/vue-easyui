<template>
  <ce-panel
    class="layout"
    :id="id"
    :fit="true"
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
      :class="[panel.regionClass, panel.splitClass]"
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
      /**
       * The id attribute of this layout
       */
      id: String
    },

    data() {
      return {
        /**
         * 布局的子面板，按照方位分为：东、西、南、北、中5块
         * 其中，“南”和“北”固定高度，“东”和“西”固定宽度，“中”按照屏幕剩余自适应
         * 一开始默认这些面板隐藏，待 add 事件后显示对应的面板
         */
        panels: ['north', 'east', 'south', 'west', 'center'].reduce((panels, region) => {
          panels[region] = {
            show: false,
            regionClass: 'layout-panel-' + region,
            id: 'layout_panel_' + this.id + '_' + region,
            width: 0, height: 0, left: 0, top: 0
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
      // 添加对应的面板
      LayoutEvents.$on('add', this.addLayoutPanel)
    },

    beforeCreate() {
    }
  }

  /**
   * 添加对应面板
   * 面板初始化的时候就存在，只是隐藏起来
   * @param layout
   * @param region
   * @param info
   */
  function addLayoutPanel(layout, region, info) {
    if (layout.$el !== this.$el) return

    let panel = this.panels[region]
    if (!panel) return

    panel.show = true
    panel.width = info.width ? info.width : 0
    panel.height = info.height ? info.height : 0
    panel.split = info.split
    panel.splitClass = info.splitClass
  }

  /**
   * 进行布局
   * @param width
   * @param height
   */
  function doLayout(width, height) {
    let north = this.panels['north'],
      south = this.panels['south'],
      west = this.panels['west'],
      east = this.panels['east'],
      center = this.panels['center'],

      // 处理 border 重合问题
      offsetNorth = (north.show && !north.split) ? 1 : 0,
      offsetSouth = (south.show && !south.split) ? 1 : 0,
      offsetHeight = offsetNorth + offsetSouth,

      offsetWest = (west.show && !west.split) ? 1 : 0,
      offsetEast = (east.show && !east.split) ? 1 : 0,
      offsetWidth = offsetWest + offsetEast


    // size
    north.width = south.width = width
    west.height = east.height = center.height = (height - north.height - south.height) + offsetHeight
    center.width =(width - east.width - west.width) + offsetWidth

    // position
    west.top = east.top = center.top = north.height - offsetNorth
    center.left = west.width - offsetWest
    south.top = center.top + center.height - offsetSouth
    east.left = center.left + center.width - offsetEast

    console.log('doLayout', width, height)
  }
</script>

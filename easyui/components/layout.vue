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
      v-if="panel.show"
      v-show="!panel.collapsed"
      :id="panel.id"
      :ref="region"
      :title="panel.title"
      :icon-class="panel.iconClass"
      :split-handles="panel.splitHandles"
      :do-size="panel.show && !panel.collapsed" :width="panel.width" :height="panel.height" :left="panel.left" :top="panel.top"
      :class="[panel.regionClass, panel.splitClass]"
      :tools="panel.tools"
      body-class="layout-body"

      @onStartResize="onStartResize"
      @onStopResize="onStopResize"
      @onResize="onResize">
      {{panel.width}}×{{panel.height}}
    </ce-panel>

    <ce-panel
      class="layout-expand"
      v-for="(panel, region) in panels"
      v-if="panel.collapsible && panel.show"
      v-show="panel.collapsed"
      title=" "
      :left="panel.left" :top="panel.top" :width="panel.width" :height="panel.height"
      :class="[panel.expandClass]" :tools="panel.expandTools">
      <div style="display: none;">{{panel.width}}×{{panel.height}}</div>
    </ce-panel>

    <div class="layout-split-proxy-h" v-show="splittingH"
         style="display: block; left: 0; height: 5px;" :style="splittingHStyle"></div>
    <div class="layout-split-proxy-v" v-show="splittingV"
         style="display: block; width: 5px;" :style="splittingVStyle"></div>
    <div class="layout-mask" v-show="splitting"
         style="top: 0; left: 0;" :style="layoutMaskStyle"></div>

    <slot></slot>
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
         * 其中，“南” 和 “北” 固定高度，“东” 和 “西” 固定宽度，“中” 按照屏幕剩余自适应
         * 一开始默认这些面板隐藏，待 add 事件后显示对应的面板
         */
        panels: ['north', 'east', 'south', 'west', 'center'].reduce((panels, region) => {
          panels[region] = {
            id: 'layout_panel_' + this.id + '_' + region,
            region: region,
            show: false,
            split: false,
            splitting: false,
            splitClass: '',
            regionClass: 'layout-panel-' + region,
            width: 0, height: 0, left: 0, top: 0,
            tools: [], expandTools: [],
            collapsed: false
          }

          return panels
        }, {}),

        /**
         * 容器宽度
         */
        width: 0,

        /**
         * 容器高度
         */
        height: 0,

        splitTop: 0,

        splitLeft: 0
      }
    },

    computed: {
      /**
       * 是否正在 split
       */
      splitting() {
        return ['north', 'east', 'south', 'west'].some(region => this.panels[region].splitting)
      },

      /**
       * 是否正在垂直 split
       */
      splittingH() {
        return ['east', 'west'].some(region => this.panels[region].splitting)
      },

      /**
       * 是否正在水平 split
       */
      splittingV() {
        return ['north', 'south'].some(region => this.panels[region].splitting)
      },

      layoutMaskStyle() {
        return {
          width: this.width + 'px',
          height: this.height + 'px'
        }
      },

      splittingVStyle() {
        return {
          top: this.splitTop + 'px',
          width: this.width + 'px'
        }
      },

      splittingHStyle() {
        return {
          top: this.panels['center'].top + 'px',
          left: this.splitLeft + 'px',
          height: this.panels['center'].height + 'px'
        }
      }
    },

    methods: {
      addLayoutPanel,
      doLayout,
      onStartResize,
      onStopResize,
      onResize,
      setSplitStyle,
      createPanelTools,
      collapsePanel,
      expandPanel
    },

    mounted() {
    },

    updated() {

    },

    beforeMount() {

    },

    created() {
      // 添加对应的面板
//      LayoutEvents.$on('add', this.addLayoutPanel)
    },

    beforeCreate() {
    }
  }

  function onStopResize(e) {
    let data = e.data,
      region = getResizeRegion(data.dir),
      panel = this.panels[region]

    if (panel) {
      panel.splitting = false

      switch (region) {
        case 'west':
        case 'east':
          panel.width = data.width
          break
        case 'north':
        case 'south':
          panel.height = data.height
          break
        default:
          return
      }

      this.doLayout(this.width, this.height)
    }
    console.log('onStopResize', Object.assign({}, data))
  }

  function setSplitStyle(region, data) {
    switch (region) {
      case 'west':
        this.splitLeft = data.left + (data.width - data.startWidth) + data.startWidth - data.deltaWidth
        break
      case 'east':
        this.splitLeft = data.left
        break
      case 'north':
        this.splitTop = data.top + (data.height - data.startHeight) + data.startHeight - data.deltaHeight
        break
      case 'south':
        this.splitTop = data.top
        break
      default:
        return
    }
  }

  function onResize(e) {
    let data = e.data,
      region = getResizeRegion(data.dir),
      panel = this.panels[region]

    if (panel) {
      this.setSplitStyle(region, data)
    }
  }

  function onStartResize(e) {
    let data = e.data,
      region = getResizeRegion(data.dir),
      panel = this.panels[region]

    if (panel) {
      panel.splitting = true
      this.setSplitStyle(region, data)
    }
    console.log('onStartResize', Object.assign({}, data))
  }

  function getResizeRegion(dir) {
    switch (dir) {
      case 'e':
        return 'west'
      case 'w':
        return 'east'
      case 'n':
        return 'south'
      case 's':
        return 'north'
      default:
        return
    }
  }

  /**
   * 添加对应面板
   * 面板初始化的时候就存在，只是隐藏起来
   * @param layout
   * @param region
   * @param info
   */
  function addLayoutPanel(region, info) {



//    this.panels = Object.assign({}, this.panels, info)

    let panel = this.panels[region]
    if (!panel) return

    panel.show = true
    panel.title = info.title ? info.title : (info.collapsible ? ' ' : undefined)
    panel.width = info.width ? info.width : 0
    panel.height = info.height ? info.height : 0
    panel.split = info.split
    panel.splitHandles = info.splitHandles
    panel.splitClass = info.splitClass
    panel.collapsible = info.collapsible
    panel.collapsedSize = info.collapsedSize
    panel.expandClass = info.expandClass

    if (panel.collapsible) {
      panel.tools = this.createPanelTools(panel, true)
      panel.expandTools = this.createPanelTools(panel, false)
    }

    console.log('addPanel', this.id, region, info)
  }

  function createPanelTools(panel, isCollapse) {
    let iconClass = ''
    switch (panel.region) {
      case 'west':
        iconClass = isCollapse ? 'layout-button-left' : 'layout-button-right'
        break
      case 'east':
        iconClass = isCollapse ? 'layout-button-right' : 'layout-button-left'
        break
      case 'north':
        iconClass = isCollapse ? 'layout-button-up' : 'layout-button-down'
        break
      case 'south':
        iconClass = isCollapse ? 'layout-button-down' : 'layout-button-up'
        break
      default:
    }

    if (!iconClass) return

    return [
      {
          iconClass: iconClass,
          handler: () => isCollapse ? this.collapsePanel(panel) : this.expandPanel(panel)
      }
    ]
  }

  function collapsePanel(panel) {
    if (typeof panel == 'string') {
      panel = this.panels[panel]
      if (!panel) return
    }

    let region = panel.region
    panel.collapsed = true

    if ('west' == region || 'east' == region) {
      panel.lastWidth = panel.width
      panel.width = panel.collapsedSize
    }
    else if ('north' == region || 'south' == region) {
      panel.lastHeight = panel.height
      panel.height = panel.collapsedSize
    }

    this.$nextTick(() => this.doLayout(this.width, this.height))
  }

  function expandPanel(panel) {
    let region = panel.region
    panel.collapsed = false

    if ('west' == region || 'east' == region) {
      panel.width = panel.lastWidth
    }
    else if ('north' == region || 'south' == region) {
      panel.height = panel.lastHeight
    }

    this.$nextTick(() => this.doLayout(this.width, this.height))
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
      offsetNorth = (north.show && !north.split || north.collapsed) ? 1 : 0,
      offsetSouth = (south.show && !south.split || south.collapsed) ? 1 : 0,
      offsetHeight = offsetNorth + offsetSouth,

      offsetWest = (west.show && !west.split || west.collapsed) ? 1 : 0,
      offsetEast = (east.show && !east.split || east.collapsed) ? 1 : 0,
      offsetWidth = offsetWest + offsetEast

    this.width = width
    this.height = height

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

<template>
  <div :id="id" class="panel">
    <div class="panel-header" v-if="!noHeader"
         :class="[{'panel-header-noborder': noBorder}, headerClass]" ref="header">
      <div class="panel-title"
           :class="{'panel-with-icon': hasIcon}">{{title}}</div>
      <div class="panel-icon" v-if="hasIcon"
           :class="[iconClass]" ></div>
      <div class="panel-tool" v-if="tools"></div>
    </div>
    <div class="panel-body" ref="body"
         :class="[{'panel-body-noheader': noHeader, 'panel-body-noborder': noBorder}, bodyClass]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import LayoutEvents from './layout.events'
  import _ from 'underscore'

  // 添加全局窗口改变大小事件
  $(window).on('resize', _.debounce(() => LayoutEvents.$emit('window-resize'), 200))

  export default {
    name: 'ce-panel',

    props: {
      /**
       * The id attribute of this panel
       */
      id: String,

      /**
       * The title text to display in panel header.
       */
      title: String,

      /**
       * Set the panel width.
       */
      width: Number,

      /**
       * Set the panel height.
       */
      height: Number,

      /**
       * Set the panel top position.
       */
      top: Number,

      /**
       * Set the panel left position.
       */
      left: Number,

      /**
       * When true to set the panel size fit it's parent container.
       * The example below shows a panel which can be auto resized to max inner
       * dimensions of its parent container
       */
      fit: Boolean,

      /**
       * If set to true,the panel will be resize and do layout when created.
       */
      doSize: {
        type: Boolean,
        default: true
      },

      /**
       * A CSS class to display a 16x16 icon in panel.
       */
      iconClass: String,

      /**
       * Defines if to show panel border.
       */
      border: {
        type: Boolean,
        default: true
      },

      /**
       * Add a CSS class to the panel header.
       */
      headerClass: String,

      /**
       * Add a CSS class to the panel body.
       */
      bodyClass: String,

      splitHandles: String
    },

    data() {
      return {
        /**
         * Current width of the panel
         */
        currentWidth: 0,

        /**
         * Current height of the panel
         */
        currentHeight: 0,

        isSplit: false
      }
    },

    computed: {
      /**
       * 不显示 panel 头部
       * @returns {boolean}
       */
      noHeader() {
        return !this.title
      },

      /**
       * 不显示 panel 边框
       * @returns {boolean}
       */
      noBorder() {
        return !this.border
      },

      /**
       * 是否显示图标
       * @returns {boolean}
       */
      hasIcon() {
        return !!this.iconClass
      },

      /**
       * 面板工具栏
       */
      tools() {
        //TODO 根据配置生成工具栏按钮
      }
    },

    methods: {
      getLayoutSize,
      setLayoutSize,
      move,
      resize,
      initSplit
    },

    beforeMount() {
      // 需要在beforeMount节点执行，以确保能在子元素之前resize
      this.$nextTick(() => this.resize())
    },
    mounted() {
      // 仅根节点响应窗口resize事件
      if (this.$el === this.$root.$el) {
        LayoutEvents.$on('window-resize', () => this.$nextTick(() => this.resize()))
      }

      this.initSplit()
    },
    updated() {
      this.initSplit()
    },
    beforeUpdate() {
      this.$nextTick(() => this.resize())
    },
    created() {
    }
  }

  function initSplit() {
    let el = $(this.$el)

    if (!this.isSplit && this.splitHandles) {
      console.log('split', this.id, this.splitHandles)
      el.resizable({
        handles: this.splitHandles,
        edge: 10,
        onStartResize(e) {
          console.log('onStartResize', this, e, arguments)
        },
        onResize(e) {
          console.log('onResize', this, e, arguments)
        },
        onStopResize(e) {
          console.log('onStopResize', this, e, arguments)
        }
      })
      this.isSplit = true
    }
  }

  /**
   * 获取面板布局大小
   * @returns {{width: *, height: *}}
   */
  function getLayoutSize() {
    let width = this.width
      , height = this.height

    // 充满父容器
    if (this.fit) {
      let el = $(this.$el).parent()
      while (!el.is('body') && !el.is('.panel-body')) {
        el = el.parent()
      }
      width = el.width()
      height = el.height()
    }

    return { width, height }
  }

  /**
   * 设置面板布局大小
   * @param width
   * @param height
   */
  function setLayoutSize(width, height) {
    console.log('resize', this.id, width, height)

    let el = $(this.$el),
      header = this.$refs.header,
      body = this.$refs.body

    // 改变大小
    el.outerWidth(width)
    el.outerHeight(height)
    this.currentWidth = width
    this.currentHeight = height

    // 调整 body 大小
    let bHeight = el.height()
    bHeight -= header ? $(header).outerHeight() : 0
    $(body).outerHeight(bHeight)

    this.$emit('resize', $(body).width(), $(body).height())
  }

  /**
   * 移动面板
   * @param x
   * @param y
   */
  function move(x, y) {
    let el = $(this.$el)
    el.css('left', x)
    el.css('top', y)
  }

  /**
   * resize
   *
   * 进入此方法并不一定会改变面板的真实大小，只是响应Vue.js的数据监控
   */
  function resize () {
    if (!this.doSize) return

    let el = $(this.$el)

    // 如果节点不可见，不进行后续操作
    if (el.is(':hidden')) return

    // 移动位置
    this.move(this.left, this.top)

    let size = this.getLayoutSize()
      , width = size.width
      , height = size.height

    if (width <= 1 || height <= 1) return

    // 如果大小没有改变，不进行后续操作
    if (this.currentWidth == width && this.currentHeight == height) return

    this.setLayoutSize(width, height)
  }
</script>

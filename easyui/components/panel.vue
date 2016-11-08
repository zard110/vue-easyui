<template>
  <div :id="id" class="panel">
    <div class="panel-header" v-if="!noHeader" :class="[{'panel-header-noborder': noBorder}, headerClass]" ref="header">
      <div class="panel-title" :class="{'panel-with-icon': hasIcon}">{{title}}</div>
      <div class="panel-icon" v-if="hasIcon" :class="[iconClass]" ></div>
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

  $(window).on('resize', _.debounce(() => LayoutEvents.$emit('window-resize'), 200))

  export default {
    name: 'ce-panel',

    props: {
      parentEL: Object,
      id: String,
      title: String,
      width: Number,
      height: Number,
      top: Number,
      left: Number,
      fit: Boolean,
      doSize: {
        type: Boolean,
        default: true
      },
      iconClass: String,
      border: {
        type: Boolean,
        default: true
      },
      headerClass: String,
      bodyClass: String
    },

    data() {
      return {
        lastWidth: 0,
        lastHeight: 0
      }
    },

    computed: {
      noHeader() {
        return !this.title
      },
      noBorder() {
        return !this.border
      },
      hasIcon() {
        return !!this.iconClass
      },
      tools() {
      }
    },

    methods: {
      getLayoutSize,
      setLayoutSize,
      move,
      resize
    },

    beforeMount() {
      this.$nextTick(() => this.resize())
    },
    beforeUpdate() {
      this.$nextTick(() => this.resize())
    },
    created() {
      LayoutEvents.$on('window-resize', () => {
        if (this.$el === this.$root.$el) {
          console.log('to resize', this.id)
          this.$nextTick(() => this.resize())
        }
      })
    }
  }

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

  function setLayoutSize(width, height) {
    console.log('resize', this.id, width, height)

    let el = $(this.$el),
      header = this.$refs.header,
      body = this.$refs.body

    // 改变大小
    el.outerWidth(width);
    el.outerHeight(height);
    this.lastWidth = width
    this.lastHeight = height

    // 调整 body 大小
    let bHeight = el.height()
    bHeight -= header ? $(header).outerHeight() : 0
    $(body).outerHeight(bHeight);

    this.$emit('resize', $(body).width(), $(body).height())
  }

  function move(x, y) {
    let el = $(this.$el)
    el.css('left', x)
    el.css('top', y)
  }

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

    // 如果大小没有改变，不进行后续操作
    if (this.lastWidth == width && this.lastHeight == height) {
      return
    }

    this.setLayoutSize(width, height)
  }
</script>

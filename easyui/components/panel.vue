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

  $(window).on('resize', _.debounce(() => LayoutEvents.$emit('resize'), 200))

  export default {
    name: 'ce-panel',

    props: {
      parentEL: Object,
      id: String,
      title: String,
      region: String,
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
      getLayoutWidth() {

      },

      getLayoutHeight() {

      },

      doLayout () {
        if (!this.doSize) return

        let el = $(this.$el),
          header = this.$refs.header,
          body = this.$refs.body,
          width = this.width,
          height = this.height

        // 如果节点不可见，不进行后续操作
        if (el.is(':hidden')) return

        // 自适应父容器大小
        if (this.fit) {

          // 使用第一个panel-body或者body元素作为父容器
          let parent = el
          while(!parent.is('body') && !parent.is('.panel-body')) {
            parent = parent.parent()
          }
          width = parent.width()
          height = parent.height()
        }

        // 移动位置
        el.css('left', this.left)
        el.css('top', this.top)

        // 如果大小没有改变，不进行后续操作
        if (this.lastWidth == width && this.lastHeight == height) {
          return
        }

        // 改变大小
        el.outerWidth(width);
        el.outerHeight(height);
        this.lastWidth = width
        this.lastHeight = height

        // 调整 body 大小
        let bHeight = el.height();
        bHeight -= header ? $(header).outerHeight() : 0
        $(body).outerHeight(bHeight);

        this.$emit('resize', $(body).width(), $(body).height())
      }
    },

    beforeMount() {
      console.log('!!!!!!!', this.parentEL)
      this.$nextTick(() => this.doLayout('beforeMount'))
    },
    beforeUpdate() {
      this.$nextTick(() => this.doLayout('beforeUpdate'))
    },
    created() {
      LayoutEvents.$on('resize', () => this.$nextTick(() => {
        this.doLayout('resize')
        LayoutEvents.$emit('doLayout')
      }))
    }
  }
</script>

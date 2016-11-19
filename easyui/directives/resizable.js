import $ from 'jquery'
import _ from 'underscore'

export default {
  name: 'resizable',

  bind(el, binding) {
    let options = binding.value
    if (options.disabled) return
    $(el).resizable(options)
  }
}

$.fn.resizable = function(options, params) {
  if (typeof options == 'string'){
    return;
  }

  return this.each(function(){
    let opts = null;
    let state = $.data(this, 'resizable');
    if (state) {
      $(this).unbind('.resizable');
      opts = $.extend(state.options, options || {});
    } else {
      opts = $.extend({}, $.fn.resizable.defaults, options || {});

      $.data(this, 'resizable', {
        options:opts
      });
    }

    if (opts.disabled == true) {
      return;
    }

    // bind mouse event using namespace resizable
    $(this).bind('mousemove.resizable', {target:this}, _.throttle(function(e){
      if ($.fn.resizable.isResizing){return}
      let dir = getDirection(e);
      if (dir == '') {
        $(e.data.target).css('cursor', '');
      } else {
        $(e.data.target).css('cursor', dir + '-resize');
      }
    }, 500)).bind('mouseleave.resizable', {target:this}, function(e){
      $(e.data.target).css('cursor', '');
    }).bind('mousedown.resizable', {target:this}, function(e){
      let dir = getDirection(e);
      if (dir == '') return;

      function getCssValue(css) {
        let val = parseInt($(e.data.target).css(css));
        if (isNaN(val)) {
          return 0;
        } else {
          return val;
        }
      }

      let data = {
        target: e.data.target,
        dir: dir,
        startLeft: getCssValue('left'),
        startTop: getCssValue('top'),
        left: getCssValue('left'),
        top: getCssValue('top'),
        startX: e.pageX,
        startY: e.pageY,
        startWidth: $(e.data.target).outerWidth(),
        startHeight: $(e.data.target).outerHeight(),
        width: $(e.data.target).outerWidth(),
        height: $(e.data.target).outerHeight(),
        deltaWidth: $(e.data.target).outerWidth() - $(e.data.target).width(),
        deltaHeight: $(e.data.target).outerHeight() - $(e.data.target).height()
      };
      $(document).bind('mousedown.resizable', data, doDown);
      $(document).bind('mousemove.resizable', data, doMove);
      $(document).bind('mouseup.resizable', data, doUp);
      $('body').css('cursor', dir+'-resize');
    });

    // get the resize direction
    function getDirection(e) {
      let tt = $(e.data.target);
      let dir = '';
      let offset = tt.offset();
      let width = tt.outerWidth();
      let height = tt.outerHeight();
      let edge = opts.edge;
      if (e.pageY > offset.top && e.pageY < offset.top + edge) {
        dir += 'n';
      } else if (e.pageY < offset.top + height && e.pageY > offset.top + height - edge) {
        dir += 's';
      }
      if (e.pageX > offset.left && e.pageX < offset.left + edge) {
        dir += 'w';
      } else if (e.pageX < offset.left + width && e.pageX > offset.left + width - edge) {
        dir += 'e';
      }

      let handles = opts.handles.split(',');
      for(let i=0; i<handles.length; i++) {
        let handle = handles[i].replace(/(^\s*)|(\s*$)/g, '');
        if (handle == 'all' || handle == dir) {
          return dir;
        }
      }
      return '';
    }
  });
}

$.fn.resizable.defaults = {
  disabled:false,
  handles:'n, e, s, w, ne, se, sw, nw, all',
  minWidth: 10,
  minHeight: 10,
  maxWidth: 10000,//$(document).width(),
  maxHeight: 10000,//$(document).height(),
  edge:5,
  onStartResize: function(e){},
  onResize: function(e){},
  onStopResize: function(e){}
};

function resize(e){
  let resizeData = e.data;
  let options = $.data(resizeData.target, 'resizable').options;
  if (resizeData.dir.indexOf('e') != -1) {
    let width = resizeData.startWidth + e.pageX - resizeData.startX;
    width = Math.min(
      Math.max(width, options.minWidth),
      options.maxWidth
    );
    resizeData.width = width;
  }
  if (resizeData.dir.indexOf('s') != -1) {
    let height = resizeData.startHeight + e.pageY - resizeData.startY;
    height = Math.min(
      Math.max(height, options.minHeight),
      options.maxHeight
    );
    resizeData.height = height;
  }
  if (resizeData.dir.indexOf('w') != -1) {
    let width = resizeData.startWidth - e.pageX + resizeData.startX;
    width = Math.min(
      Math.max(width, options.minWidth),
      options.maxWidth
    );
    resizeData.width = width;
    resizeData.left = resizeData.startLeft + resizeData.startWidth - resizeData.width;
  }
  if (resizeData.dir.indexOf('n') != -1) {
    let height = resizeData.startHeight - e.pageY + resizeData.startY;
    height = Math.min(
      Math.max(height, options.minHeight),
      options.maxHeight
    );
    resizeData.height = height;
    resizeData.top = resizeData.startTop + resizeData.startHeight - resizeData.height;
  }
}

function applySize(e){
  let resizeData = e.data;
  let t = $(resizeData.target);
  t.css({
    left: resizeData.left,
    top: resizeData.top
  });
  if (t.outerWidth() != resizeData.width){t.outerWidth(resizeData.width)}
  if (t.outerHeight() != resizeData.height){t.outerHeight(resizeData.height)}
}

function doDown(e){
  $.fn.resizable.isResizing = true;
  $.data(e.data.target, 'resizable').options.onStartResize.call(e.data.target, e);
  return false;
}

function doMove(e){
  resize(e);
  if ($.data(e.data.target, 'resizable').options.onResize.call(e.data.target, e) != false){
    applySize(e)
  }
  return false;
}

function doUp(e){
  $.fn.resizable.isResizing = false;
  resize(e, true);

  if ($.data(e.data.target, 'resizable').options.onStopResize.call(e.data.target, e) != false) {
    applySize(e);
  }
  $(document).unbind('.resizable');
  $('body').css('cursor','');
  return false;
}





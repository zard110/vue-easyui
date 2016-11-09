import $ from 'jquery'
import Resizable from './jquery.resizable'

Resizable()

export default {
  name: 'resizable',

  bind (el) {
    $(el).resizable()
  }
}

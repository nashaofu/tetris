<template>
<div class="app" :style="size">
  <div class="rect" :class="drop?'drop':''">
    <Decorate/>
    <div class="screen">
      <div class="panel">
        <Matrix :propMatrix="matrix" :cur="cur" :reset="reset" />
        <Logo :cur="!!cur" :reset="reset" />
        <div class="state">
          <Point :cur="!!cur" :max="max" :point="points" />
          <p>{{pContent}}</p>
          <Number :number='cur ? clearLines : startLines' />
          <p>{{level}}</p>
          <Number :number='cur?speedRun:speedStart' :length="1" />
          <p>{{nextText}}</p>
          <Next :data="next" />
          <div class="bottom">
            <Music :data="music" />
            <Pause :data="pause" />
            <Number :propTime="true" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <Keyboard :filling='filling' />
</div>
</template>

<script>
import Decorate from './components/decorate/index.vue'
import Next from './components/next/index.vue'
import Music from './components/music/index.vue'
import Pause from './components/pause/index.vue'
import Number from './components/number/index.vue'
import Point from './components/point/index.vue'
import Keyboard from './components/keyboard/index.vue'
import Logo from './components/logo/index.vue'
import Matrix from './components/matrix/index.vue'
import { mapState } from 'vuex'
import { transform, lastRecord, speeds, i18n, lan } from './unit/const'
import { visibilityChangeEvent, isFocus } from './unit/'
import states from './control/states'

export default {
  watch: {
    w () {
      this.render()
    },
    h () {
      this.render()
    }
  },
  mounted () {
    this.render()
    window.addEventListener('resize', this.resize.bind(this), true)
  },
  data () {
    return {
      size: {},
      w: document.documentElement.clientWidth,
      h: document.documentElement.clientHeight,
      filling: ''
    }
  },
  components: {
    Decorate,
    Next,
    Music,
    Pause,
    Number,
    Point,
    Logo,
    Keyboard,
    Matrix
  },
  computed: {
    pContent () {
      return this.cur ? i18n.cleans[lan] : i18n.startLine[lan]
    },
    level: () => i18n.level[lan],
    nextText: () => i18n.next[lan],
    ...mapState([
      'matrix',
      'keyboard',
      'music',
      'pause',
      'next',
      'cur',
      'speedStart',
      'speedRun',
      'startLines',
      'clearLines',
      'points',
      'max',
      'reset',
      'drop'
    ])
  },
  methods: {
    render () {
      let filling = 0
      const size = (() => {
        const w = this.w
        const h = this.h
        const ratio = h / w
        let scale
        let css = {}
        if (ratio < 1.5) {
          scale = h / 960
        } else {
          scale = w / 640
          filling = (h - 960 * scale) / scale / 3
          css = {
            'padding-top': Math.floor(filling) + 42 + 'px',
            'padding-bottom': Math.floor(filling) + 'px',
            'margin-top': Math.floor(-480 - filling * 1.5) + 'px'
          }
        }
        css[transform] = `scale(${scale})`
        return css
      })()
      this.size = size
      // this.start()
      this.filling = filling
    },
    resize () {
      this.w = document.documentElement.clientWidth
      this.h = document.documentElement.clientHeight
      this.render()
    },
    start () {
      if (visibilityChangeEvent) {
        // 将页面的焦点变换写入store
        document.addEventListener(
          visibilityChangeEvent,
          () => {
            states.focus(isFocus())
          },
          false
        )
      }

      if (lastRecord) {
        // 读取记录
        if (lastRecord.cur && !lastRecord.pause) {
          // 拿到上一次游戏的状态, 如果在游戏中且没有暂停, 游戏继续
          const speedRun = this.$store.state.speedRun
          let timeout = speeds[speedRun - 1] / 2 // 继续时, 给予当前下落速度一半的停留时间
          // 停留时间不小于最快速的速度
          timeout = speedRun < speeds[speeds.length - 1]
            ? speeds[speeds.length - 1]
            : speedRun
          states.auto(timeout)
        }

        if (!lastRecord.cur) {
          states.overStart()
        }
      } else {
        states.overStart()
      }
    }
  }
}
</script>

<style lang="less">
body {
  padding: 0;
  margin: 0;
  font: 20px/1 "HanHei SC", "PingHei", "PingFang SC", "STHeitiSC-Light", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  overflow: hidden;
  cursor: default;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  direction: ltr;
  text-align: left;
}

:global {
  .r {
    float: right;
  }
  .l {
    float: left;
  }
  .clear {
    clear: both;
  }
  b {
    display: block;
    width: 20px;
    height: 20px;
    padding: 2px;
    border: 2px solid #879372;
    margin: 0 2px 2px 0;
    float: left;
    &:after {
      content: '';
      display: block;
      width: 12px;
      height: 12px;
      background: #879372;
      overflow: hidden;
    }
    &.c {
      border-color: #000;
      &:after {
        background: #000;
      }
    }
    &.d {
      border-color: #560000;
      &:after {
        background: #560000;
      }
    }
  }
  .bg {
    background: url('//img.alicdn.com/tps/TB1qq7kNXXXXXacXFXXXXXXXXXX-400-186.png') no-repeat;
    overflow: hidden;
  }
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app {
  width: 640px;
  padding-top: 42px;
  box-shadow: 0 0 10px #fff inset;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -480px 0 0 -320px;
  background: #efcc19;
}

.rect {
  width: 480px;
  padding: 45px 0 35px;
  border: #000 solid;
  border-width: 0 10px 10px;
  margin: 0 auto;
  position: relative;
  &.drop {
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
  }
}

.screen {
  width: 390px;
  height: 478px;
  border: solid 5px;
  border-color: #987f0f #fae36c #fae36c #987f0f;
  margin: 0 auto;
  position: relative;
  .panel {
    width: 380px;
    height: 468px;
    margin: 0 auto;
    background: #9ead86;
    padding: 8px;
    border: 2px solid #494536;
  }
}

.state {
  width: 108px;
  position: absolute;
  top: 0;
  right: 15px;
  p {
    line-height: 47px;
    height: 57px;
    padding: 10px 0 0;
    white-space: nowrap;
    clear: both;
  }
  .bottom {
    position: absolute;
    width: 114px;
    top: 426px;
    left: 0;
  }
}
</style>

<template>
  <svg class="map" x="0px" y="0px" viewBox="0 0 1073.5 1008" :width="width ? `${width}px` : '100%'">
    <path class="st0" d="M1069,680.5"/>
    <path :stroke="theFill" class="st1" d="M1069,414.1"/>
    <polyline :stroke="theFill" class="st1" points="1054.5,414.5 1069,414.1 1069,4 4,4 4,565 645,565 645,1004 1069,1004 1069,680.5 1054.5,680.5 "/>
    <polyline :stroke="theFill" class="st1" points="644.5,932.5 846,932 846.1,1004.5 "/>
    <polyline :stroke="theFill" class="st1" points="1069.3,932.5 897,932 896.5,1004.5 "/>
    <polyline :stroke="theFill" class="st1" points="75.7,306 248,306 248,500 53,500 53,342.1 "/>
    <rect :stroke="theFill" x="283.9" y="305.7" class="st1" width="195" height="194.8"/>
    <circle :stroke="theFill" class="st1" cx="741.5" cy="712.5" r="75.5"/>
    <circle :stroke="theFill" class="st1" cx="741.5" cy="540.5" r="75.5"/>
    <rect :stroke="theFill" x="630" y="285" class="st1" width="180" height="158"/>
    <rect :stroke="theFill" x="630" y="198" class="st1" width="180" height="72"/>
    <path :stroke="theFill" class="st2" d="M646.5,435.5l-32-264l204,12L819,327l-51,15c0,0-21,7-16,31s33,18,33,18l69-23c0,0,15-5,16-20s0-40,0-40V168 c0,0,1-27-31-29s-117-7-117-7l-128-8c0,0-31-1-26,35s35,297,35,297s0,13,20,25s106,79,106,79s19,15,35-6s-8-37-8-37L646.5,435.5z"/>
    <polyline :stroke="theFill" class="st1" points="2.7,140.5 75,140 75,342 2.7,342.1 "/>
    <line :stroke="theFill" class="st1" x1="1069.5" y1="428.5" x2="1069.5" y2="666.5"/>
  </svg>
</template>

<script>
export default {
  name: 'MapSvg',
  props: [
    'width',
    'fill'
  ],
  computed: {
    theFill () {
      return this.fill ? this.fill : '#0000FF'
    }
  }
}
</script>

<style lang="scss" scoped>
  .map {
    .st0{fill:none;stroke:#000000;stroke-width:8;stroke-miterlimit:10;}
    .st1{fill:none;stroke-width:8;stroke-miterlimit:10;}
    .st2{fill:#FFFFFF;stroke-width:8;stroke-miterlimit:10;}
  }
</style>

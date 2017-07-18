<template>
<div class="button" :class="color+' '+size" :style="'top:'+top+'px;'+'left:'+left+'px'">
  <i :class="{'active':active}"></i>
  <em :style="'transform:'+arrow+' scale(1,2)'" v-show="size==='s1'"></em>
  <span :class="position?'position':''">
    {{label}}
  </span>
</div>
</template>

<script src="./index.js"></script>
<style lang="less" src="./index.less"></style>

<template>
<div class="next">
  <div
    v-for="(item,index) in block"
    :key="index"
  >
    <b
      v-for="(e,k2) in item"
      :key="k2"
      :class="e ? 'c' : ''"
    ></b>
  </div>
</div>
</template>

<script src="./index.js"></script>
<style lang="less" src="./index.less"></style>

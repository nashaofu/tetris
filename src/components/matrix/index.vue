<template>
<div class="matrix">
  <p
    v-for="(p, k1) in matrix"
    :key="k1"
  >
    <b
      v-for="(e, k2) in p"
      :key="k2"
      :class="e | getClass"
    ></b>
  </p>
</div>
</template>

<script src="./index.js"></script>
<style lang="less" src="./index.less"></style>

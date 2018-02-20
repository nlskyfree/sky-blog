<template>
  <div class="empty-box">
    <slot>No Result Data.</slot>
  </div>
</template>

<script>
  export default {
    name: 'empty-box'
  }
</script>

<style lang="less">
  .empty-box {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 5em;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
</style>
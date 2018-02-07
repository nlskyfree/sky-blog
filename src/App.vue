<template>
  <div id="app" v-cloak>
    <div id="app-main">
      <background></background>
      <layout-header></layout-header>
      <main id="main">
        <layout-nav></layout-nav>
        <layout-aside></layout-aside>
      </main>
      <layout-footer></layout-footer>
    </div>
  </div>
</template>
<script>
  import header from 'components/header'
  import footer from 'components/footer'
  import nav from 'components/nav'
  import aside from 'components/aside'
  import background from 'components/background'
  export default {
    data() {
      return {
        msg: 'hello world'
      }
    },
    components: {
      background,
      "layout-header": header,
      "layout-footer": footer,
      "layout-nav": nav,
      "layout-aside": aside
    }
  }
</script>
<style lang="less" scoped>
@import '~less/mixins';
@import '~less/variables';
#app {

  &[v-cloak] {
    color: transparent;
    -webkit-text-fill-color: transparent;
  }

  #app-main {
    transition: @mobile-aisde-transition;

    &.open {
      transition: @mobile-aisde-transition;
      transform: translateX(68%);
    }

    main {
      position: relative;

      &.service {
        width: 100%;
      }
    }
  }
}
</style>
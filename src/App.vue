<template>
  <div id="app" v-cloak>
    <div id="app-main">
      <background></background>
      <layout-header></layout-header>
      <main id="main">
        <layout-nav v-if="!oneColumn && !mobileLayout"></layout-nav>
        <div id="main-content" 
             class="main-content" 
             :class="{ 
               'two-column': twoColumn, 
               'one-column': oneColumn,
               'mobile-layout': mobileLayout,
               [$route.name]: true
              }">
          <router-view></router-view>
        </div>
        <layout-aside v-if="!twoColumn && !oneColumn && !mobileLayout"></layout-aside>
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
  import UaParse from 'utils/ua-parse'

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
      "layout-aside": aside,
    },

    computed: {
      twoColumn () {
        return this.$store.state.option.twoColumn
      },
      oneColumn () {
        return this.$store.state.option.oneColumn
      },
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      },
    },
    
    mounted() {
      // 加载配置
      const userAgent = process.server ? req.headers['user-agent'] : navigator.userAgent
      const { isMobile, isOpera, isIE, isSafari, isEdge, isFF, isBB, isChrome, isMaxthon, isIos } = UaParse(userAgent)
      const mustJpg = (isIos || isFF || isMaxthon || isSafari || isBB || isIE || isEdge)
      this.$store.commit('option/SET_IMG_EXT', mustJpg ? 'jpeg' : 'webp')
      this.$store.commit('option/SET_MOBILE_LAYOUT', isMobile)
      this.$store.commit('option/SET_USER_AGENT', userAgent)
      this.$store.dispatch('loadHotArticles')
      // 配置数据
      // this.$store.dispatch('loadAdminInfo'),
      // this.$store.dispatch('loadGlobalOption'),
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

      .main-content {
        float: left;
        width: 42.5em;
        margin: 0 0 0 12.5em;
        position: relative;
        overflow: hidden;
        .css3-prefix(transition, width .35s);

        &:-moz-full-screen {
          overflow-y: auto;
        }
          
        &:-webkit-full-screen {
          overflow-y: auto;
        }
          
        &:fullscreen {
          overflow-y: auto;
        }

        &.two-column {
          width: 62.5em;
          .css3-prefix(transition, width .35s);
        }

        &.one-column {
          width: 100%;
          margin: 0;
          .css3-prefix(transition, width .35s);
        }

        &.mobile-layout {
          width: 100%;
          margin: 0;
          padding: 1rem;
          padding-top: @navbar-height + 1;
        }

        &.service {
          width: 100%;
          margin: -1em 0;

          &.mobile-layout {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
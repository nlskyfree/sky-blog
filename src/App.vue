<template>
  <div id="app" v-cloak>
    <div id="app-main">
      <background></background>
      <layout-header></layout-header>
      <main id="main">
        <layout-nav></layout-nav>
        <div class="main-content">
          <announcement :announcement="announcement"></announcement>
          <article-list :article="article" @loadmore="loadmoreArticle"></article-list>
        </div>
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
  import announcement from 'components/announcement'
  import ArticleList from 'components/article-list'

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
      announcement,
      "article-list": ArticleList
    },
    computed: {
      article() {
        return this.$store.state.article.list
      },
      announcement() {
        return this.$store.state.announcement
      }
    },
    methods: {
      loadmoreArticle() {
        this.$store.dispatch('loadArticles', this.nextPageParams)
      }
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

        &.full-column {
          width: 62.5em;
          .css3-prefix(transition, width .35s);
        }

        &.error-column {
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
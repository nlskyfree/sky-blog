<template>
  <div class="main">
    <announcement :announcement="announcement"></announcement>
    <article-list :article="article" @loadmore="loadmoreArticle"></article-list>
  </div>
</template>

<script>
import announcement from "components/announcement";
import ArticleList from "components/article-list";

export default {
  components: {
    announcement,
    "article-list": ArticleList
  },

  computed: {
    article() {
      return this.$store.state.article.list;
    },
    announcement() {
      return this.$store.state.announcement;
    }
  },

  methods: {
    loadmoreArticle() {
      this.$store.dispatch("loadArticles", this.nextPageParams);
    }
  },

  mounted() {
    this.$store.dispatch("loadAnnouncements");
    this.loadmoreArticle();
  }
};
</script>

<style lang="less" scoped>

</style>
<template>
  <div class="aside-nav">
    <nav class="nav-list">
      <router-link :to="'/'" class="item" exact>
        <i class="iconfont icon-home"></i>
        <span>Home</span>
      </router-link>
      <router-link to="/sitemap" class="item">
        <i class="iconfont icon-code"></i>
        <span>Sitemap</span>
      </router-link>
      <router-link to="/project" class="item">
        <i class="iconfont icon-tool"></i>
        <span>Project</span>
      </router-link>
      <router-link to="/about" class="item">
        <i class="iconfont icon-user"></i>
        <span>About</span>
      </router-link>
      <router-link to="/guestbook" class="item">
        <i class="iconfont icon-comment"></i>
        <span>Guestbook</span>
      </router-link>
      <router-link to="/music" class="item">
        <i class="iconfont icon-netease-music"></i>
        <span>Music</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'layout-nav'
  }
</script>

<style lang="less" scoped>
  @import '~less/variables';
  .aside-nav {
    position: fixed;
    display: inline-block;
    width: 11.5em;
    top: 5.5em;
    left: calc(~"(100% - 75em) / 2");

    .nav-list {
      padding: 0;
      margin: 0;

      > .item {
        border: none;
        display: block;
        width: 100%;
        height: 3em;
        line-height: 3em;
        padding: 0 1em;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 700;
        border-radius: 1px;
        color: #777;
        font-family: DINRegular, CenturyGothic;
        margin-bottom: .5em;

        &:hover {
          color: @primary;
        }
        
        &.ad {
          height: 5rem;
          line-height: 5rem;
          margin: 0;
          border-bottom: 1px dashed #d6d6d6;
        }

        &.link-active {
          background-color: #eee;
          font-weight: bold;
          color: @primary;
          background-color: @module-bg;
        }

        .iconfont {
          width: 1em;
          margin-right: 1em;
          display: inline-block;
        }
      }
    }
  }
</style>

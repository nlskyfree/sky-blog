<template>
  <div class="page" :class="{ mobile: mobileLayout }">
    <div class="detail">
      <div class="content">
        <div class="guestbook-banner">
          <img src="../../images/guestbook.jpg">
          <span>此心光明 亦复何言</span>
        </div>
      </div>
    </div>
    <div class="comment">
      <comment-box :post-id="0" 
                   :likes="$store.state.option.globalOption.data.likes">
      </comment-box>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'guestbook',
    head: {
      title: 'Guestbook'
    },
    computed: {
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      }
    }
  }
</script>

<style lang="less" scoped>
@import '~less/variables';
@import '~less/mixins';
  .page {

    &.mobile {

      > .detail {

        > .content {
          height: 11em;

          > .guestbook-banner {
            height: 11em;
          }
        }
      }
    }

    .detail {
      margin-bottom: 1em;
      background-color: @module-bg;

      .content {
        width: 100%;
        height: 17em;
        overflow:  hidden;

        .guestbook-banner {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 17em;
          border: 0;

          img {
            margin-top: -5em;
            .css3-prefix(transition, all 1s);

            &:hover {
              margin-top: -6em;
              .css3-prefix(transform, rotate(2deg) scale(1.1));
              .css3-prefix(transition, all 1s);
            }
          }

          span {
            position: absolute;
            right: 2em;
            bottom: 2em;
            display: block;
            font-weight: 700;
            opacity: .5;
            cursor: pointer;
            padding: 0 1em;
            height: 2em;
            line-height: 2em;
            background-color: @module-bg;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="article" :class="{ mobile: mobileLayout }">
    <div class="detail">
      <h2 class="title">{{ article.title || '...' }}</h2>
      <transition name="module" mode="out-in">
        <empty-box class="article-empty-box" v-if="!article.title">
          <slot>No Result Article.</slot>
        </empty-box>
      </transition>
      <transition name="module" mode="out-in">
        <div class="content" v-html="articleContent" v-if="article.content"></div>
      </transition>
      <transition name="module" mode="out-in">
        <div class="readmore" v-if="canReadMore">
          <button class="readmore-btn" :disabled="readMoreLoading" @click="readMore()">
            <span>{{ !readMoreLoading ? '阅读余下全文' : '渲染中...' }}</span>
            <i class="iconfont icon-next-bottom"></i>
          </button>
        </div>
      </transition>
    </div>
    <transition name="module" mode="out-in">
      <div class="metas" v-if="article.title">
        <p class="item">
          <span>本文于</span>
          <span>&nbsp;</span>
          <router-link :title="buildDateTitle(article.createAt)"
                       :to="buildDateLink(article.createAt)">
            <span>{{ buildDateTitle(article.createAt) }}</span>
          </router-link>
          <span>&nbsp;发布在&nbsp;</span>
          <router-link :key="index"
                       :to="`/category/${category.slug}`"
                       :title="category.description || category.name"
                       v-for="(category, index) in article.categories">
            <span>{{ category.name }}</span>
            <span v-if="article.categories.length && article.categories[index + 1]">、</span>
          </router-link>
          <span v-if="!article.categories.length">未知</span>
          <span>&nbsp;分类下，当前已被围观&nbsp;</span>
          <span>{{ article.views || 0 }}</span>
          <span>&nbsp;次</span>
        </p>
        <p class="item">
          <span>相关标签：</span>
          <span v-if="!article.tags.length">无相关标签</span>
          <router-link :key="index"
                       :to="`/tag/${tag.slug}`"
                       :title="tag.description || tag.name"
                       v-for="(tag, index) in article.tags">
            <span>{{ tag.name }}</span>
            <span v-if="article.tags.length && article.tags[index + 1]">、</span>
          </router-link>
        </p>
        <div class="item">
          <span>版权声明：</span>
          <span>自由转载-署名-非商业性使用</span>
          <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <a href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh"
             target="_blank"
             rel="external nofollow noopenter">Creative Commons BY-NC 3.0 CN</a>
        </div>
      </div>
    </transition>
    <div class="comment">
      <comment-box :post-id="article.id"
                   :likes="article.likes"
                   v-if="article.title">
      </comment-box>
    </div>
  </div>
</template>

<script>
  import Clipboard from 'clipboard'
  import marked from 'utils/marked'

  export default {
    name: 'article-detail',
    validate ({ params, store }) {
      return (!!params.article_id && !Object.is(Number(params.article_id), NaN))
    },
    head() {
      const article = this.article
      return {
        title: article.title || 'No Result Data.',
        meta: [
          { hid: 'keywords', 
            name: 'keywords', 
            content: (article.keywords ? article.keywords.join(',') : article.title) || ''
          },
          { hid: 'description', name: 'description', content: article.description }
        ]
      }
    },
    data() {
      return {
        swiperOption: {
          autoplay: 3500,
          setWrapperSize :true,
          mousewheelControl : true,
          autoplayDisableOnInteraction: false,
          observeParents:true,
          grabCursor : true,
          slidesPerView: 'auto',
          spaceBetween: 14
        },
        canReadMore: false,
        fullContentEd: false,
        readMoreLoading: false
      }
    },
    mounted() {
      this.clipboard();
      this.$store.dispatch('loadArticleDetail', this.$route.params);
    },
    computed: {
      article() {
        return this.$store.state.article.detail.data
      },
      articleContent() {
        let content = this.article.content
        if (!content) return ''
        const hasTags = !!this.tags.length
        if (content.length > 13688 && !this.fullContentEd) {
          this.canReadMore = true
          let shortContent = content.substring(0, 11688)
          let lastH4Index = shortContent.lastIndexOf('\n####')
          let lastH3Index = shortContent.lastIndexOf('\n###')
          let lastCodeIndex = shortContent.lastIndexOf('\n\n```')
          let lastLineIndex = shortContent.lastIndexOf('\n\n**')
          let lastReadindex = Math.max(lastH4Index, lastH3Index, lastCodeIndex, lastLineIndex);
          // console.log(lastH4Index, lastH3Index, lastCodeIndex, lastLineIndex, 'min', lastReadindex)
          shortContent = shortContent.substring(0, lastReadindex)
          return marked(shortContent, hasTags ? this.tags.data : false, true)
        } else {
          this.canReadMore = false
          return marked(content, hasTags ? this.tags.data : false, true)
        }
      },
      fetching() {
        return this.$store.state.article.detail.fetching
      },
      tags() {
        return this.$store.state.tag.data
      },
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      },
      imgExt() {
        return this.$store.state.option.imgExt
      }
    },
    methods: {
      readMore() {
        this.readMoreLoading = true
        this.$nextTick(() => {
          setTimeout(() => {
            this.fullContentEd = true
          }, 0)
        })
      },
      clipboard() {
        if (this.article.title) {
          this.clipboard = new Clipboard(this.$refs.copy_url_btn)
        }
      },
      buildThumb(thumb) {
        if (!thumb) return `${this.cdnUrl}/images/thumb-releted.jpg`
        return `${thumb}?imageView2/1/w/300/h/230/format/${this.imgExt}/interlace/1/q/80|imageslim`
      },
      buildDateTitle(date) {
        if (!date) return date
        date = new Date(date)
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours() > 11 ? '下午' : '上午'}`
      },
      buildDateLink(date) {
        if (!date) return date
        date = new Date(date)
        let year = date.getFullYear()
        let month = (date.getMonth() + 1).toString()
        let day = date.getDate().toString()
        month = Object.is(month.length, 1) ? `0${month}` : month
        day = Object.is(day.length, 1) ? `0${day}` : day
        return `/date/${year}-${month}-${day}`
      }
    }
  }
</script>

<style lang="less">
@import '~less/variables';
@import '~less/mixins';
  .article {

    &.mobile {

      > .metas {
        padding: 1em;
        line-height: 2.3em;

        > .item {
          margin: 0;
        }
      }

      > .detail {

        > .content {

          pre {
            padding-left: 0;

            > .code-lines {
              display: none;
            }
          }
        }
      }
    }

    > .detail,
    > .metas {
      margin-bottom: 1em;
      background-color: @module-bg;
    }

    > .detail {
      padding: 1em 2em;

      > .title {
        text-align: center;
        margin: 1em 0 1.5em 0;
        font-weight: 700;
      }

      > .content {

        iframe {
          width: 100%;
          margin-bottom: 1em;
          background-color: black;
        }

        a {
          font-weight: bold;
          margin: 0 .1em;

          &.image-link {
            margin: 0;
          }

          &:hover {
            text-decoration: underline;
          }
        }

        img {
          max-width: 100%;
          margin: 0 auto;
          display: block;
          text-align: center;
          border-radius: @radius;
          border: .5rem solid @module-hover-bg;
          transition: all .25s;
          opacity: .9;
          cursor: pointer;

          &:hover {
            opacity: 1;
            transition: all .25s;
          }
        }

        p {
          line-height: 2.2em;
          text-indent: 2em;
          margin-bottom: 1em;

          &.text-center {
            text-align: center;
          }

          &.text-right {
            text-align: right;
          }
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 1.5rem 0;
          padding-left: 0;
          line-height: 1.8em;
          font-weight: 700;
          text-indent: 0;
        }

        blockquote {

          p {
            // text-indent: 0em;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }

        ul {
          list-style-type: square;
        }

        ul, ol {

          > li {
            line-height: 1.8em;
            padding: .5em .8em;

            &:hover {
              background-color: rgba(230, 230, 230, 0.7);
            }

            > p {
              text-indent: 0;
            }

            > ul {

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }

        code {
          color: #bd4147;
          padding: .3em .5em;
          margin: 0 .5em;
          border-radius: @radius;
          background-color: @module-hover-bg;
        }

        pre {
          display: block;
          position: relative;
          overflow: hidden;
          margin-bottom: 1em;
          padding-left: 2.5em;
          background-color: rgba(0, 0, 0, 0.8);

          &:before {
            color: white;
            content: attr(data-lang)" CODE";
            height: 2.8em;
            line-height: 2.8em;
            font-size: 1em;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            font-weight: 700;
            background-color: rgba(68, 68, 68, 0.9);
            display: block;
            text-transform: uppercase;
            text-align: center;
          }

          > .code-lines {
            position: absolute;
            left: 0;
            top: 2.8em;
            margin: 0;
            padding: 1em 0;
            width: 2.5em;
            height: calc(100% - 2.8em);
            text-align: center;
            background-color: rgba(0, 0, 0, 0.2);

            > .code-line-number {
              padding: 0;
              position: relative;
              list-style-type: none;
              line-height: 1.6em;
              transition: background-color .05s;

              &:hover {
                &:before {
                  display: block;
                  opacity: 1;
                  visibility: visible;
                }
              }

              &:before {
                content: '';
                height: 1.6em;
                position: absolute;
                top: 0;
                left: 2.5em;
                width: 66em;
                background-color: rgba(154, 154, 154, 0.2);
                display: none;
                visibility: hidden;
                opacity: 0;
              }
            }
          }

          > code {
            margin: 0;
            padding: 1em;
            float: left;
            width: 100%;
            height: 100%;
            display: block;
            line-height: 1.6em;
            color: rgba(255, 255, 255, 0.87);
            background-color: transparent;
          }
        }
      }

      @keyframes readmorebtn {
        0% { 
          transform: translate3d(0, 0, 0);
          background-color: @module-hover-bg;
        }
        25% { 
          transform: translate3d(0, .5rem, 0);
          background-color: @primary;
          color: white;
        }
        50% { 
          transform: translate3d(0, 0, 0);
          background-color: @module-hover-bg;
        }
        75% { 
          transform: translate3d(0, .5rem, 0);
          background-color: @primary;
          color: white;
        }
        100% { 
          transform: translate3d(0, 0, 0);
          background-color: @module-hover-bg;
        }
      }

      > .readmore {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: .8rem;

        > .readmore-btn {
          width: 80%;
          text-align: center;
          height: 3rem;
          line-height: 3rem;
          background-color: @module-hover-bg;
          animation: readmorebtn 4s linear infinite;

          &[disabled] {
            cursor: no-drop;
          }

          &:hover {
            background-color: @primary!important;
            color: white!important;
          }

          > .iconfont {
            margin-left: .5rem;
          }
        }
      }
    }

    .article-share {
      padding: .8em;
      margin-bottom: 1em;
      background-color: @module-bg;
    }

    > .metas {
      padding: 1em 1.5em;

      > .item {

        a:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>

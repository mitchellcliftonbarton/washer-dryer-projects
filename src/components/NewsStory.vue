<template>
  <div class="news-story page">
    <p class="headline">{{ theStory.title }}</p>
    <div class="date">
      <p>{{ theStory.date }}</p>
      <router-link to="/news">Back to news</router-link>
    </div>
    <img :src="require(`@/assets/img/${theStory.image}`)">
    <div class="content">
      <p v-html="theStory.content" class="content"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsStory',
  computed: {
    theStory () {
      return this.$store.state.news.find(s => s.link === this.$route.params.story)
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss">
  @import "@/assets/scss/main.scss";

  #app .news-story {
    p, a, span {
      font-size   : 1rem;
      line-height : 1.5rem;
      margin      : 0px;

      @include breakpoint(sm-up) {
        font-size   : 1.5rem;
        line-height : 2.3rem;
      }
    }

    div.content {
      margin-bottom : 100px;

      @include breakpoint(sm-up) {
        padding-left : 15%;
      }

      a, p {
        text-transform : none;
      }

      .dark {
        color : black;
      }
    }

    .headline {
      font-size     : 1rem;
      line-height   : 1.5rem;
      margin-bottom : 20px;
      color         : black;

      @include breakpoint(sm-up) {
        font-size   : 3rem;
        line-height : 3.4rem;
      }
    }

    img {
      width         : 100%;
      margin-bottom : 50px;

      @include breakpoint(sm-up) {
        width : 50%;
      }
    }

    .date {
      display       : flex;
      margin-bottom : 30px;

      a {
        padding-left : 30px;
      }
    }
  }
</style>

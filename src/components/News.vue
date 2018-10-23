<template>
  <div class="news page">
    <h1>NEWS</h1>
    <div v-for="(story, index) in this.$store.state.news" :key="index" class="story">
      <img :src="require(`@/assets/img/${story.image}`)">
      <div class="story-info">
        <router-link :to="`/news/${story.link}`">{{ story.title }}</router-link>
        <p>{{ story.date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News'
}
</script>

<style lang="scss">
  @import "@/assets/scss/main.scss";

  .news {
    .story {
      border-top: 2px solid #b6c1bb;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0px;

      @include breakpoint(sm-up) {
        flex-direction: row;
      }

      &:last-child {
        border-bottom: 2px solid #b6c1bb;
      }

      img {
        width: 90%;

        @include breakpoint(sm-up) {
          width: 30%;
        }
      }

      a, p {
        font-size: 1rem;
        line-height: 1.5rem;

        @include breakpoint(sm-up) {
          font-size: 1.7rem;
          line-height: 2.3rem;
        }
      }

      .story-info {
        padding-left: 0px;

        @include breakpoint(sm-up) {
          padding-left: 30px;
        }
      }
    }
  }
</style>

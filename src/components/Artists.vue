<template>
  <div class="artists page">
    <h1>Contributors</h1>
    <div class="artist-list-item" v-for="(artist, index) in artists" :key="index">
      <a :href="artist.link" target="_blank">
        {{ artist.name }}
        <ExternalLinkSvg></ExternalLinkSvg>
      </a>
      <div class="info">
        <router-link v-if="artist.show" :to="`/exhibitions/${artist.show}`">{{ artist.showtitle }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ExternalLinkSvg from '@/components/ExternalLinkSvg'

export default {
  name: 'Artists',
  components: {
    ExternalLinkSvg
  },
  data () {
    return {
      artists: []
    }
  },
  mounted () {
    this.$store.state.shows.forEach(x => {
      x.artists.forEach(y => {
        y.show = x.link
        y.showtitle = x.title
        this.artists.push(y)
      })
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .artist-list-item {
    display: flex;
    border-top: 2px solid #b6c1bb;
    justify-content: space-between;
    padding: 20px 0px;
    flex-wrap: wrap;

    @include breakpoint(sm-up) {
      flex-wrap: nowrap;
    }

    &:last-child {
      border-bottom: 2px solid #b6c1bb;
    }

    .external-link {
      width: 12px;

      @include breakpoint(sm-up) {
        width: 18px;
      }
    }

    p, a {
      font-size: 1rem;
      margin: 0px;
      line-height: 1.5rem;

      @include breakpoint(sm-up) {
        font-size: 1.7rem;
        line-height: 2.3rem;
      }
    }

    .info {
      width: 100%;

      @include breakpoint(sm-up) {
        width: 30%;
      }
    }
  }
</style>

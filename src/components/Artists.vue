<template>
  <div class="artists page">
    <h1>Artists</h1>
    <a v-for="(artist, index) in artists" :href="artist.link" target="_blank" :key="index">{{ artist.name }}</a>
  </div>
</template>

<script>
export default {
  name: 'Artists',
  data () {
    return {
      artists: []
    }
  },
  mounted () {
    this.$store.state.shows.forEach(x => {
      x.artists.forEach(y => {
        this.artists.push(y)
      })
    })
  }
}
</script>

<style lang="scss">
</style>

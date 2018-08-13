<template>
  <div class="show-list">
    <div class="poster">
      <img v-if="show.poster" :src="require(`@/assets/img/${show.poster}`)">
      <img v-else class="placeholder" :src="require(`@/assets/img/placeholder-1.jpg`)">
    </div>
    <p class="text">
      <router-link v-if="show.link" :to="`/exhibitions/${show.link}`">"{{ show.title }}"</router-link>
      <a v-for="(artist, index) in show.artists" :href="artist.link" target="_blank" :key="index">{{ `${artist.name} ${index + 1 === show.artists.length ? '' : ','}` }}</a>
      <span>{{ show.date }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ShowItem',
  props: [
    'show'
  ]
}
</script>

<style lang="scss">
</style>

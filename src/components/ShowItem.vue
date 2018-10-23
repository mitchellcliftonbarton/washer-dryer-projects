<template>
  <div class="show-list">
    <div class="poster" :class="{ 'not-available': !show.poster }">
      <img v-if="show.poster" :src="require(`@/assets/img/${show.poster}`)">
      <p v-else>N/A</p>
    </div>
    <p class="text">
      <router-link v-if="show.link && show.title" :to="`/exhibitions/${show.link}`">"{{ show.title }}"</router-link>
      <span v-else-if="show.title && !show.link">{{ show.title }}</span>

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

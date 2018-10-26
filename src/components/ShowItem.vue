<template>
  <div class="tile">
    <router-link v-if="show.link" :to="`/exhibitions/${show.link}`" class="image-container">
      <img :src="require(`@/assets/img/${show.poster}`)">
    </router-link>
    <div v-else class="image-container">
      <img :src="require(`@/assets/img/${show.poster}`)">
    </div>

    <div v-if="showInfo" class="info">
      <router-link :to="`/exhibitions/${show.link}`">{{ show.title }}</router-link>
      <p v-for="(artist, index) in show.artists" :key="index">
        {{ `${artist.name} ${index + 1 === show.artists.length ? '' : ','}` }}
      </p>
    </div>
    <p>{{ show.date }}</p>
  </div>
</template>

<script>
export default {
  name: 'ShowItem',
  props: [
    'show',
    'showInfo'
  ]
}
</script>

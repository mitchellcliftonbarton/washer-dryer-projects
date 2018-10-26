<template>
  <div>
    <div class="cover-image">
      <img :src="require(`@/assets/img/${item.poster}`)">
    </div>
    <div class="info">
      <p class="dark">{{ title }}</p>
      <router-link :to="`/exhibitions/${item.link}`">{{ `"${item.title}"` }}</router-link>
      <a v-for="(artist, index) in item.artists" :href="artist.link" target="_blank" :key="index">
        {{ `${artist.name} ${index + 1 === item.artists.length ? '' : ','}` }}
        <ExternalLinkSvg></ExternalLinkSvg>
      </a>
      <p>{{ item.date }}</p>
    </div>
  </div>
</template>

<script>
import ExternalLinkSvg from '@/components/ExternalLinkSvg'

export default {
  name: 'MainItem',
  props: [
    'item',
    'title'
  ],
  components: {
    ExternalLinkSvg
  }
}
</script>

<style lang="scss">
</style>

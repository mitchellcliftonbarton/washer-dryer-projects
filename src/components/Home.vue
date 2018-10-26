<template>
  <div class="main page">
    <MainItem :item="current[0]" title="CURRENT SHOW" class="current"></MainItem>

    <div class="news tiles">
      <p class="dark">RECENT NEWS</p>
      <div class="tiles-container">
        <ArticleItem v-for="(article, index) in 3" :key="index" :article="$store.state.news[index]"></ArticleItem>
      </div>
    </div>

    <div class="upcoming tiles">
      <p class="dark">UPCOMING SHOWS</p>
      <div class="tiles-container">
        <ShowItem v-for="(show, index) in upcoming" :key="index" :show="show"></ShowItem>
      </div>
    </div>
    <a href="https://www.instagram.com/washer_dryer_projects/" target="_blank" class="insta">Instagram</a>
    <a href="http://eepurl.com/dIDtCL" target="_blank">SUBSCRIBE</a>
    <a href="mailto:washer.dryer.projects@gmail.com">washer.dryer.projects@gmail.com</a>
    <p>&copy;2018 Washer / Dryer Projects</p>
  </div>
</template>

<script>
import ShowItem from '@/components/ShowItem'
import MainItem from '@/components/MainItem'
import ArticleItem from '@/components/ArticleItem'

export default {
  name: 'Home',
  props: [ 'current', 'upcoming' ],
  components: {
    ShowItem,
    ArticleItem,
    MainItem
  },
  data () {
    return {}
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>

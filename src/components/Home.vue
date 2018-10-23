<template>
  <div class="main page">
    <h1>Washer / Dryer Projects</h1>
    <p>Washer / Dryer Projects is a gallery in Mitchell Barton's laundry room in Salt Lake City, Utah, USA.</p>
    <router-link :to="`/exhibitions/${current[0].link}`">VIEW CURRENT SHOW</router-link>
    <h1 class="upcoming">CURRENT</h1>
    <ShowItem v-for="(show) in current" :key="show.title" :show="show"></ShowItem>
    <h1 class="upcoming">UPCOMING</h1>
    <ShowItem v-for="(show) in upcoming" :key="show.title" :show="show"></ShowItem>
    <a href="https://www.instagram.com/washer_dryer_projects/" target="_blank" class="insta">Instagram</a>
    <a href="http://eepurl.com/dIDtCL" target="_blank">SUBSCRIBE</a>
    <a href="mailto:washer.dryer.projects@gmail.com">washer.dryer.projects@gmail.com</a>
    <p>&copy;2018 Washer / Dryer Projects</p>
  </div>
</template>

<script>
import ShowItem from '@/components/ShowItem'

export default {
  name: 'Home',
  props: [ 'current', 'upcoming' ],
  components: {
    ShowItem
  },
  data () {
    return {}
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>

<template>
  <div class="main page">
    <h1>Washer / Dryer Projects</h1>
    <p>Washer / Dryer Projects is a gallery in Mitchell Barton's laundry room in Salt Lake City, Utah, USA.</p>
    <p class="upcoming">Upcoming Shows</p>
    <ShowItem v-for="(show, idx) in upcoming" :key="idx" :show="show"></ShowItem>
    <a href="https://www.instagram.com/washer_dryer_projects/" target="_blank" class="insta">Instagram</a>
    <a href="mailto:washer.dryer.projects@gmail.com">washer.dryer.projects@gmail.com</a>
    <p>&copy; 2018 Washer / Dryer Projects</p>
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

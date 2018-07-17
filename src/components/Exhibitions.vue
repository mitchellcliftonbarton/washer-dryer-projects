<template>
  <div class="exhibitions page">
    <h1>Exhibitions</h1>
    <!-- <router-link v-for="(show, index) in this.$store.state.shows" :key="index" :to="`/exhibitions/${show.link}`">{{ `${show.artist} - ${show.title}`}}</router-link> -->
    <p>Upcoming</p>
    <p>~ (September-October) ~ Steven Stallings</p>
    <p>~ (October-November) ~ Ellie Goldrup</p>
    <p>~ (November-December) ~ <a href="http://omarmhmmd.com/" target="_blank">Omar Mohammed</a></p>
  </div>
</template>

<script>
export default {
  name: 'Exhibitions'
}
</script>

<style lang="scss">
</style>

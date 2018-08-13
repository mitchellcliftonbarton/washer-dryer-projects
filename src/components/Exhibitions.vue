<template>
  <div class="exhibitions page">
    <h1>Exhibitions</h1>
    <p v-if="current.length">Current</p>
    <ShowItem v-for="(show, idx) in current" :key="idx" :show="show"></ShowItem>
    <p v-if="upcoming.length">Upcoming</p>
    <ShowItem v-for="(show, idx) in upcoming" :key="idx" :show="show"></ShowItem>
    <p v-if="past.length">Past</p>
    <ShowItem v-for="(show, idx) in past" :key="idx" :show="show"></ShowItem>
  </div>
</template>

<script>
import ShowItem from '@/components/ShowItem'

export default {
  name: 'Exhibitions',
  props: [ 'current', 'upcoming', 'past' ],
  components: {
    ShowItem
  }
}
</script>

<style lang="scss">
</style>

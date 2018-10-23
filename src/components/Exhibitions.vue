<template>
  <div class="exhibitions page">
    <h1>Exhibitions</h1>
    <h1 v-if="current.length">Current</h1>
    <ShowItem v-for="(show) in current" :key="show.title" :show="show"></ShowItem>
    <h1 v-if="upcoming.length">Upcoming</h1>
    <ShowItem v-for="(show) in upcoming" :key="show.title" :show="show"></ShowItem>
    <h1 v-if="past.length">Past</h1>
    <ShowItem v-for="(show) in past" :key="show.title" :show="show"></ShowItem>
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

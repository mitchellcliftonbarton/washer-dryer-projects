<template>
  <div class="exhibitions page">
    <h1>Exhibitions</h1>
    <MainItem :item="current[0]" title="CURRENT SHOW" class="current"></MainItem>

    <div class="upcoming tiles">
      <p class="dark">UPCOMING</p>
      <div class="tiles-container">
        <ShowItem v-for="(show, index) in upcoming" :key="index" :show="show"></ShowItem>
      </div>
    </div>

    <div class="upcoming tiles">
      <p class="dark">PAST</p>
      <div class="tiles-container">
        <ShowItem v-for="(show, index) in past" :key="index" :show="show" showInfo="true"></ShowItem>
      </div>
    </div>
  </div>
</template>

<script>
import ShowItem from '@/components/ShowItem'
import MainItem from '@/components/MainItem'

export default {
  name: 'Exhibitions',
  props: [ 'current', 'upcoming', 'past' ],
  components: {
    ShowItem,
    MainItem
  }
}
</script>

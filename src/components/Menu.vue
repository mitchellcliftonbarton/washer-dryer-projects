<template>
  <div class="menu page">
    <div>
      <router-link to="/" @click.native="$emit('close-nav')">Home</router-link>
      <router-link to="/exhibitions" @click.native="$emit('close-nav')">Exhibitions</router-link>
      <router-link to="/info" @click.native="$emit('close-nav')">Info</router-link>
      <router-link to="/catalog" @click.native="$emit('close-nav')">Catalog</router-link>
      <router-link to="/artists" @click.native="$emit('close-nav')">Artists</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
</style>

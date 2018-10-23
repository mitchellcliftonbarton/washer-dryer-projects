<template>
  <div class="menu page">
    <div>
      <router-link to="/" @click.native="$emit('close-nav')">Home</router-link>
      <router-link to="/exhibitions" @click.native="$emit('close-nav')">Exhibitions</router-link>
      <router-link to="/info" @click.native="$emit('close-nav')">Info</router-link>
      <router-link to="/news" @click.native="$emit('close-nav')">News</router-link>
      <router-link to="/contributors" @click.native="$emit('close-nav')">Contributors</router-link>
      <router-link to="/catalog" @click.native="$emit('close-nav')">Catalog</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu'
}
</script>

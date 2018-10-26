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

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  #app .menu {
    margin-top: 5rem;

    a {
      font-size: 2rem;
      margin: 25px 0 0 0;

      @include breakpoint(sm-up) {
        margin: 0px;
        line-height: 3rem;
      }

      &.router-link-exact-active:before {
        content: '';
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: red;
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
</style>

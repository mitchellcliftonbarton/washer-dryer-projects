<template>
  <div class="info page">
    <h1>Info</h1>
    <p>Washer / Dryer Projects is a gallery in <a href="http://mitchellbarton.com" target="_blank">Mitchell Barton's</a> laundry room in Salt Lake City, Utah, USA.</p>
    <img :src="require(`@/assets/img/wd-3.jpg`)" alt="Photo of the Washer and Dryer">
    <p>The gallery functions as an unconventional space where artists can experiment in an abnormal/less-than-ideal art context. We don't have openings or events ~ the space is committed to being mostly private and inaccessible in a physical sense, but all work can be viewed on this website as well as in the end of year <router-link to="/catalog">catalog</router-link>.</p>
    <p>Measurements and details of the space can be found <a href="/static/map-booklet-small.pdf" download>here.</a></p>
    <p>The gallery is sometimes open when the laundry room is being used to do laundry.</p>
    <p>Shows in the gallery are up for 4-5 weeks.</p>
    <p>Currently doing laundry: <span class="no">No</span></p>
    <a href="https://www.instagram.com/washer_dryer_projects/" target="_blank">Instagram</a>
    <a href="http://eepurl.com/dIDtCL" target="_blank">SUBSCRIBE</a>
    <a href="mailto:washer.dryer.projects@gmail.com">washer.dryer.projects@gmail.com</a>
    <p>&copy;2018 Washer / Dryer Projects</p>
  </div>
</template>

<script>
export default {
  name: 'Info'
}
</script>

<style lang="scss" scoped>
  img {
    width: 100%;
  }
</style>

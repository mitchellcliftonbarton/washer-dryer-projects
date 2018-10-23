<template>
  <div class="images" :class="{ 'open': imagesOpen }">
    <transition name="info-box" mode="out-in">
      <div v-if="infoOpen" class="info" :key="currentImage">
        <p>"{{ allImages[currentImage].title }}"</p>
        <p v-if="allImages[currentImage.medium]">{{ allImages[currentImage].medium }}</p>
      </div>
    </transition>

    <div
      v-for="(image, index) in allImages"
      :key="index"
      class="image-container"
      :class="{ 'active': currentImage === index && imagesOpen, 'video': isVideo }"
    >
      <img
        v-if="image.pieceType === 'photo'"
        :src="require(`@/assets/img/${image.piecePath.path}`)"
      >
      <iframe
        v-else-if="image.pieceType === 'video'"
        width="840"
        height="472.5"
        :src="image.piecePath.path"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    </div>

    <div class="big-controls" :class="{ 'video': isVideo }">
      <div class="left" @click="$emit('next')"></div>
      <div class="right" @click="$emit('prev')"></div>
    </div>

    <div class="top-info">

      <div class="left">
        <a class="closer" href="#" @click.prevent="closeImages()">
          ✕
        </a>
        <p class="piece-num">{{ `IMAGE ${currentImage + 1}/${allImages.length}` }}</p>
        <a href="#" class="piece-info" @click.prevent="infoOpen = !infoOpen">{{ infoOpen ? 'HIDE' : 'INFO' }}</a>
      </div>

      <div class="right">
        <MapSvg :width="150" :fill="`#eaeaea`"></MapSvg>
        <div class="dots">
          <a
            v-for="(piece, idx) in theShow.pieces"
            :key="idx"
            href="#"
            :class="{ 'active': allImages[currentImage].piece === idx }"
            @click.prevent="$emit('set-current', idx)"
            :style="{ top: piece.position[0], left: piece.position[1] }"
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapSvg from '@/components/MapSvg'

export default {
  name: 'ShowImages',
  props: [
    'imagesOpen',
    'allImages',
    'currentImage',
    'theShow'
  ],
  components: {
    MapSvg
  },
  data () {
    return {
      infoOpen: false
    }
  },
  computed: {
    isVideo () {
      return this.allImages[this.currentImage].pieceType === 'video'
    }
  },
  methods: {
    closeImages () {
      this.infoOpen = false
      this.$emit('close-images')
    }
  }
}
</script>

<style lang="scss">

  .big-controls {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;

    &.video {
      z-index: 0;
    }

    .left, .right {
      width: 50%;
      height: 100%;
    }

    .left {
      cursor: w-resize;
    }

    .right {
      cursor: e-resize;
    }
  }

  .info-box-enter,
  .info-box-leave-to {
    opacity : 0;
  }

  .info-box-enter {
    transform : translateY(10px);
  }

  .info-box-enter-to,
  .info-box-leave {
    opacity   : 1;
    transform : translateY(0px);
  }

  .info-box-leave-to {
    transform : translateY(-10px);
  }

  .info-box-enter-active,
  .info-box-leave-active {
    transition : opacity .3s, transform .3s;
  }
</style>

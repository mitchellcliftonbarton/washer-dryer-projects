<template>
  <div class="show page">
    <h1 class="title">"{{ theShow.title }}"</h1>

    <a
      v-for="(a, index) in theShow.artists"
      :href="a.link"
      :key="index"
      target="_blank"
      class="artist"
    >
      <span class="name">{{ a.name }}</span>
      <ExternalLinkSvg></ExternalLinkSvg>
      <span>{{ `${index + 1 === theShow.artists.length ? '' : ','}`}}</span>
    </a>

    <p class="date">{{ theShow.status === 'upcoming' ? `UPCOMING - ${theShow.date}` : theShow.date }}</p>

    <div v-if="!this.$store.state.isMobile" class="map-section">
      <MapSvg></MapSvg>
      <a
        href="#"
        v-for="(p, index) in theShow.pieces"
        @click.prevent="openPiece(index)"
        :key="index"
        class="piece"
        :style="{ top: p.position[0], left: p.position[1] }"
        @mouseenter="turnPreviewOn(index)"
        @mouseleave="previewOn = false"
      >
        {{ index + 1 }}
      </a>
    </div>

    <div v-else class="mobile-images">
      <div v-for="(img, index) in allImages" :key="index" class="image">
        <img v-if="img.pieceType === 'photo'" :src="require(`@/assets/img/${img.piecePath.path}`)">
        <iframe
          v-else
          width="560"
          height="315"
          :src="img.piecePath.path"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
        <p>{{ img.title }}</p>
        <p>{{ img.medium }}</p>
      </div>
    </div>

    <div v-if="previewOn" class="image-previews">
      <img :src="require(`@/assets/img/${currentPreview}`)" >
    </div>

    <p v-if="theShow.text" class="description">{{ theShow.text }}</p>

    <ShowImages
      :imagesOpen="imagesOpen"
      :allImages="allImages"
      :currentImage="currentImage"
      :theShow="theShow"
      v-on:close-images="imagesOpen = false"
      v-on:next="next(false)"
      v-on:prev="next(true)"
      v-on:set-current="setCurrent($event)"
    ></ShowImages>
  </div>
</template>

<script>
import MapSvg from '@/components/MapSvg'
import ExternalLinkSvg from '@/components/ExternalLinkSvg'
import ShowImages from '@/components/ShowImages'

export default {
  name: 'Show',
  components: {
    MapSvg,
    ExternalLinkSvg,
    ShowImages
  },
  data () {
    return {
      currentImage: 0,
      imagesOpen: false,
      previewOn: false,
      currentPreview: null
    }
  },
  computed: {
    theShow () {
      return this.$store.state.shows.find(s => s.link === this.$route.params.show)
    },
    allImages () {
      if (this.theShow.pieces) {
        let y = []
        this.theShow.pieces.forEach((x, index) => {
          x.img.forEach(z => {
            const obj = {
              piecePath: z,
              pieceType: z.type,
              piece: index,
              title: x.title,
              medium: x.medium,
              tall: z.tall
            }
            y.push(obj)
          })
        })

        return y
      }
    }
  },
  methods: {
    openPiece (x) {
      this.imagesOpen = true
      this.currentImage = this.allImages.findIndex(y => y.piece === x)
    },
    next (x) {
      if (x) {
        this.currentImage === this.allImages.length - 1 ? this.currentImage = 0 : this.currentImage++
      } else {
        this.currentImage === 0 ? this.currentImage = this.allImages.length - 1 : this.currentImage--
      }
    },
    setCurrent (image) {
      this.currentImage = this.allImages.findIndex(x => x.piece === image)
    },
    turnPreviewOn (i) {
      this.previewOn = true
      const idx = this.allImages.findIndex(x => x.piece === i)
      this.allImages[idx].pieceType === 'video'
        ? this.currentPreview = this.allImages[idx].piecePath.poster
        : this.currentPreview = this.allImages[idx].piecePath.path
    }
  },
  watch: {
    imagesOpen () {
      this.imagesOpen
        ? document.documentElement.style.overflow = 'hidden'
        : document.documentElement.style.overflow = 'auto'
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss">
  .show {
    .image {
      width         : 100%;
      margin-bottom : 20px;

      img {
        width         : 100%;
        margin-bottom : 20px;
      }

      iframe {
        width : 100%;
      }

      p {
        font-size      : .8rem;
        line-height    : .8rem;
        color          : #565656;
        letter-spacing : .03rem;
        margin         : 10px 0px;

        &:last-child {
          margin-bottom : 60px;
        }
      }
    }

    .title {
      margin-bottom : 0px;
      color         : #7b847f;
    }

    .artist {
      display         : inline;
      text-decoration : none;
      padding-right   : 25px;
      font-size       : 2rem;

      svg {
        width : 20px;
      }

      span {
        display : inline-block;

        &.name {
          text-decoration : underline;
        }
      }
    }

    .date {
      font-size   : 2rem;
      line-height : 2rem;
      margin      : 0px;
    }

    .description {
      font-size   : 2rem;
      line-height : 2.5rem;
    }

    .map-section {
      margin   : 100px 0px;
      position : relative;

      .piece {
        position        : absolute;
        top             : 0px;
        left            : 0px;
        margin          : 0px;
        padding         : 0px;
        text-decoration : none;
        background      : #E7E7E7;
        border-radius   : 50%;
        font-size       : 2rem;
        width           : 5rem;
        height          : 5rem;
        display         : flex;
        justify-content : center;
        align-items     : center;
        font-weight     : 700;
        transform       : scale(1);
        transition      : transform .1s;

        &:hover {
          transform : scale(1.1);
          opacity   : 1;
        }
      }
    }

    .image-previews {
      position        : fixed;
      width           : 100%;
      height          : 100%;
      top             : 0px;
      left            : 0px;
      display         : flex;
      justify-content : center;
      align-items     : center;
      pointer-events  : none;

      img {
        max-width  : 400px;
        max-height : 400px;
        opacity    : .9;
      }
    }

    .mobile-images {
      margin-top : 50px;

      .image {
        img {
          width : 100%;
        }
      }
    }

    .images {
      position       : fixed;
      width          : 100%;
      height         : 100%;
      top            : 0px;
      left           : 0px;
      pointer-events : none;
      opacity        : 0;
      transition     : opacity .3s;
      background     : rgba(255, 255, 255, 1);
      z-index        : 150;

      .image-container {
        position        : absolute;
        width           : 100%;
        height          : 100%;
        top             : 0px;
        left            : 0px;
        display         : flex;
        justify-content : center;
        align-items     : center;
        pointer-events  : none;

        &.video {
          z-index : 10;
        }

        img, iframe {
          max-width  : 60%;
          max-height : 80%;
          display    : none;
          align-self : center;
        }

        iframe {
          pointer-events : none;
        }

        &.active {
          img, iframe {
            display : block;
          }
        }
      }

      a {
        pointer-events : auto;
        font-size      : .8rem;
        margin         : 0px;
      }

      .info {
        position : absolute;
        bottom   : 40px;
        left     : 40px;

        p {
          font-size   : .9rem;
          margin      : 0px;
          line-height : 1.4rem;
          color       : #2000ff;
        }
      }

      .top-info {
        position        : absolute;
        height          : 70px;
        width           : 100%;
        top             : 0px;
        display         : flex;
        align-items     : center;
        justify-content : flex-start;

        .left {
          display      : flex;
          align-items  : center;
          padding-left : 30px;
          height       : 100%;

          p, span {
            color : #cecece;
          }

          a {
            color : #2000ff;
          }

          .closer {
            font-size       : .8rem;
            text-decoration : none;
          }

          .arrows {
            margin : 0px 0px 0px 30px;
            left   : 0px;

            a {
              display         : inline-block;
              text-decoration : none;
            }
          }

          .piece-num {
            font-size   : .8rem;
            margin-left : 30px;
            width       : 80px;
          }

          .piece-info {
            text-decoration : none;
            margin-left     : 30px;
          }

          .closer,
          .arrows,
          .piece-num,
          .piece-info {
            transform  : translateY(-10px);
            opacity    : 0;
            transition : opacity .3s, transform .3s;
          }
        }

        .right {
          position   : absolute;
          top        : 30px;
          right      : 30px;
          transform  : translateY(-10px);
          opacity    : 0;
          transition : opacity .3s, transform .3s;

          .dots {
            position    : absolute;
            margin      : 0px 30px 0px 0px;
            top         : 0px;
            left        : 0px;
            display     : flex;
            align-items : center;
            width       : 100%;
            height      : 100%;

            a {
              display       : inline-block;
              width         : 8px;
              height        : 8px;
              border-radius : 4px;
              background    : #E7E7E7;
              position      : absolute;
              transition    : background .3s;

              &.active {
                background : #2000ff;
              }

              &:hover {
                background : #2000ff;
              }
            }
          }
        }
      }

      &.open {
        opacity        : 1;
        pointer-events : auto;

        iframe {
          pointer-events : auto;
        }

        .top-info {
          .left {
            .closer,
            .arrows,
            .piece-num,
            .piece-info {
              transform : translateY(0px);
              opacity   : 1;
            }

            .closer {
              transition-delay : .5s;
            }

            .arrows {
              transition-delay : .55s;
            }

            .piece-num {
              transition-delay : .6s;
            }

            .piece-info {
              transition-delay : .65s;
            }
          }

          .right {
            transform        : translateY(0px);
            opacity          : 1;
            transition-delay : .7s;
          }
        }
      }
    }

    #close {
      .st0 {
        fill           : none;
        stroke         : #2000ff;
        stroke-width   : 2;
        stroke-linecap : square;
      }
    }
  }
</style>

<template>
  <div class="show page">
    <h1>"{{ theShow.title }}"</h1>
    <a v-for="(a, index) in theShow.artists" :href="a.link" :key="index" target="_blank" class="artist">
      <span class="name">{{ a.name }}</span>
      <svg class="external-link" x="0px" y="0px" viewBox="0 0 7.5 7.5">
        <line class="st0" x1="0.4" y1="7.1" x2="6.4" y2="1.1"/>
        <polyline class="st1" points="3.9,0.6 6.9,0.6 6.9,2.6 6.9,3.6 "/>
      </svg>
      <span>{{ `${index + 1 === theShow.artists.length ? '' : ','}`}}</span>
    </a>
    <p>{{ theShow.date }}</p>
    <div v-if="!this.$store.state.isMobile" class="map-section">
      <svg id="map" x="0px" y="0px" viewBox="0 0 1073.5 1008">
        <path class="st0" d="M1069,680.5"/>
        <path class="st1" d="M1069,414.1"/>
        <polyline class="st1" points="1054.5,414.5 1069,414.1 1069,4 4,4 4,565 645,565 645,1004 1069,1004 1069,680.5 1054.5,680.5 "/>
        <polyline class="st1" points="644.5,932.5 846,932 846.1,1004.5 "/>
        <polyline class="st1" points="1069.3,932.5 897,932 896.5,1004.5 "/>
        <polyline class="st1" points="75.7,306 248,306 248,500 53,500 53,342.1 "/>
        <rect x="283.9" y="305.7" class="st1" width="195" height="194.8"/>
        <circle class="st1" cx="741.5" cy="712.5" r="75.5"/>
        <circle class="st1" cx="741.5" cy="540.5" r="75.5"/>
        <rect x="630" y="285" class="st1" width="180" height="158"/>
        <rect x="630" y="198" class="st1" width="180" height="72"/>
        <path class="st2" d="M646.5,435.5l-32-264l204,12L819,327l-51,15c0,0-21,7-16,31s33,18,33,18l69-23c0,0,15-5,16-20s0-40,0-40V168 c0,0,1-27-31-29s-117-7-117-7l-128-8c0,0-31-1-26,35s35,297,35,297s0,13,20,25s106,79,106,79s19,15,35-6s-8-37-8-37L646.5,435.5z"/>
        <polyline class="st1" points="2.7,140.5 75,140 75,342 2.7,342.1 "/>
        <line class="st1" x1="1069.5" y1="428.5" x2="1069.5" y2="666.5"/>
      </svg>
      <!-- <a href="#" v-for="(p, index) in theShow.pieces" @click.prevent="openPiece(index)" :key="index" class="piece" :style="{ top: p.position[0], left: p.position[1] }">{{ index + 1 }}</a> -->
    </div>
    <div v-else class="mobile-images">
      <!-- <div v-for="(img, index) in allImages" :key="index" class="image">
        <img :src="require(`@/assets/img/${img.path}`)">
        <p>{{ img.title }}</p>
        <p>{{ img.medium }}</p>
      </div> -->
    </div>
    <p v-if="theShow.text">{{ theShow.text }}</p>

    <div class="images" :class="{ 'open': imagesOpen }">
      <div class="top-info">
        <p class="piece-num">{{ allImages[currentImage].piece + 1 }}</p>
        <a class="closer" href="#" @click.prevent="imagesOpen = false">
          <svg height="25px" width="20px" id="close" x="0px" y="0px" viewBox="0 0 16.4 16.4">
            <line class="st0" x1="1.4" y1="1.4" x2="15" y2="15"/>
            <line class="st0" x1="1.4" y1="15" x2="15" y2="1.4"/>
          </svg>
        </a>
      </div>
      <img :src="require(`@/assets/img/${allImages[currentImage].path}`)" alt="">
      <div class="bottom-info">
        <div class="arrows">
          <a href="#" @click.prevent="next(false)">&larr;</a>
          <a href="#" @click.prevent="next(true)">&rarr;</a>
        </div>
        <p class="title">{{ `${allImages[currentImage].title}, ${allImages[currentImage].medium}` }}</p>
        <div class="dots">
          <a v-for="(img, idx) in allImages" :key="idx" href="#" :class="{ 'active': currentImage === idx }" @click.prevent="currentImage = idx"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Show',
  data () {
    return {
      currentImage: 0,
      imagesOpen: false
    }
  },
  computed: {
    theShow () {
      return this.$store.state.shows.find(s => s.link === this.$route.params.show)
    },
    allImages () {
      let y = []
      this.theShow.pieces.forEach((x, index) => {
        x.img.forEach((z) => {
          let obj = {
            path: z,
            piece: index,
            title: x.title,
            medium: x.medium
          }
          y.push(obj)
        })
      })

      return y
    }
  },
  methods: {
    openPiece (x) {
      this.imagesOpen = true
      this.currentImage = this.allImages.findIndex(y => y.piece === x)
    },
    next (x) {
      if (x) {
        if ((this.currentImage + 1) !== this.allImages.length) this.currentImage++
      } else {
        if (this.currentImage !== 0) this.currentImage--
      }
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
      width: 100%;
      margin-bottom: 20px;

      img {
        width: 100%;
        margin-bottom: 20px;
      }

      p {
        font-size: .8rem;
        line-height: .8rem;
        color: #565656;
        letter-spacing: .03rem;
        margin: 10px 0px;

        &:last-child {
          margin-bottom: 60px;
        }
      }
    }

    .artist {
      display: inline;
      text-decoration: none;
      padding-right: 25px;

      span {
        display: inline-block;

        &.name {
          text-decoration: underline;
        }
      }
    }

    .map-section {
      margin: 100px 0px;
      position: relative;

      #map {
        .st0{fill:none;stroke:#000000;stroke-width:8;stroke-miterlimit:10;}
        .st1{fill:none;stroke:#0000FF;stroke-width:8;stroke-miterlimit:10;}
        .st2{fill:#FFFFFF;stroke:#0000FF;stroke-width:8;stroke-miterlimit:10;}
        .st3{fill:#E7E7E7;stroke:#E7E7E7;stroke-width:8;stroke-miterlimit:10;}
        .st4{fill:#0000FF;}
        .st5{font-family:'IBMPlexSans-Bold';}
        .st6{font-size:35px;}
      }

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
          transform: scale(1.1);
        }
      }
    }

    .mobile-images {
      margin-top: 50px;

      .image {
        img {
          width: 100%;
        }
      }
    }

    .images {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      pointer-events: none;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity .3s;
      background: rgba(255, 255, 255, .95);
      flex-direction: column;

      &.open {
        opacity: 1;
      }

      img {
        width: 50%;
      }

      a {
        pointer-events: auto;
        font-size: 1rem;
        margin: 0px;
      }

      .top-info {
        position: absolute;
        height: 70px;
        width: 100%;
        top: 0px;
        display: flex;
        align-items: center;
        justify-content: center;

        .piece-num {
          font-size: 1rem;
          margin: 0px 0px 0px 30px;
          position: absolute;
          left: 0px;
          height: 30px;
          width: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #E7E7E7;
          border-radius: 50%;
        }

        .closer {
          font-size: 0rem;
          height: 100%;
        }
      }

      .bottom-info {
        position: absolute;
        height: 70px;
        width: 100%;
        bottom: 0px;
        display: flex;
        align-items: center;
        justify-content: center;

        .arrows {
          position: absolute;
          margin: 0px 0px 0px 30px;
          left: 0px;

          a {
            display: inline-block;
            text-decoration: none;
          }
        }

        .title {
          font-size: 1rem;
        }

        .dots {
          position: absolute;
          margin: 0px 30px 0px 0px;
          right: 0px;

          a {
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #E7E7E7;
            margin: 0px 5px;

            &.active {
              background: #2000ff;
            }
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

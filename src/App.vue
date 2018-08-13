<template>
  <div id="app" :class="{ 'open': open }">
    <transition name="fade-up" appear>
      <Nav v-if="!preloader" v-on:open-nav="toggleNav" :open="open"></Nav>
    </transition>
    <transition name="fade-up" mode="out-in" appear>
      <router-view v-if="!open && !preloader" key="view" :current="this.current" :past="this.past" :upcoming="this.upcoming"/>
      <Menu v-else-if="open" key="menu" v-on:close-nav="toggleNav"></Menu>
    </transition>
    <div class="wash" :class="{ 'open': open, 'up': up, 'pre': preloader }">
      <svg width="200%" height="100%">
        <defs>
          <linearGradient id="Gradient1">
            <stop class="stop1" stop-color="#E7E7E7" offset="0%"/>
            <stop class="stop2" stop-color="#787878" offset="100%"/>
          </linearGradient>
        </defs>
        <circle ref="washer" class="washer" fill="#e7e7e7" stroke="url(#Gradient1)" :stroke-width="stroke" cx="25%" cy="50%" :r="rad" />
        <circle ref="dryer" class="dryer" fill="#e7e7e7" stroke="url(#Gradient1)" :stroke-width="stroke" :cx="this.$store.state.isMobile ? '80%' : '60%'" cy="50%" :r="rad" />
      </svg>
    </div>
    <audio v-if="!this.$store.state.isMobile" ref="dryerStart" :src="require('@/assets/audio/dryer-start.mp3')"></audio>
    <audio v-if="!this.$store.state.isMobile" ref="dryer" :src="require('@/assets/audio/dryer.mp3')" loop autoplay></audio>
  </div>
</template>

<script>
import store from './store'
import Nav from '@/components/Nav'
import Menu from '@/components/Menu'

export default {
  name: 'App',
  store,
  components: {
    Nav,
    Menu
  },
  data () {
    return {
      stroke: 35,
      open: false,
      up: false,
      preloader: false,
      resizeTimer: null,
      fadeOutInterval: null
    }
  },
  computed: {
    rad () {
      return this.$store.state.isMobile
        ? `calc(50vw - ${this.stroke / 2}px)`
        : `calc(50vh - ${this.stroke / 2}px)`
    },
    upcoming () {
      return this.$store.state.shows.filter(show => show.status === 'upcoming')
    },
    current () {
      return this.$store.state.shows.filter(show => show.status === 'current')
    },
    past () {
      return this.$store.state.shows.filter(show => show.status === 'past')
    }
  },
  methods: {
    toggleNav () {
      if (this.open) {
        this.open = false
        this.$refs.dryer.pause()
      } else {
        this.open = true
        this.$refs.dryerStart.play().then(() => {
          this.$refs.dryer.play()
        })
      }
    },
    preloaderOff () {
      this.preloader = false
    },
    turnUp () {
      this.up = true
    },
    fadeOut (el) {
      let actualVolume = el.volume
      this.fadeOutInterval = setInterval(() => {
        actualVolume = (parseFloat(actualVolume) - 0.1).toFixed(1)
        if (actualVolume >= 0) {
          el.volume = actualVolume
        } else {
          el.pause()
          el.volume = 1
          el.autoplay = false
          clearInterval(this.fadeOutInterval)
        }
      }, 300)
    },
    setIsMobile () {
      window.matchMedia('(max-width: 815px)').matches
        ? this.$store.dispatch('setIsMobile', true)
        : this.$store.dispatch('setIsMobile', false)
    }
  },
  watch: {
    $route (to, from) {
      to.name === 'Show' ? this.up = true : this.up = false
    }
  },
  created () {
    this.setIsMobile()

    if (this.$route.name === 'Home' && !this.$store.state.isMobile) this.preloader = true
  },
  mounted () {
    if (this.$route.name === 'Show') this.turnUp()
    if (this.$route.name !== 'Home') setTimeout(() => this.fadeOut(this.$refs.dryer), 2000)

    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => this.setIsMobile(), 250)
    })

    this.$refs.washer.addEventListener('animationend', () => {
      this.preloader = false
      this.fadeOut(this.$refs.dryer)
    }, false)
  }
}
</script>

<style lang="scss">
  @import "assets/scss/main.scss";

  html,
  body {
    margin  : 0px;
    padding : 0px;
    height  : 100%;

    #app {
      height : 100%;
      transition: background-color .3s;

      @keyframes spinCycle {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }

      @keyframes preloader {
        from {
          stroke-dashoffset: 113%;
          transform: rotate(0deg);
          opacity: 0;
        }

        to {
          stroke-dashoffset: 10%;
          transform: rotate(360deg);
          opacity: 1;
        }
      }

      .wash {
        height   : 100%;
        width    : 100%;
        position : fixed;
        pointer-events: none;
        top: 0px;
        // mix-blend-mode: color-burn;
        transform: translate(0%, 0%);
        transition: transform cubic-bezier(.79,.23,.31,.82) .6s;
        z-index: -20;

        @include breakpoint(xs-up) {
          // mix-blend-mode: color-dodge;
        }

        &.open {
          transform: translate(-70%, 0%);

          &.up {
            transform: translate(-70%, 0%);
          }

          .washer {
            animation-play-state: running;
          }

          .dryer {
            animation-play-state: running;
          }
        }

        &.up {
          transform: translate(0%, -100%);
        }

        .washer {
          stroke-dasharray: 113%;
          stroke-dashoffset: 10%;
          transform-origin: 25% 50%;
          animation: spinCycle 5s ease-in-out infinite;
          animation-play-state: paused;
        }

        .dryer {
          stroke-dasharray: 113%;
          stroke-dashoffset: 10%;
          transform-origin: 80% 50%;
          animation: spinCycle 4s ease-in-out infinite;
          animation-play-state: paused;

          @include breakpoint(xs-up) {
            transform-origin: 60% 50%;
          }
        }

        &.pre {
          .washer {
            animation: preloader 4s ease-out 1;
            animation-fill-mode: forwards;
          }

          .dryer {
            animation: preloader 3s ease-out 1;
            animation-fill-mode: forwards;
          }
        }
      }

      .page {
        padding  : 4rem 2rem;
        position : relative;

        &.show {
          @include breakpoint(xs-up) {
            padding  : 2rem 4rem 14rem 4rem;
          }
        }

        @include breakpoint(xs-up) {
          padding  : 2rem 4rem;
        }

        &.menu {
          position: fixed;
        }
      }
    }

    h1,
    h2,
    h4,
    p,
    span,
    a {
      font-family    : 'IBM Plex Sans', sans-serif;
      color          : #2b2b2b;
      line-height    : 1.5rem;
      color: #2000ff;
      display: block;

      @include breakpoint(xs-up) {
        line-height    : 6rem;
      }
    }

    h1 {
      font-size      : 1rem;
      font-weight    : 400;
      letter-spacing: .1rem;

      @include breakpoint(xs-up) {
        font-size      : 5rem;
        letter-spacing: .2rem;
      }
    }

    p,
    a {
      font-size: 1rem;
      font-weight: 400;
      letter-spacing: .03rem;
      margin: 1rem 0rem;

      @include breakpoint(xs-up) {
        font-size: 4.7rem;
        letter-spacing: .1rem;
        margin: 2rem 0rem;
      }
    }

    a {
      transition: color .3s;

      &:hover {
        color: #ff5757;
      }
    }

    p a, p span {
      display: block;
      margin: 0px;

      @include breakpoint(sm-up) {
        display: inline-block;
      }
    }

    a {
      text-decoration: underline;
    }
  }

  .external-link {
    width: 10px;

    @include breakpoint(xs-up) {
      width: 40px;
    }

    .st0{fill:#FFFFFF;stroke:#2000ff;stroke-width:1.2;stroke-miterlimit:10;}
    .st1{fill:none;stroke:#2000ff;stroke-width:1.2;stroke-miterlimit:10;}
  }

  .show-list {
    display: block;
    margin-bottom: 3rem;
    mix-blend-mode: none;

    @include breakpoint(sm-up) {
      display: flex;
    }

    .poster {
      width: 100%;
      height: 250px;

      @include breakpoint(sm-up) {
        width: 40%;
        height: 45vh;
      }

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;

        &.placeholder {
          opacity: .7;
        }
      }
    }

    .text {
      width: 100%;

      @include breakpoint(sm-up) {
        width: 60%;
        padding-left: 5%;
      }
    }

    .text span, a, p {
      font-size: 1rem;
      display: block;

      @include breakpoint(sm-up) {
        font-size: 4rem;
      }
    }
  }

  .upcoming, .insta {
    margin-top: 4rem;

    @include breakpoint(sm-up) {
      margin-top: 10rem;
    }
  }

  .fade-up-enter {
    opacity: 0;
    transform: translateY(10px);
  }

  .fade-up-enter-to,
  .fade-up-leave {
    opacity: 1;
    transform: translateY(0px);
  }

  .fade-up-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  .fade-up-enter-active,
  .fade-up-leave-active {
    transition: opacity .4s, transform .4s;
  }
</style>

<template>
  <div class="nav">
    <a href="#" class="right" @click.prevent="$emit('open-nav')">
      <transition name="switch" mode="out-in">
        <svg v-if="!open" key="dash" height="25px" width="23px" id="nav-icon" x="0px" y="0px" viewBox="0 0 21.7 9.7">
          <line class="st0" x1="1" y1="1" x2="20.7" y2="1"/>
          <line class="st0" x1="1" y1="8.7" x2="20.7" y2="8.7"/>
        </svg>
        <svg v-else key="x" height="25px" width="20px" id="nav-close" x="0px" y="0px" viewBox="0 0 16.4 16.4">
          <line class="st0" x1="1.4" y1="1.4" x2="15" y2="15"/>
          <line class="st0" x1="1.4" y1="15" x2="15" y2="1.4"/>
        </svg>
      </transition>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  props: [
    'open'
  ]
}
</script>

<style lang="scss">
  .nav {
    position        : fixed;
    width           : 100%;
    top             : 0px;
    height          : 70px;
    display         : flex;
    justify-content : flex-end;
    align-items     : center;
    z-index         : 100;
    pointer-events: none;

    a {
      pointer-events: auto;

      &.right {
        margin: 0px 30px 0px 0px;
        line-height: 0rem;

        svg {
          line {
            stroke-dasharray: 120%;
            stroke-dashoffset: 0%;
            transition: stroke-dashoffset .3s;

            &:last-child {
              transition-delay: .1s;
            }
          }
        }

        &:hover {
          svg {
            line {
              &:first-child {
                stroke-dashoffset: -240%;
              }

              &:last-child {
                stroke-dashoffset: -240%;
              }
            }
          }
        }
      }

      &:focus {
        outline : none;
      }
    }

    #nav-icon {
      .st0 {
        fill           : none;
        stroke         : #2000ff;
        stroke-width   : 2;
        stroke-linecap : square;
      }
    }

    #nav-close {
      .st0 {
        fill           : none;
        stroke         : #2000ff;
        stroke-width   : 2;
        stroke-linecap : square;
      }
    }

    .switch-enter,
    .switch-leave-to {
      opacity: 0;
    }

    .switch-enter-to,
    .switch-leave {
      opacity: 1;
    }

    .switch-enter-active,
    .switch-leave-active {
      transition: opacity .2s;
    }
  }
</style>

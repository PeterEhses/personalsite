<template>
  <header id="nav" :class="[this.hamburgerActive ? 'is-active' : null]">
    <router-link to="/">
      <div id="logo">
        <h2>Peter Ehses</h2>
        <hr />
        <h1>Portfolio</h1>
      </div>
    </router-link>
    <button :class= '["hamburger", "hamburger--collapse", this.hamburgerActive ? "is-active" : null]' type="button" @click="toggleMenu" aria-label="Menu" aria-controls="navigation">
    <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
    <div class="header-blur">

    </div>
    <nav>
      <router-link to="/about" class="nav" title="Kontakt" @click.native="offMenu">About</router-link>
      <hr />
      <router-link to="/projects" class="nav" title="Projekte" @click.native="offMenu">Projekte</router-link>
      <hr v-if="isChristmas"/>
      <router-link to="/christmas" v-if="isChristmas" class="nav" title="Merry Christmas" @click.native="offMenu">Christmas</router-link>
      <!-- <hr />
      <router-link to="/about" class="nav" title="Blog">Blog</router-link> -->

    </nav>


  </header>
</template>

<script>
export default {
  data(){
    return {
      hamburgerActive: false,
    }
  },
  computed: {
    isChristmas(){
      let today = new Date()
      let from = new Date("12/01/2020");
      from.setFullYear(today.getFullYear());
      let to = new Date("12/27/2020");
      to.setFullYear(today.getFullYear());
      return today >= from.getTime() && today.getTime() <= to.getTime();
    }
  },
  methods: {
    toggleMenu(){
      this.hamburgerActive = !this.hamburgerActive
    },
    offMenu(){
      this.hamburgerActive = false;
    },

  }

}
</script>

<style lang="scss" >
.hamburger, .header-blur{
  visibility: hidden;
}

@media  (max-width: 1300px){
  .hamburger{
    visibility: visible;
  }

  $hamburger-types     : (collapse);
  $hamburger-padding-x           : 2rem !default;
  $hamburger-padding-y           : 0rem !default;
  $hamburger-layer-width         : 2rem !default;
  $hamburger-layer-height        : .15rem !default;
  $hamburger-layer-spacing       : .51rem !default;
  $hamburger-layer-color         : var(--content-color) !default;
  $hamburger-layer-border-radius : 0em !default;
  @import "../scss/hamburgers/hamburgers.scss";
  #nav{
    .header-blur{ // this makes the background pretty on supported and prevents some scroll on all
      z-index: -1;
      visibility: visible;
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      backdrop-filter: blur(10px);
      transform: translate(100%, 0);
      transition: all calc(var(--transition-time) / 2);
    }
    &.is-active{
      .hamburger{
        position: fixed;
        right: 1rem;
      }
      .header-blur{
        transform: translate(0%, 0);
      }
      nav{
        transform: translate(0%, 0);
      }
      #logo{
        padding-right: 6em;
      }
    }

    nav{
      transform: translate(100%, 0);
      transition: all calc(var(--transition-time) / 2);
      background-color: var(--bg);
      z-index: -1;
      position: fixed;
      right: 0;
      top: 0;
      height: 100vh;
      border-left: var(--border-width) solid var(--content-color);
      padding: 3rem;
      padding-top: 7rem;
      text-align: right;
      hr{
        display: block;
        width: 0;
        opacity: 0;
      }
    }
  }

}
@media  (max-width: 850px){
  #logo{
    text-align: center;
    hr{
      //visibility: hidden;
      display: block;
      margin: 0 auto .3em auto;
    }
    h1, h2{
      margin: 0;
    }
  }
}
@media  (max-width: 530px){
  nav{
    width: 100vw;
    padding-left: 0 !important;
  }
  .header-blur{
    visibility: hidden;
  }
}
@media  (max-width: 400px){
  header#nav{
    height: 6rem;
  }
  #logo{
    h1, hr{
      visibility: hidden;
      height: 0;
      margin: 0;
      position: absolute;
    }
  }
}
@media  (max-width: 260px){
  #nav{
    #logo h2{
      font-size: 1rem;
    }
  }
}
</style>

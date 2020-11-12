<template>
<div id="app">
  <div id="decoration" aria-hidden="true">
    <div id="scrollhead">
      <div class="scrollinner" v-for="idy in 15" :key="idy">
        <span v-for="idx in 10" :key="idx">{{$route.name}}</span>
      </div>

    </div>
  </div>
  <div id="actualcontent">
    <header id="nav">
      <router-link to="/"><div id="logo">
        <h2>Peter Ehses</h2>
        <hr />
        <h1>Portfolio</h1>
      </div></router-link>
      <nav>
        <router-link to="/about" class="nav">Kontakt</router-link>
        <hr />
        <router-link to="/projects" class="nav">Projekte</router-link>
        <hr />
        <router-link to="/about" class="nav">Blog</router-link>


      </nav>


    </header>
    <router-view class="router-content"/>
    <cookies/>
    <footerBoi/>

  </div>

</div>
</template>

<script>
import footerBoi from "@/components/footer.vue"
import cookies from "@/components/cookies.vue"
export default {
  name: "app",
  components:{

    footerBoi,
    cookies
  },
  // mounted() {
  //     this.$nextTick(function(){
  //         var actualcontent = document.getElementById("actualcontent")
  //         actualcontent.addEventListener("scroll", function(){
  //         var navbar = document.getElementById("nav")
  //         var nav_classes = navbar.classList
  //         if(actualcontent.scrollTop >= navbar.clientHeight/2) {
  //           if (nav_classes.contains("shrink") === false) {
  //             nav_classes.toggle("shrink");
  //           }
  //         }
  //         else {
  //           if (nav_classes.contains("shrink") === true) {
  //             nav_classes.toggle("shrink");
  //           }
  //         }
  //       })
  //     })
  //   },
}
</script>

<style lang="scss">
@import 'https://unpkg.com/sanitize.css';
@import url("https://use.typekit.net/svb2axx.css");

//aw-conqueror-didot, serif;

// font-family: heimat-sans, sans-serif;
//
// font-weight: 300;
:root{
  font-size: 1.35em;

  --accent-text-transform: uppercase;

  --accent-text-font: aw-conqueror-didot, sans-serif;
  --accent-text-weight: 300;
  --accent-text-style: normal;
  --accent-text-weight-bold: 600;

  --body-text-font: ff-basic-gothic-pro, sans-serif;
  --body-text-weight: 100;
  --body-text-style: normal;
  --body-text-weight-bold: 700;

  --font-scalar: 1.35;

  --base-color: #a1a1a1;
  --white: #fafafa;
  --black: #101010;
  --bg: #333;
  --neutral-bg: var(--bg);
  --accent-color: #00b4bf;
  font-display: swap;
  --transition-time: 1s;
  --border-width: 2px;
  line-height: 1.33;
  --content-color: #fafafa;
  overflow: hidden;
}
*{
  //Scrollbar style

  // firefox
  scrollbar-color: var(--content-color) var(--bg);
  scrollbar-width: thin;
}

*:focus{ outline: none; }

  //blink / webkit
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}
::-webkit-scrollbar-track {
  background: var(--bg);
  background: none;
  border-radius: 0;
  //border: .5px solid var(--content-color);
}
::-webkit-scrollbar-thumb {
  border-radius: 0;
  background: var(--content-color);
}

// code highlighting
@import "https://fonts.googleapis.com/css2?family=Fira+Code&display=swap";
code{
  font-family: 'Fira Code', monospace !important;
  font-size: 0.87rem !important;
}
pre code,
pre code span{
  font-family: 'Fira Code', monospace !important;
  font-size: 0.75rem !important;
}
.token.keyword, .token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string, .token.variable, .token.boolean, .token.number{
  color: var(--accent-color) !important;
}

//


.button{
  padding: .5rem 1rem;
  font-size: 1rem;
  color: var(--content-color);
  font-family: var(--accent-text-font);
  font-style: var(--accent-text-style);
  font-weight: var(--accent-text-weight-bold);
  text-transform: none;
  border: var(--border-width) solid var(--accent-color);
  border-radius: 9000px;
  transition: color var(--transition-time);
  &:hover{
    color: var(--accent-color);
  }
}

svg {
    font-size: 1.5em;
    letter-spacing: 2px;
    color: var(--white);
    text-transform: var(--accent-text-transform);
    mix-blend-mode: normal;
}
a,
h1,
h3,
h4,
h5 {
  font-family: var(--accent-text-font);
  font-style: var(--accent-text-style);
  font-weight: var(--accent-text-weight);
  text-transform: var(--accent-text-transform);
  text-decoration: none;
  color: var(--accent-color);
}
.nav,
h1,
h2 {
    display: inline-block;
    font-size: 1.5rem;
    color: var(--accent-color);
}
hr {
    display: inline-block;
    margin: 0.5rem;
    width: 2rem;
    font-size: 0.7rem;
    border-width: calc( var(--border-width) / 2 );
    border-color: var(--content-color);
}

#app {
    color: var(--content-color);
    font-family: var(--body-text-font);
    font-style: var(--body-text-style);
    font-weight: var(--body-text-weight);
    text-align: center;
    width: 100%;
    //height: 100%;
    height: 100vh;


}
#logo{
  display: inline-block;
  font-family: var(--body-text-font);
  font-style: var(--body-text-style);
  font-weight: var(--body-text-weight);
}
#nav {
  display: inline-block;
  height: 8rem;
  width: 100vw;
  z-index: 90001;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
    padding: 0 1rem;
    transition: all calc( var(--transition-time) / 2);
    a,
    h1{
      font-weight: var(--accent-text-weight-bold);
    }

    a {
        &.router-link-exact-active {
          //font-family: heimat-sans, sans-serif;
          font-family: var(--body-text-font);
          font-style: var(--body-text-style);
          font-weight: var(--body-text-weight);
          color: var(--content-color);
        }
    }
 &.shrink{
   //position: fixed;
   //background: var(--bg);

   height: 2rem;
   //border-bottom: var(--border-width) solid var(--content-color);
   & h1,& h2, & .nav{
     font-size: 1rem;
   }
 }
}

#actualcontent>:nth-child(2){
  margin-top: 8rem;
}


.router-content{
  min-height: 100%;
  min-height: calc(100vh - 10.5rem);
}


#decoration{
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url("/img/img-noise-256x256.png");
  background-blend-mode: lighten;
  background-color: var(--bg);
}
#actualcontent{
position: absolute;
width: 100vw;
min-height: 100%;
height: auto;
//display: flex;
flex-direction: column;

overflow-y: overlay;
overflow-x: hidden;
height: 100vh;
}
#scrollhead{
  opacity: .5;
    position: relative;
    overflow: hidden;
    --offset: 5rem;
    --move-initial: calc(-10% + var(--offset));
    --move-final: calc(-50% + var(--offset));

    & .scrollinner{
      &:nth-child(2n){
        animation-direction: reverse;
      }
      white-space: nowrap;
      width: fit-content;
      display: flex;
      align-items: baseline;
      position: relative;
      transform: translate3d(var(--move-initial), 0, 0);
      animation: marquee 200s linear infinite;
      animation-play-state: running;
    }

  & span {
    &:nth-child(n){
      //font-family: aw-conqueror-didot, serif;
      font-family: var(--accent-text-font);
      font-style: var(--accent-text-style);
      font-weight: var(--accent-text-weight);

    }

    line-height: .91;

    font-size: 9.6rem;

    padding: 0 1rem;

    color: --base-color;
    -webkit-text-fill-color: var(--bg); /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: var(--accent-color);
  }
}

.articlebody,
.markdown,
.singlepagecontent{
  flex-grow: 1;
    text-align: left;
    padding: 1.5rem;
    margin: auto;
      //background: red;
      width: 100%;
      max-width: 50em;
      max-width: calc(60ch + 3rem);
    & img{
      width: auto !important;
      height: auto !important;
      max-width: calc(100vw - .666em);
      max-height: 100vh;
      margin-left: 50%;
      transform:translateX(-50%);

    }
    hr{
      margin: 25%;
      margin: 0 calc(50% - 1rem);
      text-align: center;
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--accent-text-font);
      font-style: var(--accent-text-style);
      font-weight: var(--accent-text-weight-bold);
      color: var(--accent-color);
      //padding: .3em .3em .2em .3em;
      //margin: 0 .5em;
      text-transform: none;
      //border-radius: 9000px;
      //border: var(--border-width) solid var(--content-color);
      //transform: translate(-3rem, 0);
      // &:before{
      //   content:"";
      //   display: inline-block;
      //   //white-space: nowrap;
      //   margin: calc(0.5em - var(--border-width)) 0.5rem;
      //   width: .5rem;
      //   font-size: 0.7em;
      //   border: calc( var(--border-width) / 2 ) solid var(--content-color);
      //
      //
      // }
    }
    h6{

    }
    h5{
      font-family: var(--body-text-font);
      font-style: var(--body-text-style);
      font-weight: var(--body-text-weight-bold);
    }
    h4{
      font-family: var(--body-text-font);
      font-style: var(--body-text-style);
      font-weight: var(--body-text-weight-bold);
    }
    h3{
      font-size: calc( var(--font-scalar) * 1rem);
    }
    h2{
      font-size: calc(  var(--font-scalar) * var(--font-scalar) * 1rem);
    }
    code{
      color: var(--white);
      display: inline-block;
      background: #2b2b2b;
      padding: .1em .3em;
      border-radius: .3em;
    }
    table{
      width: 100%;
    }

}


@keyframes marquee {
    0% {
        transform: translate3d(var(--move-initial), 0, 0);
    }

    100% {
        transform: translate3d(var(--move-final), 0, 0);
    }
}
</style>

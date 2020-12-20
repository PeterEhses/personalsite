<template>
<div id="app">
  <marqueeBG/>
  <div id="actualcontent">
    <vHeader/>
    <router-view class="router-content" />
    <cookies />
    <footerBoi />
    <themeToggle/>
  </div>


</div>
</template>

<script>
import footerBoi from "@/components/footer.vue"
import cookies from "@/components/cookies.vue"
import themeToggle from "@/components/themeToggle.vue"
import vHeader from "@/components/header.vue"
import marqueeBG from "@/components/marqueeBG.vue"
// // DUMB HYPHENATION HACK REMOVE ONCE CHROME DOESN'T SUCK ANYMORE
// // eslint-disable-next-line
// var Hyphenopoly = {
//             require: {
//                 "de": "Silbentrennungsalgorithmus",
//                 //"en-us": "Supercalifragilisticexpialidocious"
//             },
//             paths: {
//               patterndir: "/hyphenopoly/patterns/",
//               maindir: "/hyphenopoly/"
//             },
//             setup: {
//                 selectors: {
//                     ".markdown": {}
//                 }
//             }
//         };
//
// require('./hyphenopoly/Hyphenopoly_Loader.js')

export default {
  name: "app",
  components: {

    footerBoi,
    cookies,
    themeToggle,
    vHeader,
    marqueeBG
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
:root {
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
    --article-line-height: 1.35;
    --article-indent-left: 0.666rem;
    --article-indent-top: 1.5rem;
    --article-text-width: 60ch;
    --article-margin-default: 1.5rem;
    --article-safe-space-scalar: 3;
    --article-image-ratio: 3 / 5; // as in 1 / ratio of bodx width is taken up by indenting image
    --article-image-max-width-ratio: 4 / 5;
    --article-image-max-height-default: 66vh;

    //--gallery-coverlist-items: ; // unused

    --base-color: #a1a1a1;
    --white: #fafafa;
    --dark: #333;
    --black: #101010;
    --bg: #333;
    --neutral-bg: var(--bg);

    --accent-color-daylight: #009ba4;
    --accent-color-night: #00b4bf;

    --accent-color: var(--accent-color-daylight);
    font-display: swap;
    --transition-time: 1s;
    --border-width: 2px;
    line-height: 1.33;
    --content-color: #fafafa;
    overflow: hidden;

    // calculated variables

    --article-image-indent: calc(var(--article-image-ratio) * var(--article-text-width));
    --acticle-image-max-width: calc(var(--article-text-width) * var(--article-image-max-width-ratio));
    --article-overflow-width: calc(50vw - (var(--article-text-width)/2) - (var(--article-margin-default)*3) - var(--article-indent-left) + var(--article-image-indent));
    --article-safe-space: calc(var(--article-margin-default) * var(--article-safe-space-scalar));
}

// SELECTION

::-moz-selection { /* Code for Firefox */
  color: var(--content-color);
  background: var(--accent-color);
}

::selection {
  color: var(--content-color);
  background: var(--accent-color);
}

* {
    //Scrollbar style

    // firefox
    scrollbar-color: var(--content-color) var(--bg);
    scrollbar-width: thin;
}

*:focus {
    outline: none;
}

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
code {
    font-family: 'Fira Code', monospace !important;
    font-size: 0.87rem !important;
}
pre code,
pre code span {
    font-family: 'Fira Code', monospace !important;
    font-size: 0.75rem !important;
}
.language-css .token.string,
.style .token.string,
.token.boolean,
.token.entity,
.token.keyword,
.token.number,
.token.operator,
.token.url,
.token.variable {
    color: var(--accent-color) !important;
}

//

.button {

    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: var(--content-color);
    font-family: var(--accent-text-font);
    font-style: var(--accent-text-style);
    font-weight: var(--accent-text-weight-bold);
    text-transform: none;
    border: var(--border-width) solid var(--accent-color);
    border-radius: 9000px;
    transition: color var(--transition-time);
    word-wrap: keep-all;

    // overflow centered
    position: absolute;
    white-space: pre;
    left: 50%;
    transform: translate(-50%, 0);

    &:hover {
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
    border-width: calc(var(--border-width) / 2);
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
#logo {
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
    transition: all calc(var(--transition-time) / 2);
    a,
    h1 {
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
    &.shrink {
        //position: fixed;
        //background: var(--bg);

        height: 2rem;
        //border-bottom: var(--border-width) solid var(--content-color);
        & .nav,
        & h1,
        & h2 {
            font-size: 1rem;
        }
    }
}

#actualcontent > :nth-child(2) {
    margin-top: 8rem;
}

.router-content {
    min-height: 100%;
    min-height: calc(100vh - 10.5rem);
}


#actualcontent {
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

.articlebody,
.markdown,
.singlepagecontent {

  // CALCS + VARS



  // ACTUAL CSS

  // // accent border
  //
  // border-left: 1px dashed var(--accent-color);
  // border-right: var(--border-width) dashed var(--accent-color);

  // rest

    white-space: normal;
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-word;
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
    line-height: var(--article-line-height);
    flex-grow: 1;
    text-align: left;
    padding: var(--article-safe-space);
    margin: auto;
    width: 100%;
    max-width: 60em;
    max-width: calc(var(--article-text-width) + var(--article-safe-space) + var(--article-safe-space));

    .youtube{
      position: relative;
      padding-bottom: 56.25%; /* 16:9 */
      height: 0;
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    & :not(figure) > img {
        width: auto !important;
        height: auto !important;
        max-width: calc(100vw - var(--article-indent-left));
        max-height: 66vh;
        margin-left: 50%;
        transform: translateX(-50%);
    }

    figure {

      clear: both;
      box-sizing: border-box;
      width: 100%;

      padding: var(--article-margin-default)  calc(var(--article-margin-default) * 2);
      margin: 0;
      display: table;
      margin-left: auto;
      margin-right: auto;
      figcaption {
          padding-top: 0.75em;
          display: run-in;
          font-size: calc(1em / var(--font-scalar));
          font-family: var(--accent-text-font);
          font-style: var(--accent-text-style);
          font-weight: var(--accent-text-weight-bold);
          color: var(--accent-color);
      }
      img{

        margin: auto;
        max-width: 100%;
        max-height: var(--article-image-max-height-default);
        display: block;

      }
    }
    figure.fill,
    figure.fill100,
    figure.fillmax {
        position: relative;
        left: calc(50%);
        transform: translate( -50%, 0);
        width: calc(100vw - var(--article-indent-left));
        height: auto;
        max-height: none;
        padding-left: 0;
        padding-right: 0;
        img {
          width: 100%;
          height: auto;
          max-height: none;
          margin-left: 0;
          margin-right: 0;
        }
        figcaption {
          margin: auto;
          max-width: 60em;
          max-width: calc(var(--article-text-width) + var(--article-safe-space) + var(--article-safe-space));
        }
    }

    figure.fill {
      img {
        max-height: var(--article-image-max-height-default);
        object-fit: cover;
      }
    }
    figure.fill100 {
      img {
        max-height: 100vh;
        object-fit: cover;
      }
    }

    figure.side{
      display: block;
      padding: 0;
        width: var(--article-image-indent);
        float: left;
        margin: 0 0 calc(var(--article-margin-default) / 3);

        img {
            max-width: var(--article-overflow-width);
            max-width: max(min(var(--article-overflow-width), var(--acticle-image-max-width)), var(--article-image-indent));
            max-height: var(--article-image-max-height-default);
            float: right;
            //--article-image-indent
            margin: var(--article-margin-default) calc(var(--article-margin-default)*2) calc(var(--article-margin-default) / 2) calc(var(--article-margin-default)*2);
        }
        figcaption {
            position: relative;
            top: calc(var(--article-margin-default) * -.5);
            max-width: min(var(--article-overflow-width), var(--acticle-image-max-width));
            margin-right: calc(var(--article-margin-default)*2);
            padding-top: 0.75em;
            // padding-right: calc(var(--article-margin-default) / 2);
            // padding-bottom: .5em;
            text-align: right;
            float: right;
            // border-right: var(--border-width) solid var(--content-color);
            // border-bottom: var(--border-width) solid var(--content-color);
            // border-radius: 0 0 var(--article-margin-default) 0;
        }
        &:nth-of-type(even) {
            float: right;
            figcaption {
                text-align: left;
                float: left;
                margin-right: auto;
                margin-left: calc(var(--article-margin-default)*2);
            }
            img {
                float: left;
            }
        }

    }



    hr {
        margin: 0 calc(50% - 1rem);
        text-align: center;
        clear: both;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        width: 100%;
        font-family: var(--accent-text-font);
        font-style: var(--accent-text-style);
        font-weight: var(--accent-text-weight-bold);
        color: var(--accent-color);
        //padding: .3em .3em .2em .3em;
        //margin: 0 .5em;
        text-transform: none;
        clear: both; // image flow clear
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
    h6 {
        }
    h5 {
        font-family: var(--body-text-font);
        font-style: var(--body-text-style);
        font-weight: var(--body-text-weight-bold);
    }
    h4 {
        font-family: var(--body-text-font);
        font-style: var(--body-text-style);
        font-weight: var(--body-text-weight-bold);
    }
    h3 {
        font-size: calc(var(--font-scalar) * 1rem);
    }
    h2 {
        font-size: calc(var(--font-scalar) * var(--font-scalar) * 1rem);
    }
    a {
      font-family: var(--body-text-font);
      font-style: var(--body-text-style);
      font-weight: var(--body-text-weight);
      text-transform: none;
      &:after{
        content: " ↩";
        content: "";
        //content: url('../assets/link-swoosh.svg');
        display: inline-block;
        position: relative;
        mask: url('./assets/link-swoosh.svg') no-repeat;
        background-color: var(--accent-color);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        height: .6em;
        margin-left: .3em;
        width: .7em;
      }
    }
    sup,
    .footnotes{
      a:after{
        content:""
      }
    }
    ul,
    ol{
      clear: both;
    }
    strong {
      font-weight: var(--body-text-weight-bold);
    }
    code {
        clear: both;
        color: var(--white);
        display: inline-block;
        background: #2b2b2b;
        padding: 0.1em 0.3em;
        border-radius: 0.3em;
    }
    blockquote {
      clear: both;
      border-left: var(--border-width) solid var(--accent-color);
      margin: 0;
      padding: 0 var(--article-margin-default);
    }
    mark {
      padding: 0.1em 0.3em;
      border-radius: 0.3em;
      color: var(--content-color);
      background-color: var(--accent-color);
    }
    dt {
      font-family: var(--body-text-font);
      font-style: var(--body-text-style);
      font-weight: var(--body-text-weight-bold);
      color: var(--accent-color);
    }
    table {
        clear: both;
        table-layout: auto;
        border-collapse: separate;
        border-spacing: calc(var(--border-width)*2);
        width: 100%;
        tr:nth-of-type(even) {
          background-image: linear-gradient(var(--accent-color) -7000%, rgba(0,0,0,0) 1000%);
        }
        thead {
          background-image: linear-gradient(var(--accent-color) -7000%, rgba(0,0,0,0) 1000%);
          font-weight: var(--body-text-weight-bold);
          color: var(--accent-color);
        }
        td, th {
          vertical-align: top;
          hyphens: manual;
          white-space: normal;
          word-break:keep-all;
          padding: 0.1em 0.3em;
          //white-space: nowrap;
        }
    }

}


</style>

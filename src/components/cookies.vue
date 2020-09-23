<template>
 <div class="cookies">
   <cookie-law
   theme="dark-lime"
   buttonText="Okay"
   storageType="cookies"
   v-on:accept="cookeAccept"
   :buttonDecline="true"
   buttonDeclineText="Nee"
   >
     <div slot="message">
    Darf diese Seite Cookies benutzen? <router-link to="datenschutz">Infos</router-link>
  </div>
</cookie-law>
 </div>
</template>

<script>
import CookieLaw from 'vue-cookie-law'
// eslint-disable-next-line no-unused-vars
import {setOptions, bootstrap } from 'vue-gtag'
  export default {
    components: { CookieLaw },
    methods: {
      cookeAccept(){
        setOptions({
          config: { id: 'UA-36014546-2' },
          disableScriptLoad: false
        })
        // eslint-disable-next-line no-unused-vars
        bootstrap().then(gtag => {
        // all done!
      }).then(

        this.$gtag.pageview({page_path: this.$route.path,}))
      }
    }
  }
</script>

<style lang="scss">
.cookies{
  z-index: 123456 !important;
}
.Cookie{
  z-index: 123456 !important;
  background: var(--bg) !important;
  border: var(--border-width) solid var(--content-color);
  .Cookie__buttons button{
    border: var(--border-width) solid var(--content-color);
    box-sizing: border-box;
    background-color: var(--content-color) !important;
    border-radius: 12345px;
    color: var(--bg) !important;
    font-size: 1.5em;
    font-family: aw-conqueror-didot, serif;
    text-decoration: none;
    font-weight: 400;
  }
  .Cookie__buttons button.Cookie__button--decline{
    //font-size: 1.2em;
    padding: .625em 1.5625em !important;
    background-color: var(--bg) !important;
    color: var(--content-color) !important;

  }
}
</style>

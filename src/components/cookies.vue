<template>
 <div class="cookies">
   <cookie-law
   theme="dark-lime"
   buttonText="Okay"
   storageType="cookies"
   v-on:accept="cookeAccept"
   >
     <div slot="message">
    Darf diese Seite Cookies benutzen? <router-link to="datenschutz">Infos</router-link>
  </div>
</cookie-law>
 </div>
</template>

<script>
import CookieLaw from 'vue-cookie-law'
import { bootstrap } from 'vue-gtag'
  export default {
    components: { CookieLaw },
    methods: {
      cookeAccept(){
        // eslint-disable-next-line no-unused-vars
        bootstrap().then(gtag => {
        // all done!
      })
      }
    }
  }
</script>

<style lang="scss">
.cookies{
  z-index: 123456;
}
.Cookie{
  z-index: 123456;
  background: var(--bg);
  border: var(--border-width) solid var(--content-color);
  .Cookie__buttons button{
    background-color: var(--content-color) !important;
    border-radius: 12345px;
    color: var(--bg);
    font-size: 1.5em;
    font-family: aw-conqueror-didot, serif;
    text-decoration: none;
    font-weight: 400;
  }
}
</style>

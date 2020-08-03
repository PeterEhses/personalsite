<template>
  <div class="social">
    <p>follow me on</p>

    <a href="https://www.instagram.com/peterehses/" class="socialIcon" v-html="instagram.svg"></a>

  </div>
</template>

<script>
//https://simpleicons.org/
//import instagram from "https://unpkg.com/simple-icons@v3/icons/instagram.svg"


export default {
  name: "social",
  data: function(){
    return{
      instagram: require('simple-icons/icons/instagram'),
    }
  },
  mounted: function(){

  }
}
</script>

<style lang="scss">


.socialIcon svg{
  width: 1.2rem;
  height: 1.2rem;
  margin: 0 .4rem;
  color: var(--content-color);
}
.social p{
  margin: 0;
}
.social{
  display: flex;
  align-items: center;
}
</style>

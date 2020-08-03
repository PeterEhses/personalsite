<template>
  <article class="pillContainer">
    <router-link :to="link" class="postlink">
    <gradiator
    :gradType="['linear', 'radial', 'conic'][myRandom/2]"
    :gradAngle="(postData.id*75)%360"
    :resolution="myRandom"
    :quality="10" :imageUrl="imageUrl"
    :style="{height: '100%'}"
    >
      <pathtextinator>
        {{postData.title}}
      </pathtextinator>
    </gradiator>
    <!-- <div
    v-if="postData.header_image"
    v-else
    class="pillContainer noImage"
    >
      <h3>{{postData.title}}</h3>

    </div> -->
    <!-- {{postData}} -->
    </router-link>
  </article>
</template>

<script>

import gradiator from "@/components/gradiator.vue";

import pathtextinator from "@/components/pathtextinator.vue";

export default {

  components: {
    gradiator,
    pathtextinator,
  },
  name:"postPill",
  props: [
    "postData"
  ],
  computed: {
    link: function(){
      //console.log(this.postData.collection+this.postData.id)
      return "/"+this.postData.collection+"/"+this.postData.id
    },
    myRandom: function(){
      return Math.round(Math.random()*6)
    },
    imageUrl: function(){

      if(this.postData.header_image){
        //console.log(this.postData.header_image.data.thumbnails[4].url)
        return this.postData.header_image.data.thumbnails[4].url
      } else {
        return undefined //"https://picsum.photos/seed/"+this.postData.id+"/300" // "
      }

    }
  },
}
</script>

<style lang="scss" scoped>
h3{
  color: var(--white);
  font-size: 2rem;
  -webkit-transform: rotate(90deg);
  font-family: heimat-sans, sans-serif;
}
.pillContainer{
  width: 100%;
  height: 100%;
  //flex-grow: 1;
}
.noImage{
  display: flex;
  background: var(--bg);
  border: var(--border-width) solid var(--white);
  border-radius: 9000px;
  flex-direction: column;
  justify-content: center;
}
</style>

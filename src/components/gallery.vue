<template>
  <div class="gallroot" v-if="images.length > 0">
    <img :src="image.url+image.thumb" alt="" class="gallimg" v-for="image in images" :key="image.url">
  <!-- <div class="gallimg" v-for="image in images" :key="image.url" :style="{background: 'url('+image.url+image.thumb+')'}">
     {{image}}
   </div> -->
  </div>
</template>

<script>
export default {
  name:"gallery",
  props:["data"],
  computed: {
      images: function(){
        console.log(this.data)
        let baseURL = this.$api.config.url
        baseURL = baseURL.slice(0,-1)
        if(this.data.length > 0){
          let newData = []
          for(let i = 0; i < this.data.length; i++){
            let data = {}
            data.url = baseURL+this.data[i].directus_files_id.data.asset_url
            data.thumb = "?key=thumbnail"
            data.full = "?key=gallery"
            newData.push(data)
            newData.push(data)
            newData.push(data)
            newData.push(data)
          }
          return newData
        }else {
            return []
        }

      }
  }
}

</script>

<style lang="scss" scoped>

.gallroot{
  background: red;
  overflow: hidden;
  overflow-x: scroll;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-wrap: wrap;
  //margin: 1.5rem;
  //white-space: nowrap;
  //display: flex;

}

.gallimg{
  padding: 0;
  margin: 0;
  text-align: left;
  //border-radius: 9000px;
  display: inline-block;
  //margin: .5rem;
  //width: 25%;
  max-height: 20rem;

  border: var(--border-width) solid var(--content-color);
}

</style>

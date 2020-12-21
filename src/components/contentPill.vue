<template>
  <section class="pillContainer" v-if="postData !== undefined">
    <div
    class="pillContainer contentbox noImage"
    >
    <!-- <div class="corner1">
    </div> -->
        <h3>{{postData.title}}</h3>
        <div class="content body" v-html="postData.body">
"
        </div>
    </div>
  </section>
</template>

<script>

export default {

  components: {
  },
  name:"contentPill",
  props: [
    "postData"
  ],
  computed: {
    myRandom: function(){
      return Math.round(Math.random()*6)
    },
    imageUrl: function(){

      if(this.postData.header_image){
        console.log(this.postData.header_image.data.thumbnails[4].url)
        return this.postData.header_image.data.thumbnails[4].url
      } else {
        return undefined //"https://picsum.photos/seed/"+this.postData.id+"/300" // "
      }

    }
  },
}
</script>

<style lang="scss" scoped>
// .corner1{
//   float:  top left;
//   width: 50%;
//   shape-outside: polygon(0 0, 100% 0, 50% 15%, 15% 50%, 0 100%, 0 0);
//     &:after {
//   content: "";
//   display: block;
//   padding-bottom: 100%;
// }
// }

h3{
  color: var(--content-color);
  font-family: var(--body-text-font);
  font-style: var(--body-text-style);
  font-weight: var(--body-text-weight-bold);
}
.tile{

}
.contentbox{

  padding: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.pillContainer{
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  height: 100%;
  //flex-grow: 1;
  flex-shrink: 1;
}
.noImage{
  background: var(--bg);
  border: 2px solid var(--content-color);
  border-radius: 9000px;
}
@media  (max-width: 400px){
  .contentbox{
    padding-top: 7.5%;
  }
  h3{
    margin-top: 0;
  }
}
</style>

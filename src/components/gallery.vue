<template>
  <div class="gallery">
    <div class="lightboxcontainer"
      v-on:mouseover="stopRotation"
      v-on:mouseout="startRotation"
      v-if="itemsLength > 0"
      >
      <transition-group name="fade" tag="div" class="mediacontainer">
          <mediaItem
          :data="currentImg"
          :imgsize="full"
          v-for="i in [currentIndex]"
          :key="i"
          @playing="vidplay"
          @ended="vidstop"
          />
    </transition-group>
    <a :class="['prev', currentImg.content_type=='video' ? 'vid' : '']" @click="prev" href="#" v-if="itemsLength > 1"><p>&#10094;</p></a>
    <a :class="['next', currentImg.content_type=='video' ? 'vid' : '']" @click="next" href="#" v-if="itemsLength > 1"><p>&#10095;</p></a>
    </div>
    <div
    class="coverlist"
    v-if="itemsLength > 1"
    ref="coverlist"
    @mousdown="sliderMouseDown"
    @mouseleave="sliderMouseUp"
    @mouseup="sliderMouseUp"
    @mousemove="sliderMouseMove"
    >
      <div
      v-on:mouseover="stopRotation"
      v-on:mouseout="startRotation"
      :class="[item.id==currentId ? 'activeItem' : '']"
      :style="{backgroundImage: 'url('+item.url+thumb+')'}"
      v-for="item in items"
      :key="item.id"
      :ref="'preview'+item.id"
      @click="setSlide(item.id)"
      ></div>
    </div>

    <!-- <div class="gallroot" v-if="images.length > 0">
      <img :src="image.url+thumb" alt="" class="gallimg" v-for="image in images" :key="image.url">
    <div class="gallimg" v-for="image in images" :key="image.url" :style="{background: 'url('+image.url+image.thumb+')'}">
       {{image}}
     </div>
    </div> -->
  </div>

</template>

<script>
import mediaItem from "@/components/mediaItem.vue"
export default {
  name:"gallery",
  props:["imagedata","videodata","hero"],
  components: {
    mediaItem,
  },
  computed: {
      items: function(){

        //console.log(this.imagedata, this.videodata, this.hero)
        let baseURL = this.$api.config.url
        baseURL = baseURL.slice(0,-1)
        let newData = {}
        let counter = 0;
        if(this.hero){
          let data = this.hero.data
          data.url=baseURL+this.hero.data.asset_url.replace(/ /g,"%20");
          data.id = counter
          data.content_type = "image"
          newData[counter] = data
          counter++
        }
        if(this.videodata && this.videodata.length > 0){

          for(let i = 0; i < this.videodata.length; i++){
            let data = this.videodata[i].directus_files_id
            data.url = baseURL+this.videodata[i].directus_files_id.data.asset_url.replace(/ /g,"%20");
            data.id = counter
            data.content_type = "video"
            newData[counter] = data
            counter++
          }

        }
        if(this.imagedata && this.imagedata.length > 0){

          for(let i = 0; i < this.imagedata.length; i++){
            let data = this.imagedata[i].directus_files_id
            data.url = baseURL+this.imagedata[i].directus_files_id.data.asset_url.replace(/ /g,"%20");
            data.id = counter
            data.content_type = "image"
            newData[counter] = data
            counter++
          }

        }
        return newData
      },
      itemsLength: function() {
        return Object.keys(this.items).length
      },
      currentId: function() {
          return ((this.currentIndex % this.itemsLength) + this.itemsLength) % this.itemsLength
      },
      currentImg: function() {
        if(this.itemsLength > 1){
          this.scrollTo(this.currentId)
        }

      return this.items[this.currentId];
    }
  }, data: function(){
    return {
      thumb: "?key=thumbnail",
      full: "?key=gallery",
      timer: null,
      currentIndex: 0,
      slideTime: 6000,
      vidplaying: false,
      sliderMouseIsDown: false,
      sliderStartX: null,
      sliderScrollLeft: null,
    }
  },
  methods: {
    sliderMouseDown: function(e){
      //console.log("boiiii")
      this.sliderMouseIsDown = true
      this.sliderStartX = e.pageX - this.$refs.coverlist.offsetLeft
      this.sliderScrollLeft = this.$refs.coverlist.scrollLeft
    },
    sliderMouseUp: function(){
      this.sliderMouseIsDown = false
    },
    sliderMouseMove: function(e){
      if(this.sliderMouseIsDown){
        this.$refs.coverlist.preventDefault()
        let x = e.pageX - this.$refs.coverlist.offsetLeft
        let walk = (x - this.sliderStartX)
        this.$refs.coverlist.scrollLeft = this.sliderScrollLeft - walk;
      }
    },
    scrollTo: function (id) {
      //console.log(this.$refs)
      if(!this.$refs['preview'+id]){
        return
      }
      let el = this.$refs['preview'+id][0]
      const elLeft = el.offsetLeft + el.offsetWidth;
      const elParentLeft = el.parentNode.offsetLeft + el.parentNode.offsetWidth;
      //console.dir(el, elParentLeft)
      // check if element not in view
      if (elLeft >= elParentLeft + el.parentNode.scrollLeft) {
        el.parentNode.scrollLeft = elLeft - elParentLeft + 20;
      } else if (elLeft <= el.parentNode.offsetLeft + el.parentNode.scrollLeft) {
        el.parentNode.scrollLeft = el.offsetLeft - el.parentNode.offsetLeft - 15;
      }
    },
    vidplay: function() {
      this.vidplaying = true
      this.stopRotation()
    },
    vidstop: function() {
      this.vidplaying = false
      this.next()
    },
    setSlide: function(id){
      this.currentIndex = id
      if(this.timer){
        this.stopRotation()
        this.startRotation()
      }
    },
    startRotation: function() {
      if(!this.vidplaying){
        this.timer = setInterval(this.next, this.slideTime);
      }
    },

    stopRotation: function() {
    clearTimeout(this.timer);
    this.timer = null;
    },
    next: function() {

      this.vidplaying = false
      if(this.itemsLength > 1){
        this.currentIndex += 1;
      }
      if(this.timer){
        this.stopRotation()
        this.startRotation()
      }
    },
    prev: function() {
      if(this.itemsLength > 1){
        this.currentIndex -= 1;
      }
      if(this.timer){
        this.stopRotation()
        this.startRotation()
      }
    }
  },
  mounted: function(){

  }
}

</script>

<style lang="scss" scoped>

.gallery {
  width: 100%;
  //background: red;
  .lightboxcontainer {
    position: relative;
    width: 100%;
    height: var(--article-image-max-height-default);
    .prev, .next {

      display: inline-block;
      position: absolute;
      top: 0;
      cursor: pointer;
      width: 50%;
      height: 100%;
      color: var(--content-color);
      font-weight: var(--accent-text-weight);
      font-size: var(--article-margin-default);
      transition: var(--transition-time) ease;
      text-decoration: none;
      user-select: none;
      opacity: 0;
      &.vid{ // leave some space for vid controls if they decide to spawn (they shouldn't)
        transition: none;
        width: 25%;
        height: 75%;
        top: 50%;
        transform: translateY(-50%);
      }
      &:hover{
        opacity: 1;
      }
      p {
        padding: var(--article-margin-default);
        margin: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .next {
      right: 0;
      p{
        right: 0;
      }
      text-align: right;
    }

    .prev {
      left: 0;
      text-align: left;
    }
    .mediacontainer{
      width: 100%;
      height: var(--article-image-max-height-default);
    }
  }

  .coverlist {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    &::-webkit-scrollbar-thumb { /* WebKit */
      background-color: rgba(0,0,0,0);
      background-image: linear-gradient(var(--content-color) -7000%, rgba(0,0,0,0) 1000%);
        // width: 0;
        // height: 0;

    }
    &:hover::-webkit-scrollbar{
      width: 7px;
      height: 7px;
    }
    &::-webkit-scrollbar{
      width: var(--border-width);
      height: var(--border-width);
    }
    white-space: nowrap;
    text-align: left;
    width: 100%;
    overflow-y: auto;
    div {
      cursor: pointer;
      display: inline-block;

      width: calc(var(--font-scalar) * var(--font-scalar) * 1rem);
      margin: calc(var(--article-margin-default) / 3);
      background-color: var(--content-color);
      height: auto;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;

      border-radius: 9000px;
      &.activeItem{
        background-size: 0;
      }
      &:after{
        content:"";
        display: block;
        padding-bottom: 100%;
      }
    }

  }

}
.fade-enter-active,
.fade-leave-active {
  transition: all var(--transition-time) ease;
  overflow: hidden;
  visibility: visible;
  position: absolute;
  width:100%;
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  visibility: hidden;
  width:100%;
  opacity: 0;
}
</style>

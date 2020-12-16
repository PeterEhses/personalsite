<template>
  <div :class="[portraity ? 'portraity' : 'landscapey', 'mItem']">
    <!-- {{url}} -->
    <img :src="data.url+imgsize" alt="" v-if="data.content_type == 'image'">
    <yt-player
    class="yt"
    v-if="data.type == 'embed/youtube'"
    ref="yt"
    :ytid="data.embed"
    :playerVars="ytVars"
    width=""
    height=""
    @ready="onYtReady"
    @playing="onPlaying"
    @paused="onPaused"
    @ended="onEnded"
    ></yt-player>

    <vueVimeoPlayer
    v-if="data.type == 'embed/vimeo'"
    class="vimeo"
    ref="vimeo"
    :video-id="data.embed"
    :autoplay="true"
    :options="vimeoVars"
    @play="onPlaying"
    @playing="onPlaying"
    @pause="onPaused"
    @ended="onEnded"
    ></vueVimeoPlayer>

    <div v-if="data.content_type == 'video'"  >

    </div>
  </div>
</template>

<script>
import { vueVimeoPlayer } from 'vue-vimeo-player'
export default {
  name: "mediaItem",
  components: {
    vueVimeoPlayer
  },
  props: [
    "data",
    "imgsize"
  ],
  data: function(){
    return {
      videoDOM: null,
      dimensions: {w:1,h:1},
      aspectPercw: "100%",
      aspectPerch:"100%",
      portraity: false,
      ytVars: {
        autoplay: 1,
        controls: 0,
        iv_load_policy: 3,
        fs: 0,
        color: "white",
        modestbranding: 1,
        playsinline: 1,
      },
      vimeoVars: {
        byline: false,
        color: '00b4bf',
        dnt: true,
        responsive: true,
        muted: true,
        playsinline: true,
        portrait: false,
        title: false,
      }
    }
  },
  computed: {
    aspect: function(){
      if(this.data && this.data.width & this.data.height){
        let w = this.data.width,
            h = this.data.height
        return w/h
      }else{
        return 1
        //eturn [1,1]
      }
    }
  },
  watch:{
    dimensions: {
      deep: true,
      handler(){
        this.setAspect()
      }
    }
  },
  methods: {
    setAspect: function(){
      let aFrame = this.dimensions.w/this.dimensions.h
      let aVid = this.aspect
      //console.log(this.$refs.yt)
      if(aFrame > aVid){
        this.portraity = false
        this.aspectPercw = "100%"
        this.aspectPerch = "400%"
      }else{
        this.portraity = true
        this.aspectPercw = "400%"
        this.aspectPerch = "100%"
      }
    },
    dimGet: function(){
      this.dimensions = {w:this.$el.clientWidth, h:this.$el.clientHeight};
    },
    onYtReady: function(){
      this.$refs.yt.player.mute();
      this.$refs.yt.player.playVideo();
    },
    onPlaying: function(){
      this.$emit('playing')
    },
    onPaused: function(){
      this.$emit('paused')
    },
    onEnded: function(){
      this.$emit('ended')
    },
  },
  mounted: function(){
    if(this.data.content_type == 'video'){
      this.dimGet();
      this.$el.addEventListener("resize", this.dimGet);
    }

  },
   created: function () {
     if(this.data.content_type == 'video'){
      window.addEventListener("resize", this.dimGet);
      window.addEventListener("load", this.dimGet);
    }
  },
  destroyed: function () {
    if(this.data.content_type == 'video'){
      window.removeEventListener("resize", this.dimGet);
      window.removeEventListener("load", this.dimGet);
      this.$el.removeEventListener("resize", this.dimGet);
    }
  },
}
</script>

<style lang="scss">
.mItem{
  position: relative;
  width: 100%;
  height: var(--article-image-max-height-default);
  overflow: hidden;
  border-radius: 9.9rem 0 10rem 0;
  img {
    width: 100%;
    height: var(--article-image-max-height-default);
    object-fit: cover;

  }
  .yt{
    cursor: pointer;
    user-select: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
  }
  &.landscapey{
    .yt,
    .vimeo iframe{
      width: 100% !important;
      height: 400% !important;
    }
  }
  &.portraity{
    .yt,
    .vimeo iframe{
      width: 400% !important;
      height: 100% !important;
    }
  }
  .vimeo{
    height: 100%;
    width: 100%;
    div {
      height: 100%;
      width: 100%;
      iframe{
        cursor: pointer;
        user-select: none;
        position: absolute;
        left: 50% !important;
        top: 50% !important;
        transform: translate(-50%, -50%);
        height: 100%;
        width: 100%;
      }
    }

  }
}

</style>

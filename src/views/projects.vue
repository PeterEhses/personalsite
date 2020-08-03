<template>
<!-- eslint-disable -->
  <div class="home tileContainer" :style="{height: tileContainerHeight}">
    <contentPill
    class="tile greeting"
    :postData="greetingText"
    :style="{width: greetingDimension.front}"
    />

    <postPill
    v-if="posts"
    class="tile"
    :style="{width: tileDimension}"
    v-for="post in posts"
    :postData="post"
    :key="post.id"
    />

    <contentPill
    v-if="greetingDimension.back"
    class="tile greeting"
    :postData="endText"
    :style="{width: greetingDimension.back}"
    />

    <articleBoi class="activeArticle" v-if="$route.params.id">
      {{ $route.params }}
    </articleBoi>
<!-- eslint-enable -->


    <!-- <div  class="tile" v-for="idx in numSegments" :key="idx" :style="{width: tileDimension}">
      <gradiator :gradType="['linear', 'radial', 'conic'][idx%3]" :gradAngle="((baseSegments%(idx))+idx*69)%360" :resolution="Math.round(Math.random()*6)" :quality="10" :imageUrl="randImgs[idx-1]" :style="{height: '100%'}">
        <pathtextinator>
         Hi! look at my Lorem Ballsum
        </pathtextinator>
      </gradiator>
    </div> -->
  </div>
</template>

<script>
// import gradiator from "@/components/gradiator.vue";
//
// import pathtextinator from "@/components/pathtextinator.vue";

import postPill from "@/components/postPill.vue";
import contentPill from "@/components/contentPill.vue";
import articleBoi from "@/components/articleBoi.vue";

export default {

  components: {
    // gradiator,
    // pathtextinator,
    postPill,
    contentPill,
    articleBoi,
  },
    data: function(){
    return {
      collection: "projects",
      baseSegments: 6,
      picdata: undefined,
      innerWidth: (window.innerWidth > 0) ? window.innerWidth : screen.width,
      postdata: [],
      greetingText: {
        title:'Moin,',
        body: `<p> Ich bin Peter.</p>
        <p>Diese Seite ist gerade im Aufbau, aber schau dich ruhig schon einmal um.</p>
        <p>Hier sind meine Projekte.</p>
        <p><hr/></p>
        <p>Kann ich dir helfen?</p>
         <a class="button" href="./kontakt">Find' es heraus!</a>`,
        id:"ball" },
        endText: {
          title:"Mehr gibt's erst später",
          body: `<p>Bis dahin hier eine Ente und noch ein <i>call to action</i>.</p>
          <svg  style="width: 60px; height: 50px;">
          <g   transform="translate(0,-233.49996)">
    <path
       style="fill:var(--content-color);fill-opacity:1;stroke:none;stroke-width:0.08550026px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 25.016291,249.43562 c -5.052544,0 -7.686842,4.57752 -7.686842,6.77991 0,2.20239 1.986547,5.39812 1.986547,6.73682 0,1.33871 -1.037844,3.49701 -3.584333,3.58416 -5.612494,0.19208 -5.9778279,-3.39774 -6.0174139,-3.94252 -0.03959,-0.54479 -0.357639,-0.67277 -0.762492,-0.67816 -1.597666,-0.0213 -4.7739841,2.60026 -4.7739841,7.97456 0,5.37431 4.3803071,12.45165 15.656397,12.45165 10.450561,0 16.237202,-6.13215 16.237202,-10.45057 0,-4.31841 -5.009279,-7.25508 -5.009279,-9.67339 0,-2.41831 0.69085,-2.07271 0.69085,-2.07271 0,0 2.331949,0.34547 4.318429,-1.72737 1.986468,-2.07285 1.770623,-3.75715 1.770623,-4.09183 0,-0.33467 -0.188869,-0.38859 -0.404792,-0.38859 -0.215923,0 -1.960339,0.34902 -3.594011,0.34902 -1.633662,0 -2.168073,-0.39711 -2.168073,-0.39711 0,0 -1.606285,-4.45387 -6.658828,-4.45387 z m 0.63106,5.25677 c 0.300405,0.003 0.599545,0.11037 0.808747,0.37473 0.608583,0.76908 0.202781,1.71752 -0.5833,1.71752 -0.78608,0 -1.343961,-0.1794 -1.343961,-1.35865 -0.03328,-0.37012 0.545021,-0.74023 1.118514,-0.7336 z"/>
    <path
       style="fill:var(--content-color);fill-opacity:1;stroke:none;stroke-width:0.08550026px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 50.915916,248.5948 c -0.103609,0.002 -0.205951,0.006 -0.3071,0.0112 -3.236789,0.18321 -7.878292,1.22143 -8.61115,2.565 -0.732856,1.34358 -0.366403,4.70242 0.244309,5.43528 0.610719,0.73286 2.687084,1.22155 2.687084,1.22155 0,0 -0.671688,2.32068 -2.870268,3.7864 2.62608,-0.73286 5.130016,-3.84751 5.130016,-3.84751 0,0 6.717755,0.18323 8.183479,-0.18319 1.465714,-0.36643 3.78644,-5.43533 3.420009,-6.3514 -0.354981,-0.88745 -4.664646,-2.69198 -7.876379,-2.63732 z m -2.587887,2.40804 c 0.104481,0 0.191922,0.0343 0.262178,0.1027 0.07025,0.0684 0.10537,0.15208 0.10537,0.25115 0,0.1369 -0.0056,0.34327 -0.01635,0.61888 -0.009,0.2738 -0.01335,0.47913 -0.01335,0.61604 0,0.045 -0.0064,0.13144 -0.01903,0.25933 -0.01083,0.11889 -0.01534,0.20983 -0.01354,0.27287 l 1.037687,-0.19454 c 0.4053,-0.0721 0.754764,-0.11344 1.048379,-0.12425 0.0072,-0.12069 0.01887,-0.44494 0.03508,-0.97273 0.0036,-0.13871 0.04601,-0.29813 0.127079,-0.47827 0.100872,-0.22156 0.215109,-0.33232 0.342999,-0.33232 0.09547,0 0.180143,0.0315 0.253997,0.0945 0.07926,0.0684 0.118906,0.154 0.118906,0.25667 0,0.027 -0.0035,0.0541 -0.0107,0.0812 h -1.71e-4 c -0.03603,0.13149 -0.05393,0.24589 -0.05393,0.34316 0,0.0505 -0.0054,0.12869 -0.01619,0.23497 -0.009,0.10447 -0.01354,0.18201 -0.01354,0.23245 0,0.17112 -0.009,0.42513 -0.02705,0.76198 -0.018,0.33686 -0.02705,0.59087 -0.02705,0.76199 0,0.1315 0.0099,0.32779 0.02973,0.58899 0.01984,0.26119 0.02973,0.45748 0.02973,0.58898 0,0.0991 -0.03513,0.18287 -0.10537,0.25132 -0.07025,0.0684 -0.157535,0.1027 -0.262017,0.1027 -0.106277,0 -0.198249,-0.0342 -0.275705,-0.1027 -0.07745,-0.0667 -0.116056,-0.14854 -0.116056,-0.24581 0,-0.1315 -0.0064,-0.32882 -0.01904,-0.59182 -0.01083,-0.263 -0.01619,-0.46016 -0.01619,-0.59166 0,-0.10267 0.0019,-0.19378 0.0055,-0.27303 -0.282809,0.0126 -0.632264,0.0568 -1.048379,0.13242 -0.345855,0.0631 -0.691833,0.12703 -1.037691,0.19188 -0.0036,0.12249 -0.01612,0.32695 -0.03774,0.61337 -0.018,0.25218 -0.02705,0.45838 -0.02705,0.6187 0,0.0991 -0.03513,0.18287 -0.10537,0.25132 -0.07025,0.0684 -0.157704,0.10271 -0.262179,0.10271 -0.104481,0 -0.19176,-0.0342 -0.262013,-0.10271 -0.07025,-0.0684 -0.105374,-0.15225 -0.105374,-0.25132 0,-0.18193 0.01529,-0.45385 0.04592,-0.81593 0.03242,-0.36206 0.04859,-0.63415 0.0486,-0.81608 0,-0.23058 0.0053,-0.57726 0.01619,-1.04021 0.01083,-0.46474 0.01635,-0.81246 0.01635,-1.04303 0,-0.0991 0.03513,-0.18271 0.105372,-0.25116 0.07025,-0.0684 0.157533,-0.1027 0.262015,-0.1027 z m 4.342139,0.15129 c 0.115291,0 0.214223,0.0388 0.297079,0.11623 0.08467,0.0774 0.127088,0.17187 0.127088,0.28355 0,0.11169 -0.04242,0.20627 -0.127088,0.28372 -0.08286,0.0774 -0.181788,0.11623 -0.297079,0.11623 -0.115277,0 -0.215254,-0.0388 -0.299915,-0.11623 -0.08466,-0.0774 -0.12708,-0.17203 -0.12708,-0.28372 0,-0.11168 0.04242,-0.2061 0.12708,-0.28355 0.08466,-0.0774 0.184638,-0.11623 0.299915,-0.11623 z m -0.08917,1.21588 c 0.108072,0 0.197103,0.0342 0.267349,0.1027 0.07025,0.0667 0.105374,0.15219 0.105374,0.25666 0,0.16033 -0.0089,0.36113 -0.02689,0.60252 -0.018,0.24137 -0.02705,0.44218 -0.02705,0.6025 0,0.10268 0.0029,0.2675 0.0082,0.49447 0.0072,0.22697 0.01069,0.39179 0.01069,0.49446 0,0.10449 -0.03513,0.19106 -0.105369,0.25951 -0.07025,0.0667 -0.15945,0.0999 -0.267525,0.0999 -0.108081,0 -0.197273,-0.0333 -0.26752,-0.0999 -0.07025,-0.0684 -0.105379,-0.15502 -0.105379,-0.25951 0,-0.10267 -0.0035,-0.26749 -0.01069,-0.49446 -0.0054,-0.22697 -0.0082,-0.39179 -0.0082,-0.49447 0,-0.16032 0.009,-0.36113 0.02705,-0.6025 0.018,-0.24139 0.02705,-0.44219 0.02705,-0.60252 0,-0.10447 0.03513,-0.19001 0.105376,-0.25666 0.07025,-0.0684 0.159443,-0.1027 0.267525,-0.1027 z"/>
  </g>
          </svg>
          <p><hr/></p>
          <p>Kann ich dir helfen?</p>
           <a class="button" href="./kontakt">Find' es heraus!</a>`,
          id:"egg" }
    }
  }, computed: {
    posts: function(){
      let posts = [];
      if(this.postdata["data"]){
        for(let i = 0; i < this.postdata["data"].length; i++){

            let post = this.postdata["data"][i];
            post.collection=this.collection;
            posts.push(post);

        }
      }

      return posts;
    },
    postsSplit: function() {
      return Math.ceil(this.posts.length / this.numSegments);
    },
    extraSpace: function() {
      return this.posts.length%this.numSegments;
    },
    tileContainerHeight: function(){
      let mult = this.postsSplit
      if(((this.numSegments-this.extraSpace)/2 <= 1) || (!isNaN(this.extraSpace) && this.extraSpace < 1)){
        mult += 1;
      }
      return "calc( ( 100vh - 8rem ) * "+mult+" )"
    },
    greetingDimension: function(){

      if(this.numSegments == false) { // this.numSegments-this.extraSpace < 2
        let dim = "calc(100% / "
        dim += this.numSegments
        dim += " * "
        dim += this.numSegments-this.extraSpace
        dim += " )"
        return {front: dim, back: undefined}
      }
      else{
          //console.log(this.extraSpace, Math.floor((this.numSegments-this.extraSpace)/2))
          let dim = "calc(100% / "
          dim += this.numSegments
          dim += " * "
          if(Math.ceil((this.numSegments-this.extraSpace)/2) < 2) {
            dim += Math.floor((this.numSegments+this.numSegments-this.extraSpace)/2)
          } else {
            dim += Math.ceil((this.numSegments-this.extraSpace)/2)
          }
          dim += " )"
          let dim2 = "calc(100% / "
          dim2 += this.numSegments
          dim2 += " * "
          dim2 += Math.floor((this.numSegments-this.extraSpace)/2) || Math.ceil((this.numSegments+this.numSegments-this.extraSpace)/2)
          dim2 += " )"
          return {front: dim, back: dim2}
      }

    },
    tileDimension: function(){
      let dim = "calc(100% / "
      dim += this.numSegments
      dim += " )"
      return dim
    },
    numSegments: function(){
      let numS = 0;
      let width = this.innerWidth;
      let baseWidth = (1900/this.baseSegments) // calculkate dynamically based on my screen because i only own so many devices
      numS = Math.round(width / baseWidth )
      return numS
    },
    randImgs: function() {
      let URLs = []
      if(this.picdata.length >= this.numSegments){
        let ranNum = Math.round(Math.random()*(this.picdata.length-this.numSegments))
        for(let i = 0; i < this.numSegments; i++){
          //console.log(ranNum+i)
          let url = this.picdata[ranNum+i].download_url
          url = url.split("/").slice(0,-2).join("/")+"/512"
            URLs.push(url);
        }
      }
      return URLs;
    },
  },
  methods: {

    getImgsAsync() {
      let that = this;
      this.axios.get("https://picsum.photos/v2/list?limit=100").then((response) => {
        //console.log(response)
        that.picdata = response.data
  } );
},
myEventHandler(){
  this.innerWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width
},
getPosts(collection) {
  let that = this;
  this.$api.getItems(this.$api.prefix+collection,{fields:["id","title","header_image.data.full_url"],sort: "-created_on"}).then(data => {
    //console.log(data)
  that.postdata = data;

})
.catch(error => console.error(error));
}
  },


  mounted: function() {
    this.getPosts(this.collection)
    this.getImgsAsync()
}, created: function () {
  window.addEventListener("resize", this.myEventHandler);
},
destroyed: function () {
  window.removeEventListener("resize", this.myEventHandler);
},
}
</script>

<style lang="scss" scoped>


.postRow{
  display: flex;
  width: 100%;

}
  .tileContainer{
    width: 100%;
    height: auto;
    min-height: calc(100vh - 8rem);
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    //flex-shrink: 0;
    align-items: stretch;
  }
  .tile,
  .tileContainer{
    padding: .333rem;
    width: 100%;
    height: 500px;
    height: 100vh;
    height: calc( 100vh - 8.666rem );

  }
  .tile{

  }
  .greeting{
  }
</style>

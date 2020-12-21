<template>
  <article class="activeArticle">
    <router-link :to="'/'+$route.meta.collection" id="articleBack">
    <div>
      <p>🡐</p>
    </div>
    </router-link>
    <gallery
    :imagedata="postdata.data.gallery"
    :videodata="postdata.data.video_embeds"
    :hero="postdata.data.header_image"
    v-if="postdata && postdata.data"
    />
    <!-- <div class="hero" v-if="postdata.data && postdata.data.header_image" :style="{background: heroBG}">

    </div> -->
    <articleHeader
    v-if="postdata.data"
    :links="postdata.data.external_links"
    :team="postdata.data.team"
    :tools="postdata.data.tools"
    :deliverables="postdata.data.deliverables"
    :role="postdata.data.role"
    :created_on="postdata.data.created_on"
    :created_orig="postdata.data.created_original"
    >{{postdata.data.title}}</articleHeader>



    <vue-markdown
    class="markdown hyphenate"
    v-if="postdata.data && isMarkdown"
    :quotes="'„“‚‘'"
    > {{postdata.data.body_markdown}} </vue-markdown>

    <div
    id="content"
    class="articlebody hyphenate"
    v-html="postdata.data.body"
    v-if="postdata.data && !isMarkdown"
    ></div>



    <footerBoi/>
  </article>
</template>

<script>

const VueMarkdown = () => import('vue-markdown')
import footerBoi from "@/components/footer.vue"
import gallery from "@/components/gallery.vue"
import articleHeader from "@/components/articleHeader.vue"
export default {
  name: "articleBoi",
  components: {
    footerBoi,
    gallery,
    VueMarkdown,
    articleHeader
  },
  data: function(){
    return{
      postdata: {},
      isMarkdown: false,
    }
  }, computed: {
    heroBG: function(){

      return "url("+this.imageNameToUrl(this.postdata.data.header_image.data.asset_url, 'hero', true)+")"
    }
  },

  methods: {
    imageNameToUrl(name,key,isHero=false){
      let apiPath = "/api/assets/"
      if(isHero){
        apiPath = ""
      }
      return "https://directus."+
              this.$host+
              apiPath+
              name.replace(/  */g,'%20')+
              "?key="+key
    },
    imageMaker(str, alt, url, title, mode){
      if(typeof(mode) == 'undefined'){
        mode = "imagendef"
      }
      // console.dir(arguments)
      let fullUrl = this.imageNameToUrl(url,'gallery')
      let imageHtmlString = '<img class="'
                        +mode
                        +'" src="'
                        +fullUrl
                        +'" alt="'
                        +alt
                        +'">'
      let titleHtmlString = ""
      if(typeof(title) !== 'undefined'){
        titleHtmlString = '<figcaption>'
                          +title
                          +'</figcaption>'
      }

      let htmlString = '<figure class="'
                        +mode
                        +'">'
                        +imageHtmlString
                        +titleHtmlString
                        +'</figure>'
      return htmlString
    },
    getPosts(collection, id="") {
      let that = this;
      if(id != ""){
        id = "/"+id
      }
      this.$api.getItems(this.$api.prefix+collection+id,{fields:["*","header_image.data.full_url", "gallery.directus_files_id.*","video_embeds.directus_files_id.*"],sort: "-created_on"}).then(data => {
        //console.log(data)
      that.postdata = data;
      console.dir(data)
      if(data.data.body_markdown){
        // eslint-disable-next-line
        let findImagesRegex = /!\[(?<alt>[^\]]*)\]\((?<filename>.*?)(?=\"|\))(?:\"(?<optionalpart>.*)\")?\)(?:\<\!\-\-(?<type>.*?)\-\-\>)?/g
        data.data.body_markdown = data.data.body_markdown.replace(findImagesRegex, this.imageMaker)
        that.isMarkdown = true;
      } else {
        that.isMarkdown = false;
      }
    })
    .catch(error => console.error(error));
    }
  },
  updated: function () {
    if(this.isMarkdown){
      this.$nextTick(function(){ // import prism only when needed and attach to vue
        if(!this.$root._Prism){
          let Prism =  require('prismjs')
          require('../assets/prism-a11y-dark.css')
          require('prismjs/plugins/autoloader/prism-autoloader.min.js')
          this.$root._Prism = Prism;
        }
        this.$root._Prism.highlightAll()
      })

    }
    // let that = this
    // window.Hyphenopoly.hyphenators["HTML"].then(
    // function (enHyphenator) {
    //   enHyphenator(that.$el);
    // })
    // ()=>{console.log("AAA"+arguments)}
    // // DUMB HYPHENATION HACK REMOVE ONCE CHROME DOESN'T SUCK ANYMORE
    // // eslint-disable-next-line
    // window.Hyphenopoly = {
    //             require: {
    //                 "de": "Silbentrennungsalgorithmus",
    //                 //"en-us": "Supercalifragilisticexpialidocious"
    //             },
    //             setup: {
    //                 selectors: {
    //                     ".markdown": {}
    //                 }
    //             }
    //         };
    //
    // require('hyphenopoly/Hyphenopoly_Loader.js')
  },
  mounted: function(){
    this.getPosts(this.$route.meta.collection, this.$route.params.id)
  }, watch: {
    '$route.params.id': function(){
      this.getPosts(this.$route.meta.collection, this.$route.params.id)
    },
    '$route.meta.collection': function(){
      this.getPosts(this.$route.meta.collection, this.$route.params.id)
    }
  }

}
</script>

<style lang="scss" >

@import "https://unpkg.com/katex@0.6.0/dist/katex.min.css";


.activeArticle{
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 90003;
  position: fixed;
  left: 0;
  top: var(--article-indent-top);
  margin-left: var(--article-indent-left);
  width: calc(100% - var(--article-indent-left));
  height: calc(100vh - var(--article-indent-top));
  background-image: url("/img/img-noise-256x256.png");
  background-attachment: local;
  background-blend-mode: lighten;
  background-color: var(--bg);
  &::-webkit-scrollbar-track {
    background-image: url("/img/img-noise-256x256.png");
    background-color: var(--bg);
    border-radius: 0;
    //border: .5px solid var(--content-color);
  }
  box-sizing: border-box;
  border-radius: 10rem 0 0 0;
  border-left: var(--border-width) solid var(--content-color);
  border-top: var(--border-width) solid var(--content-color);



  #articleBack{
    z-index: 2;
    padding: 0;
    margin: 0;
    position: absolute;
    left: 0;
    top: 0;
    & div{
      width: 3rem;
      height: 2rem;
      border-radius: 9000px;
      border: var(--border-width) solid var(--content-color);
      background: var(--bg);
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;

      & p{
        position: relative;
        top: 12%;
        color: var(--content-color);
        font-family: var(--body-text-font);
        font-style: var(--body-text-style);
        font-weight: var(--body-text-weight);
        margin: 0;
        padding: 0;
        font-size: 2.5rem;
      }

    }
  }

  .projectLink a{
    text-transform: none;
    padding: .2em .5em .15em .5em;
    color: var(--white);
    background: var(--accent-color);
    border-radius: 9000px;
  }



  // hero


  // .hero{
  //   flex-grow: 0;
  //   flex-shrink: 0;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   //width: calc( 100% - 4.666rem);
  //   height: calc(66vh - 3rem);
  //   //margin: 2rem;
  //   border-radius: 9.9rem 0 10rem 0;
  //   //border: var(--border-width) solid var(--content-color);
  //   background-position: center !important;
  //   background-repeat: no-repeat !important;
  //   background-size: cover !important;
  //   & h3{
  //     text-transform: uppercase;
  //     background: none;
  //     font-size: 3rem;
  //     color: var(--white);
  //     font-family: heimat-sans, sans-serif;
  //     border: none;
  //   }
  // }


  // info area: heading, links, ...



  //project link

  .projectLink{
    flex-grow: 0;
    padding: 0 1.5rem;
    margin: 0;
    display: flex;
    align-items: baseline;
  }

  //content


}
@media (max-width: 350px){
  .activeArticle{
    border-radius: 5rem 0 0 0;
    top: calc(var(--article-indent-left)/2);
    margin-left: calc(var(--article-indent-left)/2);
    width: calc(100% - calc(var(--article-indent-left)/2));
    height: calc(100vh - calc(var(--article-indent-left)/2));
  }

}
</style>

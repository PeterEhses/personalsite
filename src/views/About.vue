<template>
  <div class="about">
    <div class="content">
      <h2 v-if="postdata.data">{{postdata.data.title}}</h2>
      <vue-markdown class="singlepagecontent" v-if="postdata.data && isMarkdown" :quotes="'„“‚‘'">
        {{postdata.data.body_markdown}}
      </vue-markdown>
    </div>
  </div>
</template>

<script>
const VueMarkdown = () => import('vue-markdown')
export default {
  name:"about",
  components:{
    VueMarkdown
  },
  data: function(){
    return{
      postdata: {},
      isMarkdown: false,
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
      console.log("snatched me some markdown:")
      console.log(str, alt, url, title, mode)
      // console.dir(arguments)
      let fullUrl = this.imageNameToUrl(url,'gallery')
      let htmlString = '<img class="'
                        +mode
                        +'" src="'
                        +fullUrl
                        +'" alt="'
                        +alt
                        +'">'
      return htmlString
    },
    getPosts(collection, id="") {
      let that = this;
      if(id != ""){
        id = "/"+id
      }
      console.log(this.$api.prefix+collection+id)
      this.$api.getItems(this.$api.prefix+collection+id,{fields:["*"],sort: "-created_on"}).then(data => {
        //console.log(data)
      that.postdata = data;
      if(data.data.body_markdown){
        // eslint-disable-next-line
        let findImagesRegex = /!\[(?<alt>[^\]]*)\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)(?:\<\!\-\-(?<type>.*?)\-\-\>)?/g
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

  },
  mounted: function(){
    this.getPosts(this.$route.meta.collection, this.$route.meta.id)
  }
}

</script>

<style lang="scss" scoped>
  .content{
    width: 100%;
    width: 100%;
    max-width: 50em;
    max-width: calc(60ch + 6rem);
    margin: auto;
    padding: 3rem;
    margin: 3rem auto;
    min-height: 50vh;
    background-image: url("/img/img-noise-256x256.png");
    background-attachment: local;
    background-blend-mode: lighten;
    background-color: var(--bg);
    box-sizing: border-box;
    border-radius: 10rem;
    //border: var(--border-width) solid var(--content-color);
  }
</style>

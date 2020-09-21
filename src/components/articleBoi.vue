<template>
  <article class="activeArticle">
    <router-link :to="'/'+$route.meta.collection" id="articleBack">
    <div>
      <p>🡐</p>
    </div>
    </router-link>

    <div class="hero" v-if="postdata.data && postdata.data.header_image" :style="{background: heroBG}">
        <!-- <h2>{{postdata.data.title}}</h2> -->
    </div>
    <div class="info" v-if="postdata.data">
      <h2>{{postdata.data.title}}</h2>
      <div class="projectLinks" v-if="postdata.data.external_links">
        <div class="projectLink" v-for="(url, name) in postdata.data.external_links" :key="url">
          <h4> {{name}} <a :href="url">{{postdata.data.project_link}}</a> </h4>
        </div>
      </div>

      <gallery :data="postdata.data.gallery" v-if="postdata.data.gallery.length > 0"/>
    </div>




    <div id="content" class="body" v-html="postdata.data.body" v-if="postdata.data">
    </div>



    <footerBoi/>
  </article>
</template>

<script>
import footerBoi from "@/components/footer.vue"
import gallery from "@/components/gallery.vue"
export default {
  name: "articleBoi",
  components: {
    footerBoi,
    gallery
  },
  data: function(){
    return{
      postdata: {},
    }
  }, computed: {
    heroBG: function(){
      let gray = `linear-gradient(
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.15)
    ),`
      gray = "";
      let url = 'url('+
      "https://directus."+
      this.$host+
      this.postdata.data.header_image.data.asset_url+
      "?key=hero"+
      ')';
      console.log(url)
      return gray + url
    }
  },

  methods: {
    getPosts(collection, id="") {
      let that = this;
      if(id != ""){
        id = "/"+id
      }
      this.$api.getItems(this.$api.prefix+collection+id,{fields:["*","header_image.data.full_url", "gallery.directus_files_id.data","video_embeds.directus_files_id.data"],sort: "-created_on"}).then(data => {
        //console.log(data)
      that.postdata = data;
      console.log(data)

    })
    .catch(error => console.error(error));
    }
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

<style lang="scss" scoped>
.activeArticle{
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 90002;
  position: fixed;
  left: 0;
  top: 3rem;
  width: calc(100% - .666em);
  height: calc(100vh - 3rem);
  background: var(--bg);
  box-sizing: border-box;
  border-radius: 10rem 0 0 0;
  border-left: var(--border-width) solid var(--content-color);
  border-top: var(--border-width) solid var(--content-color);
  margin-left: .666rem;
}
#articleBack{
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
    color: var(--content-color);
    font-family: heimat-sans, sans-serif;
    margin: 0;
    padding: 0;
    font-size: 2.5rem;
  }

}
}

a{
  text-transform: none;
  padding: .2em .5em .15em .5em;
  color: var(--white);
  background: var(--accent-color);
  border-radius: 9000px;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--content-color);
  padding: .3em .3em .2em .3em;
  margin: 0 .5em;
  text-transform: none;
  border-radius: 9000px;
  border: var(--border-width) solid var(--content-color);
}

// hero


.hero{
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  //width: calc( 100% - 4.666rem);
  height: calc(66vh - 3rem);
  //margin: 2rem;
  border-radius: 9rem 0 10rem 0;
  //border: var(--border-width) solid var(--content-color);
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  & h3{
    text-transform: uppercase;
    background: none;
    font-size: 3rem;
    color: var(--white);
    font-family: heimat-sans, sans-serif;
    border: none;
  }
}


// info area: heading, links, ...

.info{
  width: 100%;
  height: 34vh;
  flex-shrink: 0;
  h2{
    border: none;
  }
}

//project link

.projectLink{
  flex-grow: 0;
  padding: 0 1.5rem;
  margin: 0;
  display: flex;
  align-items: baseline;
}

//content

.body{
  flex-grow: 1;
    text-align: left;
    padding: 1.5rem;
    margin: 0;
    & img{
      width: auto !important;
      height: auto !important;
    }
}

</style>

<template lang="html">
  <hgroup class="header" >
    <div class="primary">
      <time class="date" :datetime="date.toISOString()">
        {{datePre}}
        {{dateString}}
      </time>
      <title class="projectTitle">
        <h2><slot></slot></h2>
      </title>
    </div>
    <div class="secondary" v-if="links">
      <!-- <div class="linkChrome">
        find more here
      </div> -->
      <ul class="links">
          <li v-for="(url, link) in links" :key="url">{{link}} <a :href="url" >{{url}}</a></li>

      </ul>
    </div>
    <!-- <div class="projectLinks" v-if="postdata.data.external_links">
      <div class="projectLink" v-for="(url, name) in postdata.data.external_links" :key="url">
        <h4> {{name}} <a :href="url">{{postdata.data.project_link}}</a> </h4>
      </div>
    </div> -->


    <!-- v-if="postdata.data.gallery.length > 0" -->
  </hgroup>
</template>

<script>
export default {
  name:"articleHeader",
  props: [
    "links",
    "data",
    "created_on",
    "created_orig"
  ],
  data: function(){
    return{
      createdString: "published",
      projectCreatedString: "created",

    }
  },
  computed: {
    date: function(){
      return new Date(this.creted_orig ? this.created_orig : this.created_on)
    },
    dateString: function(){
      return this.date.getDate() + "." + this.date.getMonth() + "." + this.date.getFullYear();
    },
    datePre: function(){
      return this.creted_orig ? this.projectCreatedString : this.createdString
    }
  }
}
</script>

<style lang="scss" scoped>
  .header{



    text-align: left;
    display: block;
    position: relative;

    margin: auto;
    margin-top: var(--article-safe-space);
    width: 100%;
    height: auto;
    border-top: var(--border-width) solid var(--content-color);
    border-bottom: var(--border-width) solid var(--content-color);
    .primary,
    .secondary{
      width: 100%;
      display: inline-flex;
      align-items: stretch;
      & > *{
        display: inline-flex;
        align-items: baseline;
      }

    }
    .secondary{
      border-top: var(--border-width) solid var(--content-color);
      //flex-direction: row-reverse;
    }
    .projectTitle,
    .links{
      margin: 0;
      padding: var(--article-margin-default);
      h2{
        font-size: calc(var(--font-scalar) * var(--font-scalar) * 1rem);
        margin: 0;
      }
      a{
        text-transform: none;
        font-weight: var(--accent-text-weight-bold);
        display: block;
        margin: auto;
        &:after{
          content: " ↩";
          font-family: var(--body-text-font);
          font-style: var(--body-text-style);
          font-weight: var(--body-text-weight);
        }
      }
    }
    .projectTitle{
      display: flex;
      align-items: center;
    }
    .links{
      padding-left: max(calc(50% - var(--article-text-width) / 2), calc(var(--article-margin-default)*3));
      display: block;
    }
    .date,
    .linkChrome{
      flex-shrink: 0;
      flex-grow: 0;
      justify-content: center;
      text-align: center;
      word-break: keep-all;
      hyphens: none;
      padding: var(--article-margin-default);
      font-family: var(--accent-text-font);
      font-style: var(--accent-text-style);
      font-weight: var(--accent-text-weight-bold);

      width: calc(50% - var(--article-text-width) / 2 - var(--article-margin-default));
      border-right: var(--border-width) solid var(--content-color);
    }
    .linkChrome{
      border: none;
      border-left: var(--border-width) solid var(--content-color);
    }
  }
</style>

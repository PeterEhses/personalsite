<template lang="html">
  <hgroup class="header" >
    <div class="primary">
      <div class="titlewrapper">
        <div class="date">
          <time :datetime="date.toISOString()">
            {{datePre}}
            {{dateString}}
          </time>
        </div>

        <title class="projectTitle">
          <h2><slot></slot></h2>
        </title>
      </div>
    </div>

    <div class="secondary" v-if="links">
      <!-- <div class="linkChrome">
        find more here
      </div> -->
      <ul class="links">
          <li v-for="(url, link) in links" :key="url">{{link}} <a :href="url" >{{url}}</a></li>

      </ul>
    </div>
    <div class="secondary teamrole" v-if="team || role">
      <div class="team" v-if="team">
        <h3>Team</h3>
        <p>{{team}}</p>
      </div>
      <div class="role" v-if="role">
        <h3>Meine Rolle</h3>
        <p>{{role}}</p>
      </div>
    </div>
    <div class="chipsets" v-if="noEmptyTools || noEmptyDeliverables">
      <div class="secondary chipset tools" v-if="noEmptyTools">
        <h3>Tools</h3>
        <chip v-for="tool in noEmptyTools" :key="tool">{{tool}}</chip>
      </div>
      <div class="secondary chipset deliverables" v-if="noEmptyDeliverables">
        <h3>Deliverables</h3>
        <chip v-for="deliverable in noEmptyDeliverables" :key="deliverable">{{deliverable}}</chip>
      </div>
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
import chip from '@/components/chip.vue'
export default {
  name:"articleHeader",
  components: {
    chip,
  },
  props: [
    "links",
    "tools",
    "deliverables",
    "team",
    "role",
    "data",
    "created_on",
    "created_orig"
  ],
  data: function(){
    return{
      createdString: "publiziert",
      projectCreatedString: "",

    }
  },
  computed: {
    noEmptyTools(){
      return this.arrayNoEmpty(this.tools)
    },
    noEmptyDeliverables(){
      return this.arrayNoEmpty(this.deliverables)
    },
    date: function(){
      return new Date(this.created_orig ? this.created_orig : this.created_on)
    },
    dateString: function(){
      let sw = this.created_orig
      return sw ? (this.date.getMonth()+1) + "." + this.date.getFullYear() : this.date.getDate() + "." + (this.date.getMonth()+1) + "." + this.date.getFullYear();
    },
    datePre: function(){
      let sw = this.created_orig
      return sw ? this.projectCreatedString : this.createdString
    }
  },
  watch: {

  },
  methods: {
      arrayNoEmpty(array){
        if(!array || array.length < 1){
          return null
        }
        const filtered = array.filter(Boolean);
        return filtered;
      }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    --border-style: var(--border-width) solid var(--content-color);
    --perfect-padding: max(calc(50% - var(--article-text-width) / 2), calc(var(--article-margin-default)*3));

    text-align: left;
    display: block;
    position: relative;

    margin: auto;
    margin-top: var(--article-safe-space);
    width: 100%;
    height: auto;
    border-top: var(--border-style);
    .primary,
    .secondary{

      border-bottom: var(--border-style);
      width: 100%;
      display: inline-flex;
      align-items: stretch;
      & > *{
        display: inline-flex;
        align-items: baseline;
      }

    }
    .titlewrapper{
      display: inline-flex;
      align-items: stretch;
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
    }
    // .secondary{
    //   //border-top: var(--border-width) solid var(--content-color);
    //   //flex-direction: row-reverse;
    // }

    .teamrole{
      //border-top: var(--border-style);
      display: block;
        :first-child{
          &.team, &.role{
            p, h3{
              padding-top: 1rem;
            }
          }
        }
        :last-child{
          &.team, &.role{
            p, h3{
              padding-bottom: 1rem;
            }
          }
        }
      .team, .role{
        margin-top: -1px;
        width: 100%;

        align-items: stretch;
        display: inline-flex;
        p, h3{

          padding: .2rem var(--article-margin-default);
        }
      }
      p{
        //font-size: calc(1em / var(--font-scalar));
        width: auto;
        display: inline-block;
        margin: 0;
        word-break: normal;
        color: var(--accent-color);
      }
      h3{
        font-size: 1rem;
        margin: 0;
        text-transform: lowercase;
        display: inline-flex;
        align-items: baseline;
        flex-shrink: 0;
        flex-grow: 0;
        justify-content: center;
        text-align: center;
        word-break: keep-all;
        hyphens: none;
        font-family: var(--accent-text-font);
        font-style: var(--accent-text-style);
        font-weight: var(--accent-text-weight-bold);
        color: var(--content-color);

        width: calc(50% - var(--article-text-width) / 2 - var(--article-margin-default));
        border-right: var(--border-width) solid var(--content-color);
      }
    }
    .chipsets{
      margin: 1.5em 0;
    }
    .chipset{
      border: none;
      //padding: 0 var(--perfect-padding);
      display: block;
      text-align: center;
      margin: .25em;
      h3{
        font-family: var(--body-text-font);
        font-style: var(--body-text-style);
        font-weight: var(--body-text-weight);
        margin: auto 0;
      }
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
        margin-left: 0;
        width: 100%;
        &:after{
          content: " ↩";
          content: "";
          //content: url('../assets/link-swoosh.svg');
          display: inline-block;
          position: relative;
          mask: url('../assets/link-swoosh.svg') no-repeat;
          background-color: var(--accent-color);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          height: .65em;
          margin-left: .3em;
          width: .7em;
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
      width: 100%;
      padding-left: var(--perfect-padding);
      display: block;
    }
    .tools{
      width: 100%;
      clear: both;
      display: block;
    }
    .date{
      display: flex;
    }
    .date time{
      align-self: center;
      //height: 100%;
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
      border-right: var(--border-style);
    }
    .linkChrome{
      border: none;
      border-left: var(--border-style);
    }
  }


@media  (max-width: 1050px){
  .header{
    .teamrole .team, .teamrole .role{
      width: auto;
    }
    .teamrole .team,.teamrole .role, .titlewrapper{
      display: block;
      h3, .date{
        padding: .5rem !important;
        padding-top: 1rem !important;
        padding-bottom: 0 !important;
        display: block;
        white-space: nowrap;
        width: min-content;
        text-align: left;
        border: none;
      }
      title, p{
        padding: 1em !important;
        padding-left: .5rem !important;
        padding-top: 0rem !important;
      }
    }
    .titlewrapper, .team, .role{
      left: 0;
      position: relative;
      width: auto;
      display: block;
      margin-left: var(--perfect-padding);
      border-left: var(--border-style) !important;
    }
  }

}
@media  (max-width: 900px){
  .header{
    .titlewrapper, .teamrole .team, .teamrole .role{
      border-left: none !important;
      title, .date, h3, p{
        padding-left: 0 !important;
      }
    }
  }
}
</style>

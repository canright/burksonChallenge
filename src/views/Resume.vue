<template><div class="resume page">

  <h3>Resume</h3>
  <vue-markdown class="exposition" :source="exposition"/>

</div></template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import VueMarkdown from 'vue-markdown';
import axios from 'axios';

@Component({
  components: {
    VueMarkdown,
  },
})
class Resume extends Vue {
  public exposition = '';

  private mounted() {
    axios.get<string>('/markdown/Resume.md')
    .then ( ( resp  ) => { this.exposition = resp.data; })
    .catch( ( error ) => { this.exposition = error;  });
  }
}

export default Resume;
</script>

<style lang="less">
  .exposition {
    * {
      font-family: Arial, Helvetica
    }
    ul {
      list-style: square
    }
    h6 {
      background: #333;
      color: #EEE;
      text-align: center;
      padding: 8px;
      font-weight: bold;
      font-size: 16px
    }
    a {
      color: #FFF;
      text-decoration:none
    }
    table {
      margin: 0;
      padding: 0;
    }
    td {
      border: 0;
      margin: 0;
      padding: 0;
    }
  }

</style>

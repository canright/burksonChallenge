<template><div class="home page">

  <h3>Response to Burkson Recruitment Challenge</h3>
  <ul class="menu">
  <li><router-link to="/ChallengeOne">Challenge 1: Real Estate Property Listing</router-link></li>
  <li><router-link to="/ChallengeTwo">Challenge 2: Pool Reservations</router-link></li>
  <li><router-link to="/ChallengeThree">Challenge 3: Employee Listing</router-link></li>
  </ul>

  <vue-markdown class="exposition" :source="exposition"/>

  <router-link to="/Resume">Resume</router-link>

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
class Home extends Vue {
  public exposition = '';

  private mounted() {
    axios.get<string>('/markdown/Home.md')
    .then ( ( resp  ) => { this.exposition = resp.data; })
    .catch( ( error ) => { this.exposition = error;  });
  }
}

export default Home;
</script>

<style scoped lang="less">
  ul.menu {
    list-style: none
  }
</style>

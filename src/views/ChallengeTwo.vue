<template><div class="challengeTwo page">

  <h3>Challenge 2: Pool Reservations</h3>
  <vue-markdown class="exposition" :source="exposition"/>

  <h3>Solution: List pool reservations by number of days into the future.</h3>
  
  <div class="result">    
    <ol>
    <li v-for="(reservation, index) in reservations" :key="index">{{reservation}}</li>
    </ol>
  </div>

</div></template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import VueMarkdown from 'vue-markdown';
import axios from 'axios';

const listReservations = (horizon = 365, shareMod = 50, jackMod = 3) => {
  const reservations: string[] = [];
  const share   = (day: number) => day && !(day % shareMod); // is it a share day?
  const john    = (day: number) => day % jackMod;             // is it john's day?
  const assigne = (day: number) => share(day) ? 'Share' : john(day) ? 'John' : 'Jack';

  for (let day = 1; day <= horizon; ++day) {
    reservations.push(assigne(day));
  }
  return reservations;
};

@Component({
  components: {
    VueMarkdown,
  },
})
class ChallengeTwo extends Vue {
  public exposition = '';
  public reservations: string[];
  constructor() {
    super();
    this.reservations = listReservations();
  }

  private mounted() {
    axios.get<string>('/markdown/ChallengeTwo.md')
    .then ( ( resp  ) => { this.exposition = resp.data; })
    .catch( ( error ) => { this.exposition = error;  });
  }

}

export default ChallengeTwo;

</script>

<template><div class="challengeTwo page">

  <h3>Challenge 2: Pool Reservations</h3>
  <vue-markdown class="exposition" :source="exposition"/>

  <h3>Solution: List pool reservations by number of days into the future.</h3>
  
  <div class="result">    
    <ol>
    <li v-for="reservation in reservations">{{reservation}}</li>
    </ol>
  </div>

</div></template>

<script lang="ts">

const expositionMd = `
##### The Challenge

John and his friend Jack both like to swim… but rarely at the same time.
Every third day, Jack will swim in the pool alone.
When Jack isn’t swimming, John will swim in the pool alone.
However, every 50th day, both boys will swim in the same pool.
Write some pseudocode that loops through 365 days,
and outputs who is swimming on each day starting at day 1.

##### Draft Pseudocode

<pre>
for each day (1 - 365)
  if it is a share day
    (every 50th day)
    then output 'share'
  else if it is jacks day
    (every third day)
    then output 'jack'
  else output 'john'.
</pre>

##### Javascript Code with Output to Console

It is a small step to code this in javascript to confirm that it is correct.
To execute it, save this js code to a file and run it in node ('node myFile'):

<pre>
for(let day=1; day<=365; ++day) {
  const share = day => !(day%50);
  const john = day => day%3;
  const ownere = share(day)
    ? 'Share'
    : john(day) ? 'John':'Jack';
  console.log(day + ' ' + owner);
}
</pre>

##### Generate and View an Array of 365 Daily Reservations

Finally, in order to package it nicely and present it here, I:

- added some typings to convert the javascript to typescript
- refactored the code for a more readable, functional style
- tweaked it to output to an array rather than console.log
- generalized the functionality with these parameters:
  - horizon - number of days to report (default 365)
  - shareMod - day interval for share days (default 50)
  - jackMod - day interval for jack's day (default 3)

`;

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

import { Component, Vue } from 'vue-property-decorator';
import VueMarkdown from 'vue-markdown';

@Component({
  components: {
    VueMarkdown,
  },
})
class ChallengeTwo extends Vue {
  public exposition = expositionMd;
  public reservations: string[];
  constructor() {
    super();
    this.reservations = listReservations();
  }
}

export default ChallengeTwo;

</script>

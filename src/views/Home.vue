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

const expositionMd = `

#### Overview

This small client-side only application is my response a recruitment challenge offered by Burkson a few days ago:

1) Create a page displaying homes for potential buyers. Include UI for narrowing results down to price range, square footage, and bedroom count.

2) John and his friend Jack both like to swim… but rarely at the same time. Every third day, Jack will swim in the pool alone. When Jack isn’t swimming, John will swim in the pool alone. However, every 50th day, both boys will swim in the same pool. Write some pseudocode that loops through 365 days, and outputs who is swimming on each day starting at day 1.

3) Display a table of "Employees” from a JSON source that when displayed on a desktop device looks like a table, but looks more like a set of tiles/cards when shown on a smaller mobile device. Bonus: Use a profile image as part of the data to display.

Each of these 3 challenges are addressed by a page (one, two, three) of this response.

#### Stack

This app is implemented with this technology stack:

- git / Github
- Typescript, JS ES7
- Vue
- AWS S3
- REST
- Markdown

#### Mocked REST API

Iff this client side (only) application were fully realized it would have an associated server that exposed a REST API to fetch from a database:

- a JSON list of houses for sale for Challenge 1 ( GET '/houses')
- a JSON list of employees for Challenge 3 (GET '/employees')

For this challenge, the server side api's are mocked.

Sample data for the properties listing is nabbed from http://www.rmls.com/RC2/engine/reportGenerator.asp.
The unique property id is the multiple Listing number.

Sample data for the employees listing is made up I used popular musicians as the employees because their portrait images are readily available.

https://github.com/canright/burkson-challenge

#### Styling

Styling is minimalist.  This seems appropriate in this case because:

- The challenge did not call for sophisticated styling and no guidelines were offered.
- I expect the intent is primarily to demonstrate development rather visual design expertise.
- It is more productive to focus on application architecture and content early and styling later.
- My personal aesthetic tends toward clean and minimalist.

`;

import { Component, Vue } from 'vue-property-decorator';
import VueMarkdown from 'vue-markdown';

@Component({
  components: {
    VueMarkdown,
  },
})
class Home extends Vue {
  public exposition: string = expositionMd;
}

export default Home;
</script>

<style scoped lang="less">
  ul.menu {
    list-style: none
  }
</style>

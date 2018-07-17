<template><div class="challengeThree page">

  <h3>Challenge 3: Employee Listing</h3>
  <vue-markdown class="exposition" :source="exposition"/>

  <h3>Result</h3>

  <div class="cardsView result">
    <table>
      <caption>Employees</caption>
      <tr v-for="employee in employees" :key="employee.name">
        <td>
          <img :src=employee.portrait>
          <p><b>{{ employee.name }}</b><br>{{ employee.title }}</p>
        </td>
      </tr>
    </table>
  </div>

  <div class="floatView result">
    <h5>Employees</h5>
    <div v-for="employee in employees" :key="employee.name">
      <div><img :src=employee.portrait></div>
      <p><b>{{ employee.name }}</b><br>{{ employee.title }}</p>
    </div>
  </div>

  <div class="tableView result">
    <table>
      <caption>Employees</caption>
      <thead>
        <tr>
          <td>Name</td>
          <td>Title</td>
          <td>Portrait</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.name">
          <td>{{ employee.name }}</td>
          <td>{{ employee.title }}</td>
          <td><img :src=employee.portrait></td>
        </tr>
      </tbody>
    </table>
  </div>

</div></template>

<script lang="ts">

const expositionMd = `
##### The Challenge

Display a table of "Employees” from a JSON source
that when displayed on a desktop device looks like a table,
but looks more like a set of tiles/cards when shown on a smaller mobile device.
Bonus: Use a profile image as part of the data to display.

##### Implementation Notes

This appears to me to primarily be an exercise in CSS3 media queries.  But, I can interpret the tiles/cards thing in two different formats:

A. Show a column of cards that fill the width of the viewport.
B. Show cards that float to fill each row of the space.

So, I implemented both.

For viewport widths up to 400px, we get a column of cards each as wide as possible within the viewport (format A).

For viewport widths up to 640px, we get small cards that float as needed (format B);

For viewport widths greater than 640px, we get the grid display with a very small thumbnail of the portrait image.
It needs to be a small thumbnail here because a larger image forces each row to be too high and looks pretty ugly.

It is ironic that the smaller the display, the larger the image.
There is a good solution, which I have not implemented because it is out of scope.
That is, for the grid and floating card views, to treat the small images shown as clickable thumbnails that popup a full-sized image.

The float format has a notable weakness:  for most viewport widths, the margin on the right side of each row of thumbnails is too wide.
This is because the dom engine wraps to the next row when there is insuficient space for for another thumbnail.
This weakness might be resolved by:

- Using css media queries to layout each 'break' (eg: one layout for 3 thumbnail rows and another for 4 thumbnail rows)
- size the thumbnails based on the viewport width (which would be a different, but probably acceptable behavior.
- adjust the margins between thumbnails in a row (probably with javascript).
`;

interface Employee {
  name: string;
  title: string;
  portrait: string;
}

const fetchEmployees = (): Employee[] => {
  const employeesJson = `[
    { "name": "Jim Canright",   "title": "Senior Software Engineer" },
    { "name": "Jerry Garcia",   "title": "Lead Guitar" },
    { "name": "Bob Weir",       "title": "Rythym Guitar" },
    { "name": "David Lindley",  "title": "Strings" },
    { "name": "Bob Dylan",      "title": "Songwriter" },
    { "name": "John Lennon",    "title": "Inspiration" }
  ]`;
  return JSON.parse(employeesJson);
};

import { Component, Vue } from 'vue-property-decorator';
import VueMarkdown from 'vue-markdown';

@Component({
  components: {
    VueMarkdown,
  },
})
class ChallengeThree extends Vue {
  public exposition: string = expositionMd;
  public employees: Employee[];
  constructor() {
    super();
    this.employees = fetchEmployees().map((e: Employee) => {
      const id = e.name.replace(/ /g , '_').toLowerCase();
      e.portrait = './img/employees/' + id + '.jpg';
      return e;
    });
  }
}

export default ChallengeThree;

</script>

<style scoped lang="less">

.cardsView {
  img {
    width: 76vw;
    border : 1px solid #000;
  }
  td {
    padding-bottom: 60px;
  }
  margin-top: 4vw;
}
.floatView {
  >div {
    margin: 4vw 1vw 8vw 0;
    float: left;
    width: 100px;
    height: 190px;
    overflow: hidden;
    text-align: center;
    background-color: #fff;
    border: 1px solid #000;
    >div {
      width: 100px;
      height: 100px;
      overflow: hidden;
    }
    img {
      width: 100px;
    }
  }
}
.tableView {
  img {
    width: 3vw;
    height: auto;
  }
}

@media (max-width: 400px) {
  .cardsView { display: block; }
  .floatView { display: none;  }
  .tableView { display: none;  }
}
@media (min-width: 401px) {
  .cardsView { display: none;  }
  .floatView { display: block; }
  .tableView { display: none;  }
}

@media (min-width: 641px) {
  .cardsView { display: none;  }
  .floatView { display: none;  }
  .tableView { display: block; }
}

</style>

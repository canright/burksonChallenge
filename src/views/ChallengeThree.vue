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
          <td><img :src="employee.portrait"></td>
        </tr>
      </tbody>
    </table>
  </div>

</div></template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import VueMarkdown from 'vue-markdown';
import axios from 'axios';

interface Employee {
  name: string;
  title: string;
  portrait: string;
}

@Component({
  components: {
    VueMarkdown,
  },
})
class ChallengeThree extends Vue {
  public exposition = '';
  public employees: Employee[] = [];

  private mounted() {
    axios.get<string>('/markdown/ChallengeThree.md')
    .then ( ( resp  ) => { this.exposition = resp.data; })
    .catch( ( error ) => { this.exposition = error;  });

    axios.get<Employee[]>('/api/employees')
    .then( ( resp ) => {
      this.employees = resp.data.map((e: Employee) => {
        const id = e.name.replace(/ /g , '_').toLowerCase();
        e.portrait = './img/employees/' + id + '.jpg';
        return e;
      });
    })
    .catch( ( error ) => {
      this.employees = [];
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

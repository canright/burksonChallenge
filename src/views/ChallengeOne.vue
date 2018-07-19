<template><div class="challengeOne page">

  <h3>Challenge 1: Property Listing</h3>
  <vue-markdown class="exposition" :source="exposition"/>

  <h3>Result</h3>
  
  <div class="tableView result">

    <p>
    <b>Filters:</b> &nbsp;
    Price Range:
      <select v-model="minPrice" v-on:change="applyFilter">
        <option default value="0">Any</option>
        <option v-for="price in priceOpts" :key="price" :label="price | thousandsOfDollars">{{ price }}</option>
      </select> -
      <select v-model="maxPrice"  v-on:change="applyFilter">
        <option default :value="TOPPRICE">Any</option>
        <option v-for="price in priceOpts" :key="price" :label="price | thousandsOfDollars">{{ price }}</option>
      </select> &nbsp; | &nbsp;
    Min Sq Feet:
      <select v-model="minSqFeet" v-on:change="applyFilter">
        <option default value="0">Any</option>
        <option v-for="sqFt  in sqFeetOpts" :key="sqFt" >{{ sqFt  }}</option
      ></select> &nbsp; | &nbsp;
    Min Bedrooms:
      <select v-model="minRooms" v-on:change="applyFilter">
        <option default value="0">Any</option>
        <option v-for="rms   in roomOpts"   :key="rms"  >{{ rms   }}</option>
      </select> &nbsp; | &nbsp;
      <button v-on:click="reset">Reset</button>
    </p>

    <table>
      <caption>Real Estate Properties</caption>
      <thead>
        <tr>
          <td>ID</td>
          <td>Neighborhood</td>
          <td>Price</td>
          <td>Sq. Feet</td>
          <td>Bedrooms</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="property in properties" :key="property.id">
          <td>{{ property.id }}</td>
          <td>{{ property.neighborhood }}</td>
          <td>{{ property.price | thousandsOfDollars }}</td>
          <td>{{ property.sqFeet }}</td>
          <td>{{ property.bedrooms }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</div></template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import VueMarkdown from 'vue-markdown';
import axios from 'axios';

interface Property {
  id: string;
  neighborhood: string;
  price: number;
  sqFeet: number;
  bedrooms: number;
  src: string;
}

Vue.filter('thousandsOfDollars', (value: number) => `$${value}K`);

@Component({
  components: {
    VueMarkdown,
  },
})
class ChallengeOne extends Vue {
  private exposition = '';
  private propertiesAll: Property[] = [];
  private properties: Property[] = [];
  private minPrice = 0;
  private TOPPRICE = Number.MAX_SAFE_INTEGER;
  private maxPrice = this.TOPPRICE;
  private minSqFeet = 0;
  private minRooms = 0;
  private priceOpts = [ 100, 200, 300, 400, 500, 600, 800, 1000, 1200, 1500 ];
  private sqFeetOpts = [ 400, 600, 800, 1000, 1200, 1500, 1800, 2000, 2500, 3000, 4000 ];
  private roomOpts = [ 1, 2, 3, 4, 5 ];

  constructor() {
    super();
    this.propertiesAll = [];
    this.properties = [];
  }

  private mounted() {

    axios.get<string>('/markdown/ChallengeOne.md')
    .then ( ( resp  ) => { this.exposition = resp.data; })
    .catch( ( error ) => { this.exposition = error;  });

    axios.get<Property[]>('/api/properties')
    .then( ( resp ) => {
      this.propertiesAll = resp.data.sort((a, b) => a.price - b.price);
      this.properties = this.propertiesAll.slice();
    })
    .catch( ( error ) => {
      this.propertiesAll = [];
    });
  }

  private applyFilter() {
    if (Number(this.minPrice) > Number(this.maxPrice)) {
      this.minPrice = this.maxPrice;
    }
    this.properties = this.propertiesAll
      .filter((p) => p.price    >= this.minPrice )
      .filter((p) => p.price    <  this.maxPrice )
      .filter((p) => p.sqFeet   >= this.minSqFeet)
      .filter((p) => p.bedrooms >= this.minRooms );
  }
  private reset() {
    this.minPrice  = 0;
    this.maxPrice  = this.TOPPRICE;
    this.minSqFeet = 0;
    this.minRooms  = 0;
    this.applyFilter();
  }
}

export default ChallengeOne;
</script>

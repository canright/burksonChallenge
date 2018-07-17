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
    <b>{{ msg }}</b>

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
const expositionMd = `
##### The Challenge

Create a page diisplaying homes for potential buyers.
Include UI for narrowing results down to price range, square footage, and bedroom count.

##### Implementation Notes

This implementation is a rich target for further enhancements:

1. Reformat table for very narrow screens where it currently breaks its wrapping.
2. The bedroom column looks too wide because the column data is much narrower than the column heading.
3. The top Filter drop down boxes are pretty visually unsophisticated and could be improved.
4. A neighborhood filter would be nice.
5. The current implementation always sorts by ascending price. A radio button for other sorts (like by sq footage or bedrooms) would be nice.
6. Generally add and enhance styling to this page and entire application.

But, I expect that all of those are out of scope for this challenge.
`;

interface Property {
  id: string;
  neighborhood: string;
  price: number;
  sqFeet: number;
  bedrooms: number;
  src: string;
}

const fetchProperties = (): Property[] => {
  const propertiesJson = `[
    { "id": "18049674", "neighborhood": "Midland Acres",      "price": 500,  "sqFeet": 728,  "bedrooms": 2 },
    { "id": "18568994", "neighborhood": "Prescott",           "price": 235,  "sqFeet": 481,  "bedrooms": 1 },
    { "id": "18288999", "neighborhood": "Lynch Wood",         "price": 259,  "sqFeet": 1288, "bedrooms": 2 },
    { "id": "18031657", "neighborhood": "Portsmouth",         "price": 265,  "sqFeet": 480,  "bedrooms": 1 },
    { "id": "18681074", "neighborhood": "Sumner",             "price": 270,  "sqFeet": 1058, "bedrooms": 3 },
    { "id": "18021607", "neighborhood": "Hartley",            "price": 275,  "sqFeet": 1381, "bedrooms": 3 },
    { "id": "17232588", "neighborhood": "Woodmere",           "price": 280,  "sqFeet": 2080, "bedrooms": 2 },
    { "id": "18079121", "neighborhood": "Kenton",             "price": 309,  "sqFeet": 890,  "bedrooms": 2 },
    { "id": "18098555", "neighborhood": "Kenton",             "price": 315,  "sqFeet": 1149, "bedrooms": 2 },
    { "id": "18104325", "neighborhood": "Ravena Park",        "price": 322,  "sqFeet": 1364, "bedrooms": 1 },
    { "id": "18640458", "neighborhood": "Menlo Park",         "price": 325,  "sqFeet": 1316, "bedrooms": 3 },
    { "id": "18295423", "neighborhood": "Markham",            "price": 418,  "sqFeet": 2060, "bedrooms": 3 },
    { "id": "18657961", "neighborhood": "Lents",              "price": 425,  "sqFeet": 1577, "bedrooms": 3 },
    { "id": "18006563", "neighborhood": "Irvington",          "price": 620,  "sqFeet": 2279, "bedrooms": 4 },
    { "id": "18388699", "neighborhood": "Roseway Heights",    "price": 632,  "sqFeet": 3308, "bedrooms": 4 },
    { "id": "18082765", "neighborhood": "Marshall Park",      "price": 840,  "sqFeet": 3726, "bedrooms": 3 },
    { "id": "18555110", "neighborhood": "Multnomah Village",  "price": 850,  "sqFeet": 3434, "bedrooms": 4 },
    { "id": "18577559", "neighborhood": "Irvington",          "price": 1000, "sqFeet": 4727, "bedrooms": 5 },
    { "id": "18191391", "neighborhood": "Forest Park",        "price": 1100, "sqFeet": 4051, "bedrooms": 4 },
    { "id": "18621969", "neighborhood": "Willamette Heights", "price": 1200, "sqFeet": 4622, "bedrooms": 4 }
  ]`;
  return JSON.parse(propertiesJson);
};

import { Component, Vue } from 'vue-property-decorator';
import VueMarkdown from 'vue-markdown';

Vue.filter('thousandsOfDollars', (value: number) => `$${value}K`);

@Component({
  components: {
    VueMarkdown,
  },
})
class ChallengeOne extends Vue {
  private exposition = expositionMd;
  private propertiesAll: Property[];
  private properties: Property[];
  private minPrice = 0;
  private TOPPRICE = Number.MAX_SAFE_INTEGER;
  private maxPrice = this.TOPPRICE;
  private minSqFeet = 0;
  private minRooms = 0;
  private msg = '';
  private priceOpts = [ 100, 200, 300, 400, 500, 600, 800, 1000, 1200, 1500 ];
  private sqFeetOpts = [ 400, 600, 800, 1000, 1200, 1500, 1800, 2000, 2500, 3000, 4000 ];
  private roomOpts = [ 1, 2, 3, 4, 5 ];

  constructor() {
    super();
    this.propertiesAll = fetchProperties().sort((a, b) => a.price - b.price);
    this.properties = this.propertiesAll.slice();
  }

  private applyFilter() {
    if (Number(this.minPrice) > Number(this.maxPrice)) {
      this.msg = `[${this.minPrice}|${this.maxPrice}]`;
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

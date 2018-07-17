<template>
  <div id="app">
    <img src="./assets/canright.gif" id="logo">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/ChallengeOne">One</router-link> |
      <router-link to="/ChallengeTwo">Two</router-link> |
      <router-link to="/ChallengeThree">Three</router-link> |
      <router-link to="/Resume">Resume</router-link>
    </div>
    <router-view/>
  </div>
</template>  border: 2px solid #C33;

<style lang="less">
@PAD: 4vw;
@BASE: #eee;
@BKGD: #fff;
@FGND: #000;
@BORD: #666;
@PICK: #fa0;
@LOOK: #fc9;

body {
  min-width: 300px;
  background-color: @BASE;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @FGND;
}
#logo {
  margin: 0 @PAD 0 @PAD;
}
#nav {
  background-color: @BKGD;
  margin: 0 @PAD @PAD @PAD;
  padding: 1vw @PAD;
  border: 1px solid @BORD;
  border-radius: 8px;
  img {
    margin-right: @PAD;
  }
}
a {
  text-decoration: none;
  font-weight: bold;
  color: @FGND;
  &.router-link-exact-active {
    color: @PICK;
  }
  &:hover {
    color: @LOOK;
  }
}

div.page {
  > * {
    margin: 2vw @PAD @PAD @PAD;
    padding: 2vw @PAD;
  }
  > h3, h5 {
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
}

table {
  margin-top: 2vw;
  width: 80vw;
  border-collapse: collapse;
  > tbody {
    width: 80vw;
  }
}
tbody td {
  border: 1px solid @BORD;
  margin: 0px;
  padding-left: @PAD;
  img {
    height: 100px;
  }
}
thead td {
  font-weight: bold;
  padding-left: 2vw;
  vertical-align: bottom;
  padding-left: @PAD;
}
caption {
  margin-bottom: 2vw;
  font-weight: bold;

}
thead {
  border: 0px;
}

.exposition {
  margin: 2vw @PAD;
  padding: 0 0 0 2vw;
  background-color: @BKGD;
  border: 1px solid @BORD;
  border-radius: 8px;
}
.result {
  margin: @PAD;
  padding: 2vw;
  background-color: @BKGD;
  border: 1px solid @BORD;
  border-radius: 8px;
}

</style>

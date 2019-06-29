<template>
  <div id="app">
    <notifications group="main" position="bottom center"/>
    <div id="nav">
      <router-link to="/">Neighbour</router-link>
      <router-link to="/you">You</router-link>
      <router-link to="/location">Location</router-link>
    </div>
    <transition name="fade">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#nav {
  padding: 30px;
  a {
    text-decoration: none;
    padding: 0 1rem;
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

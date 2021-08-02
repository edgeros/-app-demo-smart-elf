<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
body {
  background: #fff;
}
.page {
  bottom: 50px;
  padding-top: 0;
}

@supports (bottom: constant(safe-area-inset-bottom)) or
  (bottom: env(safe-area-inset-bottom)) {
  .page {
    bottom: calc(50px); /* 兼容 iOS < 11.2 */
    bottom: calc(50px); /* 兼容 iOS >= 11.2 */
  }
}
@supports (padding-top: constant(safe-area-inset-top)) or
  (padding-top: env(safe-area-inset-top)) {
  .page {
    padding-top: constant(safe-area-inset-top); /* 兼容 iOS < 11.2 */
    padding-top: env(safe-area-inset-top); /* 兼容 iOS >= 11.2 */
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

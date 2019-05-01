<template>
  <header class="main-header">
    <nav class="main-nav">
      <div class="banner">
        <h1 class="font-weight-normal">CAFE TELLER</h1>
        <p>GOOD CAFÉ DESERVES A SHOUTOUT</p>
      </div>
      <div class="nav-links">
        <nuxt-link to="/" tag="li" class="nav-link"><a>Home</a></nuxt-link>
        <nuxt-link to="/reviews" tag="li" class="nav-link">
          <a>Review</a>
        </nuxt-link>
        <nuxt-link to="/contact" tag="li" class="nav-link">
          <a>Contact us</a>
        </nuxt-link>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.main-header {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #fcfbf7;
  height: 177px;
  /* position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fffaf0;
  height: 177px; */
}

.banner {
  letter-spacing: 2px;
  text-align: center;
}

.banner p {
  letter-spacing: 7px;
}

.main-nav {
  padding-top: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-link {
  height: 100%;
  margin: 0 2rem;
  padding: 0.3rem;
}

.nav-link a {
  /* display: block; */
  color: black;
  text-decoration: none;
  font-size: 1.1rem;
  font-style: oblique;
}

.nav-link a:hover,
.nav-link a:active,
.nav-link.nuxt-link-exact-active a {
  color: #06c4d1;
}
</style>

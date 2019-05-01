<template>
  <div class="myFooter">
    <ul class="social">
      <li>
        <a href="https://www.facebook.com/cafeteller"
          ><img
            class="img-social"
            data-type="image"
            itemprop="image"
            style="width: 20px; height: 20px; object-fit: cover;"
            src="https://static.wixstatic.com/media/0fdef751204647a3bbd7eaa2827ed4f9.png/v1/fill/w_25,h_25,al_c,q_80,usm_0.66_1.00_0.01/0fdef751204647a3bbd7eaa2827ed4f9.webp"
        /></a>
      </li>
      <li>
        <a href="https://twitter.com/cafeteller"
          ><img
            class="img-social"
            data-type="image"
            itemprop="image"
            style="width: 20px; height: 20px; object-fit: cover;"
            src="https://static.wixstatic.com/media/c7d035ba85f6486680c2facedecdcf4d.png/v1/fill/w_25,h_25,al_c,q_80,usm_0.66_1.00_0.01/c7d035ba85f6486680c2facedecdcf4d.webp"
        /></a>
      </li>
      <li>
        <a href="https://instagram.com/cafeteller"
          ><img
            class="img-social"
            data-type="image"
            itemprop="image"
            style="width: 20px; height: 20px; object-fit: cover;"
            src="https://static.wixstatic.com/media/01c3aff52f2a4dffa526d7a9843d46ea.png/v1/fill/w_25,h_25,al_c,q_80,usm_0.66_1.00_0.01/01c3aff52f2a4dffa526d7a9843d46ea.webp"
        /></a>
      </li>
    </ul>
    <p style="font-size:16px;">© 2015 by C A F E T E L L E R</p>
  </div>
</template>

<style scoped>
.myFooter {
  width: 100%;
  height: 55px;
  background: white;
  position: fixed;
  z-index: 50;
  bottom: 0;
  opacity: 0.7;
  text-align: center;
}

.social {
  margin: 0;
}

.social li {
  display: inline-block;
  margin-right: 30px;
}

.img-social {
  opacity: 1;
  transition: 0.3s;
}

.img-social:hover {
  opacity: 0.6;
}
</style>

<template>
  <!-- <div class="bd-example"> -->
  <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="http://placehold.it/1400x1200&text=slide1" alt="..." />
        <div class="carousel-caption d-none d-md-block">
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="http://placehold.it/1400x1200&text=slide2" alt="..." />
        <div class="carousel-caption d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="http://placehold.it/1400x1200&text=slide3" alt="..." />
        <div class="carousel-caption d-none d-md-block">
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </div>
      </div>
    </div>
    <!-- <a
      class="carousel-control-prev"
      href="#carouselExampleCaptions"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carouselExampleCaptions"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a> -->
    <div class="image-indicators">
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleCaptions"
          data-slide-to="0"
          class="active"
        >
          <img
            src="http://placehold.it/100x50&text=slide1"
            class="img-responsive"
          />
        </li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1">
          <img
            src="http://placehold.it/100x50&text=slide2"
            class="img-responsive"
          />
        </li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2">
          <img
            src="http://placehold.it/100x50&text=slide3"
            class="img-responsive"
          />
        </li>
      </ol>
    </div>
  </div>
  <!-- </div> -->
</template>

<style scoped>
.carousel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.carousel-item img {
  width: 500px;
  /* height: 563px; */
}
.carousel-indicators {
  list-style: none;
  position: relative;
  margin: 0;
  justify-content: center;
}
.carousel-indicators li {
  width: 88px;
  height: 50px;
  position: relative;
  margin: 10px;
}
.carousel-indicators li img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.5;
}
.carousel-indicators li.active img {
  opacity: 1;
}
.carousel-indicators li:hover img {
  opacity: 1;
}
.image-indicators {
  width: 100%;
  justify-content: center;
}
</style>

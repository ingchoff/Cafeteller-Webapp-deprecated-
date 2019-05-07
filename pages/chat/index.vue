<template>
  <div class="row">
    <div class="col-4">
      <div class="contact-list">
        <div class="header">
          <p>กล่องข้อความ</p>
        </div>
        <div class="content">
          <a>
            <div class="content-list-item">
              <div class="content-list">
                <span>ing</span>
                <span>ing</span>
                <span>ing</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.contact-list {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  background-color: white;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header p {
  margin: 0;
}
.content {
  flex-grow: 1;
  min-height: 0;
  overflow-y: auto;
}
.content-list-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0 8px 0;
  height: 100px;
}
.content-list {
  display: flex;
  flex-direction: column;
}
</style>

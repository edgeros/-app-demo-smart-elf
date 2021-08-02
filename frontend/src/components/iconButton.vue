<template>
  <div>
    <div style="padding: 10px">
      <div class="iconBtn">
        <div
          style="height: 100%; width: 100%; display: flex; align-items: center"
        >
          <div style="width: 100%; margin: 0 px">
            <van-image width="5rem" height="5rem" fit="contain" :src="images" />
            <div style="padding-top: 0.2rem">{{ moduleName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['images', 'moduleName']
}
</script>

<style scoped>
.iconBtn {
  display: block;
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
  border-radius: 1rem;
  box-sizing: border-box; /* 解决 padding和width冲突  */
  border: 3px solid #999;
  text-align: center;
  font-size: large;
  font-weight: bold;
}
</style>

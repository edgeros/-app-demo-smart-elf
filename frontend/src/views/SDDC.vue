<template>
  <div class="SDDC">
    <van-nav-bar
      title="SDDC"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div style="text-align: center; padding-top: 1rem">
      <h2>温湿度感知精灵</h2>
    </div>
    <div style="padding-top: 1rem">
      <van-cell-group>
        <van-cell title="温度" :value="sddcMsg.tem + '℃'" />
        <van-cell title="湿度" :value="sddcMsg.hum + '%'" />
        <van-cell title="光照强度" :value="sddcMsg.als" />
        <van-cell title="接近度" :value="sddcMsg.ps" />
      </van-cell-group>
    </div>
    <div style="padding-top: 5rem">
      <van-cell-group inset>
        <van-cell title="LED1" label="LED1灯光控制">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template>
            <van-switch v-model="led1Status" @change="changeLED" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <van-overlay :show="show">
      <div class="wrapper" @click.stop>
        <van-loading>等待第一次数据上报</van-loading>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true,
      led1Status: false,
      sddcMsg: {
        tem: 0, // 温度
        hum: 0, // 湿度
        als: 0, // 光照强度
        ps: 0 // 接近度数
      }
    }
  },
  mounted: function () {
    this.axios
      .get('/api/connect', {
        params: { devid: this.$route.query.devid }
      })
      .then(res => {
        console.log('连接成功:devid', this.$route.query.devid)
      })

    this.sockets.subscribe('sddc', msg => {
      this.show = false
      this.sddcMsg = JSON.parse(msg)
    })
  },
  methods: {
    changeLED (value) {
      this.axios
        .post('/api/sendMsg', {
          data: {
            devid: this.$route.query.devid,
            // msg: { led_trigger: "led1" },
            msg: { led1: value }
          }
        })
        .then(res => {
          console.log('LED1', value)
        })
    },
    onClickLeft () {
      this.show = true
      this.axios
        .get('/api/disconnect', {
          params: { devid: this.$route.query.devid }
        })
        .then(res => {
          this.sockets.unsubscribe('message')
          this.show = false
          history.back()
        })
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

<template>
  <div class="about">
    <van-nav-bar
      title="ZDDC"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div style="text-align: center; padding-top: 1rem">
      <h2>人体红外感知精灵</h2>
    </div>
    <div style="padding-top: 1rem">
      <van-cell-group>
        <van-cell title="开发板电压" :value="voltage + 'V'" />
        <van-cell title="是否有人">
          <template>
            <div
              class="light"
              :style="person ? 'background:chartreuse' : 'background:#eee'"
            ></div>
          </template>
        </van-cell>
        <van-cell title="是否光照">
          <template>
            <div
              class="light"
              :style="light ? 'background:chartreuse' : 'background:#eee'"
            ></div>
          </template>
        </van-cell>
        <van-cell title="已上报次数" :value="count" />
      </van-cell-group>
    </div>
    <div class="resetBtn">
      <van-button type="primary" size="large" @click="resetCount">
        重置上报次数
      </van-button>
    </div>
    <van-overlay :show="show">
      <div class="wrapper" @click.stop>
        <van-loading >等待第一次数据上报</van-loading >
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true,
      voltage: 0,
      person: false,
      light: false,
      count: 0
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

    this.sockets.subscribe('zddc', msg => {
      this.show = false
      const msgOB = JSON.parse(msg)
      if ('mem0' in msgOB) {
        this.count = msgOB.mem0
      }

      if ('dio2' in msgOB) {
        this.light = msgOB.dio2
      }

      if ('dio1' in msgOB) {
        this.person = msgOB.dio1
      }

      if ('aio0' in msgOB) {
        this.voltage = msgOB.aio0.toFixed(2)
      }
    })
  },
  methods: {
    resetCount (value) {
      this.axios
        .post('/api/sendMsg', {
          data: {
            devid: this.$route.query.devid,
            msg: { mem0: 0 }
          }
        })
        .then(res => {
          this.count = 0
        })
    },
    onClickLeft () {
      this.show = true
      this.axios
        .get('/api/disconnect', {
          params: { devid: this.$route.query.devid }
        })
        .then(res => {
          this.sockets.unsubscribe('zddc')
          this.show = false
          history.back()
        })
    }
  }
}
</script>

<style scoped>
.light {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1.5rem;
  border: 2px solid #999;
  display: inline-block;
}
.resetBtn {
  margin-top: 5rem;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

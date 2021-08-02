<template>
  <div class="DevList">
    <div v-if="prepare" style="text-align: center">
      <van-loading size="24px">正在发现精灵设备...</van-loading>
    </div>
    <div v-if="noExistDev" style="text-align: center">
      当前设备没有发现精灵设备
    </div>
    <div class="设备列表">
      <div v-for="item in devlist" v-bind:key="item.devid">
        <IconBtn
          v-if="item.info.report.name === 'smart'"
          images="/images/human.png"
          moduleName="红外精灵"
          @click.native="selectDevice('zddc', item.devid)"
        />
        <IconBtn
          v-if="item.info.report.name === 'smart-per01'"
          images="/images/humiture.png"
          moduleName="温湿精灵"
          @click.native="selectDevice('sddc', item.devid)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import IconBtn from '../components/iconButton.vue'
import { mapGetters, mapState } from 'vuex'
import { edger } from '@edgeros/web-sdk'
import { Dialog } from 'vant'

export default {
  name: 'Devlist',
  data: function () {
    return {
      prepare: true,
      noExistDev: false
    }
  },
  computed: {
    ...mapGetters(['getDeviceCount']),
    ...mapState(['devlist'])
  },
  components: {
    IconBtn
  },
  created: function () {
    this.axios
      .get('/api/devlist')
      .then(res => {
        this.prepare = false
        if (res.data.length === 0) {
          this.noExistDev = true
        }
        this.$store.commit('updateDevlist', res.data)
      })
      .catch(error => {
        console.log('获取设备列表失败:', error)
      })
  },
  mounted: function () {
    this.clickPermission()
  },
  methods: {
    clickPermission () {
      edger.permission
        .fetch()
        .then(data => {
          if (data.alldevs === true) {
            console.log('获取到所有设备访问权限')
          } else {
            Dialog.confirm({
              title: '权限提醒',
              message: '请开启 设置>隐私设置>应用权限>智慧精灵>全部设备',
              showCancelButton: false
            })
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    selectDevice (type, devid) {
      if (type === 'sddc') {
        // 温湿度感知器
        this.$router.push({ path: '/sddc', query: { devid: devid } })
      } else if (type === 'zddc') {
        // 人体红外感知器
        this.$router.push({ path: '/zddc', query: { devid: devid } })
      }
    }
  }
}
</script>

<style scoped>
.title {
  padding: 20px;
  font-weight: bolder;
  font-size: x-large;
}
.DevList {
  padding-top: 10rem;
}
</style>
